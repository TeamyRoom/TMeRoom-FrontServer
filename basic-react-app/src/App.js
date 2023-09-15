import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from "mediasoup-client";

function App() {

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [myPeerConnection, setMyPeerConnection] = useState();
  const [myStream, setMyStream] = useState();
  const [device, setDevice] = useState(new mediasoupClient.Device());
  const videoRef = useRef(null);

  useEffect(() => {
    getMedia();
  }, [])

  useEffect(() => {
    // 서버에 연결

    if (myPeerConnection) {
      const socket = io('http://localhost:3005');

      socket.on("welcome", async () => {
        const offer = await myPeerConnection.createOffer();
        myPeerConnection.setLocalDescription(offer);
        socket.emit("offerteacher", offer);
        console.log("sent my offer!");
      });

      socket.on("answer", answer => {
        myPeerConnection.setRemoteDescription(answer);
        
        socket.emit("device", device);
        console.log("디바이스 : ", device);
        console.log("received answer!");
      });

      socket.on("ice", ice => {
        myPeerConnection.addIceCandidate(ice);
        console.log("i got ice", ice);
      });
      setSocket(socket);
    }

  }, [myPeerConnection]);

  useEffect(() => {
    if (myStream) {
      makeConnection();
    }
  }, [myStream]);

  //------소켓 리스너----------소켓 리스너----------소켓 리스너----------소켓 리스너----------소켓 리스너----------소켓 리스너----




  //------functions----------functions----------functions----------functions----------functions----------functions----

  const joinRoom = () => {
    if (socket) {
      socket.emit('join_room', message);
      setMessage(''); // 메시지 보낸 후 입력 필드 비우기
    }
  };

  const makeConnection = () => {

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
        }
      ]
    });
    myPeerConnection.addEventListener("icecandidate", handleIce);

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
    // const DEFAULT_CONSTRAINTS = Object.freeze({
    //   audio: true,
    //   video: { width: 640, height: 480 }
    // });
    try {
      const myStream = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstrains : initialConstrains);
      console.log("마이스트림 : ", myStream);
      setMyStream(myStream);
      if (videoRef.current) {
        videoRef.current.srcObject = myStream;
      }
      // myFace.srcObject = myStream;  이따가 리액트에서는 어떻게 내 뷰에 이거 넣는지 찾아
      // if (!deviceId) {
      //   await getCamears();
      // }
    } catch (e) {
      console.log(e);
    }
  }

  function handleIce(data) {
    socket.emit("ice", data.candidate, 0);
    console.log("sent my candidate");
  }



  //-----view----------view----------view----------view----------view----------view----------view-----

  return (
    <div>
      <title>Noom</title>
      <link rel="stylesheet" href="https://unpkg.com/mvp.css" />


      <header>
        <h1>Noom for teacher</h1>
      </header>
      <main>
        <div id="welcome">
          <input
            type="text"
            placeholder="메시지 입력"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={joinRoom}>방에 입장하기</button>
        </div>
        <div id="call">
          <div id="myStream">
            <video ref={videoRef} id="myFace" autoPlay playsInline width="400" heigth="400"></video>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
