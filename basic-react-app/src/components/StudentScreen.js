import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import VideoJS from './VideoJS';

const SFU_SERVER_URL = process.env.REACT_APP_SFU_SERVER_URL;

let socket = null;
let myPeerConnection = null;
let joined = 0;
let videoJsOptions = null;

function StudentScreen(props) {

  const videoRef = useRef(null);
  const playerRef = React.useRef(null);
  const [showHls, setShowHls] = useState(false);
  const [showRTC, setShowRTC] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    init();
    return (
      () => {if(socket) socket.disconnect();}
    )
  }, [])

  const handlePlayerReady = (player) => {
    playerRef.current = player;


    // You can handle player events here, for example:
    // player.on('waiting', () => {
    // videojs.log('player is waiting');
    // });


    // player.on('dispose', () => {
    // videojs.log('player will dispose');
    // });
  };

  async function init() {
    console.log("init Socket");
    await makeConnection();
    initSocket();
    if (showHls == true) setShowHls(false);
    setShowRTC(true);
  }

  function initSocket() {
    if (myPeerConnection && socket === null) {
      console.log("소켓 생성");
      socket = io(SFU_SERVER_URL);

      socket.on("welcome", () => {
        console.log("i got welcome");
        if (joined === 0) {
          joined = 1;
          socket.emit("offerstudent", props.code);
        }
      });

      socket.on("offer", async (offer) => {
        myPeerConnection.setRemoteDescription(offer);
        const answer = await myPeerConnection.createAnswer();
        myPeerConnection.setLocalDescription(answer);
        socket.emit("answerstudent", answer);
        console.log("sent my answer");
      });

      socket.on("ice", ice => {
        myPeerConnection.addIceCandidate(ice);
        console.log("i got ice");
      });

      socket.on("reconnect", async () => {
        console.log("reconnection!");
        await myPeerConnection.close();
        myPeerConnection = null;
        joined = 1;
        await makeConnection();
        socket.emit("offerstudent", props.code);
      });

      socket.on("hls-video-option", async (hlsOption) => {
        videoJsOptions = hlsOption;
        console.log("비디오옵션은", hlsOption);
      });

      socket.emit("join_roomstudent", props.code);
    }
  }

  async function makeConnection() {
    try {
      myPeerConnection = new RTCPeerConnection({
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
      myPeerConnection.addEventListener("track", handleAddTrack);

    } catch (e) { console.log(e); }

  }

  function handleIce(data) {
    socket.emit("ice", data.candidate, 1);
    console.log("sent my candidate");
  }

  function handleAddTrack(data) {
    if (videoRef.current) {
      videoRef.current.srcObject = data.streams[0];
      videoRef.muted = true;
    }
  }

  const handleReplayClick = () => {
    // '다시보기' 버튼 클릭 시 VideoJS를 보이게 함
    if (videoJsOptions == null) {
      alert("강의가 시작되지 않았거나 방금 시작했어");
    }
    else {
      setShowHls(true);
      if (showRTC == true) setShowRTC(false);
    }
  };

  //-----view----------view----------view----------view----------view----------view----------view-----

  return (
    <div className='screen-view '>
      <div className="video-wrap" style={{ display: showRTC ? 'block' : 'none' }}>
        <video ref={videoRef} className="video-play" autoPlay playsInline></video>
      </div>
      <div>
        {showHls && <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />}
      </div>
      <button onClick={handleReplayClick}>다시보기</button>
    </div>
  );
}

export default StudentScreen;
