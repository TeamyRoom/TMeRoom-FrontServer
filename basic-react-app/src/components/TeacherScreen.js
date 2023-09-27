import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from "mediasoup-client";

const HLS_SERVER_URL = process.env.REACT_APP_HLS_SERVER_URL;
const SFU_SERVER_URL = process.env.REACT_APP_SFU_SERVER_URL

class SocketQueue {
  constructor() {
    this.queue = new Map();
  }

  push(action, callback) {
    this.queue.set(action, callback);
  }

  get(action) {
    return this.queue.get(action);
  }

  remove(action) {
    this.queue.delete(action);
  }
}

class Peer {
  constructor(sessionId, device) {
    this.sessionId = sessionId;
    this.device = device;
    this.producers = [];

    this.mediaStream = new MediaStream();
    this.sendTransport = undefined;
  }

  hasVideo() {
    return Boolean(this.producers.find((producer => producer.kind === 'video')));
  }

  hasAudio() {
    return Boolean(this.producers.find((producer => producer.kind === 'audio')));
  }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

let peer;
let socket = null;
let wsocket = null;
let queue = new SocketQueue();

function TeacherScreen(props) {

  const [myPeerConnection, setMyPeerConnection] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const videoRef = useRef(null);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [cameraText, setCameraText] = useState("카메라 끄기");
  const [cameraOn, setCameraOn] = useState(true);  

  useEffect(() => {
    getMedia();
  }, [])

  useEffect(() => {
    if (myStream) init();
  }, [myStream])

  useEffect(() => {
    if (myPeerConnection) {
      socket = io(SFU_SERVER_URL);

      socket.on("welcome", async () => {
        const offer = await myPeerConnection.createOffer();
        myPeerConnection.setLocalDescription(offer);
        socket.emit("offerteacher", offer, props.code);
        console.log("sent my offer!");
      });

      socket.on("answer", async answer => {
        myPeerConnection.setRemoteDescription(answer);
        console.log("received answer!");
      });

      socket.on("ice", ice => {
        myPeerConnection.addIceCandidate(ice);
        console.log("i got ice", ice);
      });

      socket.on("denied", () => {
        alert("이미 강의가 진행 중입니다. 학생 페이지로 입장해주세요.");
        window.history.back();
      })
    }

    return () => {
      if (myPeerConnection) myPeerConnection.close();
    }
  }, [myPeerConnection]);

  //------functions----------functions----------functions----------functions----------functions----------functions----

  async function joinRoom() {
    if (socket) {
      socket.emit('join_room', props.code);
      setButtonVisible(false);
    }
  }

  const init = async () => {
    await makeConnection();
    console.log("메이크 커넥션");
  }

  const makeConnection = async () => {

    const myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ]
        },
        {
          urls: "turn:13.209.13.37:3478", 
          username: "your-username", // TURN 서버 사용자명
          credential: "your-password" // TURN 서버 비밀번호
        }
      ]
    });
    myPeerConnection.addEventListener("icecandidate", handleIce);

    myPeerConnection.onconnectionstatechange = (e) => {
      if (myPeerConnection.connectionState === 'connected' && wsocket.readyState === 1) {
        startRecord();
      }
    };

    myStream.getTracks().forEach(track => myPeerConnection.addTrack(track, myStream));

    setMyPeerConnection(myPeerConnection);
  };

  async function getMedia(deviceId) {
    const initialConstrains = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstrains = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      // const myStream = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstrains : initialConstrains);
      const myStream = await navigator.mediaDevices
      .getDisplayMedia({
        video: { cursor: 'always' },
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      console.log("마이스트림 : ", myStream);
      setMyStream(myStream);
      if (videoRef.current) {
        videoRef.current.srcObject = myStream;
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleIce(data) {
    socket.emit("ice", data.candidate, 0, props.code);
    console.log("sent my candidate");
  }

  //----record-------record-------record-------record-------record-------record-------record-------record---

  useEffect(() => {
    if (myStream) {
      if (wsocket !== null) wsocket.close();
      wsocket = new WebSocket(HLS_SERVER_URL);
      console.log("웹 소켓 연결 : ", wsocket);
      wsocket.addEventListener('open', handleSocketOpen);
      wsocket.addEventListener('message', handleSocketMessage);
      wsocket.addEventListener('error', handleSocketError);
      wsocket.addEventListener('close', handleSocketClose);

    }
  }, [myStream]);

  const handleSocketOpen = async () => {
    console.log('handleSocketOpen()');
  };

  const handleSocketMessage = async (message) => {
    try {
      const jsonMessage = JSON.parse(message.data);
      handleJsonMessage(jsonMessage);
    } catch (error) {
      console.error('handleSocketMessage() failed [error:%o]', error);
    }
  };

  const handleSocketClose = () => {
    console.log('handleSocketClose()');
  };

  const handleSocketError = error => {
    console.error('handleSocketError() [error:%o]', error);
  };

  const handleJsonMessage = async (jsonMessage) => {
    const { action } = jsonMessage;

    switch (action) {
      case 'router-rtp-capabilities':
        handleRouterRtpCapabilitiesRequest(jsonMessage);
        break;
      case 'create-transport':
        handleCreateTransportRequest(jsonMessage);
        break;
      case 'connect-transport':
        handleConnectTransportRequest(jsonMessage);
        break;
      case 'produce':
        handleProduceRequest(jsonMessage);
        break;
      case 'hls-file-name':
        handleHlsVideo(jsonMessage);
        break;
      default: console.log('handleJsonMessage() unknown action %s', action);
    }
  };

  const handleRouterRtpCapabilitiesRequest = async (jsonMessage) => {
    const { routerRtpCapabilities, sessionId } = jsonMessage;
    console.log('handleRouterRtpCapabilities() [rtpCapabilities:%o]', routerRtpCapabilities);

    try {
      const device = new mediasoupClient.Device();
      // Load the mediasoup device with the router rtp capabilities gotten from the server
      await device.load({ routerRtpCapabilities });

      peer = new Peer(sessionId, device);

      createTransport();
    } catch (error) {
      console.error('handleRouterRtpCapabilities() failed to init device [error:%o]', error);
      wsocket.close();
    }
  };

  const createTransport = () => {
    console.log('createTransport()');
    if (!peer || !peer.device.loaded) {
      throw new Error('Peer or device is not initialized');
    }

    // First we must create the mediasoup transport on the server side
    wsocket.send(JSON.stringify({
      action: 'create-transport',
      sessionId: peer.sessionId
    }));
  };

  // Mediasoup Transport on the server side has been created
  const handleCreateTransportRequest = async (jsonMessage) => {
    console.log('handleCreateTransportRequest() [data:%o]', jsonMessage);

    try {
      // Create the local mediasoup send transport
      peer.sendTransport = await peer.device.createSendTransport(jsonMessage);
      // setPeer(peer);
      console.log('handleCreateTransportRequest() send transport created [id:%s]', peer.sendTransport.id);

      // Set the transport listeners and get the users media stream
      handleSendTransportListeners();
      getMediaStream();
    } catch (error) {
      console.error('handleCreateTransportRequest() failed to create transport [error:%o]', error);
      wsocket.close();
    }
  };

  const handleSendTransportListeners = () => {
    peer.sendTransport.on('connect', handleTransportConnectEvent);
    peer.sendTransport.on('produce', handleTransportProduceEvent);
    peer.sendTransport.on('connectionstatechange', connectionState => {
      console.log('send transport connection state change [state:%s]', connectionState);
    });
  };

  const getMediaStream = async () => {
    const mediaStream = myStream;

    // Get the video and audio tracks from the media stream
    const videoTrack = mediaStream.getVideoTracks()[0];
    const audioTrack = mediaStream.getAudioTracks()[0];

    // If there is a video track start sending it to the server
    if (videoTrack) {
      const videoProducer = await peer.sendTransport.produce({ track: videoTrack });
      peer.producers.push(videoProducer);
    }

    // if there is a audio track start sending it to the server
    if (audioTrack) {
      const audioProducer = await peer.sendTransport.produce({ track: audioTrack });
      peer.producers.push(audioProducer);
    }

  };

  const handleConnectTransportRequest = async (jsonMessage) => {
    console.log('handleTransportConnectRequest()');
    try {
      const action = queue.get('connect-transport');

      if (!action) {
        throw new Error('transport-connect action was not found');
      }

      await action(jsonMessage);
    } catch (error) {
      console.error('handleTransportConnectRequest() failed [error:%o]', error);
    }
  };

  const handleProduceRequest = async (jsonMessage) => {
    console.log('handleProduceRequest()');
    try {
      const action = queue.get('produce');

      if (!action) {
        throw new Error('produce action was not found');
      }

      await action(jsonMessage);
    } catch (error) {
      console.error('handleProduceRequest() failed [error:%o]', error);
    }
  };

  const handleTransportConnectEvent = ({ dtlsParameters }, callback, errback) => {
    console.log('handleTransportConnectEvent()');
    try {
      const action = (jsonMessage) => {
        console.log('connect-transport action');
        callback();
        queue.remove('connect-transport');
      };

      queue.push('connect-transport', action);

      wsocket.send(JSON.stringify({
        action: 'connect-transport',
        sessionId: peer.sessionId,
        transportId: peer.sendTransport.id,
        dtlsParameters
      }));
    } catch (error) {
      console.error('handleTransportConnectEvent() failed [error:%o]', error);
      errback(error);
    }
  };

  const handleTransportProduceEvent = ({ kind, rtpParameters }, callback, errback) => {
    console.log('handleTransportProduceEvent()');
    try {
      const action = jsonMessage => {
        console.log('handleTransportProduceEvent callback [data:%o]', jsonMessage);
        callback({ id: jsonMessage.id });
        queue.remove('produce');
      };

      queue.push('produce', action);

      wsocket.send(JSON.stringify({
        action: 'produce',
        sessionId: peer.sessionId,
        transportId: peer.sendTransport.id,
        kind,
        rtpParameters
      }));

    } catch (error) {
      console.error('handleTransportProduceEvent() failed [error:%o]', error);
      errback(error);
    }
  };

  const handleCameraClick = () => {
    myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    if (cameraOn) {
      setCameraOn(false);
      setCameraText("카메라 켜기");
    } else {
      setCameraOn(true);
      setCameraText("카메라 끄기");
    }
  }


  const startRecord = () => {
    console.log("스타트레코드 ws : ", wsocket);
    wsocket.send(JSON.stringify({
      action: 'start-record',
      sessionId: peer.sessionId,
      roomName: props.code
    }));
  }

  const handleHlsVideo = async (jsonMessage) => {
    try {

      const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        liveui: true,
        controlBar: {
          skipButtons: {
            forward: 5,
            backward: 5
          }
        },
        sources: [{
          src: `https://tmeroom-hls-bucket.s3.ap-northeast-2.amazonaws.com/${props.code}/${jsonMessage.id}.m3u8`,
          type: "application/x-mpegURL"
        }],
        liveTracker: {
          trackingThreshold: 2
        }
      };

      socket.emit("hls-video-option", videoJsOptions, props.code);


      console.log("파일 경로는", videoJsOptions);
    } catch (error) {
      console.error('handleHlsVideo() failed to create transport [error:%o]', error);
      wsocket.close();
    }

  };

  //-----view----------view----------view----------view----------view----------view----------view-----

  return (
    <div className='screen-view '>
      <div className="video-wrap">
        <video ref={videoRef} className="video-play" autoPlay playsInline></video>
      </div>
      <button onClick={joinRoom} style={{ display: buttonVisible ? 'block' : 'none' }}>시작</button>
      <button onClick={handleCameraClick} style={{ display: buttonVisible ? 'none' : 'block' }}>{cameraText}</button>
    </div>
  );
}

export default TeacherScreen;
