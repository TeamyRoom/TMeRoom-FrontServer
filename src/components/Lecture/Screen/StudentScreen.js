import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import io from 'socket.io-client';
import Video from './Video';
import VideoJS from './VideoJS';
import { getAccessToken } from '../../../service/ApiService';

const SFU_SERVER_URL = process.env.REACT_APP_SFU_SERVER_URL;
const {REACT_APP_STUNNER_USERNAME, REACT_APP_STUNNER_PASSWORD, REACT_APP_STUNNER_PORT, REACT_APP_STUNNER_HOST} = process.env;
const iceConfig = Object.freeze({
    iceServers: [
        {
            urls: 'turn:' + REACT_APP_STUNNER_HOST + ':' + REACT_APP_STUNNER_PORT + '?transport=udp',
            username: REACT_APP_STUNNER_USERNAME, // TURN 서버 사용자명
            credential: REACT_APP_STUNNER_PASSWORD, // TURN 서버 비밀번호
        },
        {
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun3.l.google.com:19302',
                'stun:stun4.l.google.com:19302',
            ],
        },
    ]
})

let socket = null;
let myPeerConnection = null;
let joined = 0;
let videoJsOptions = null;

const StudentScreen = forwardRef((props, ref) => {

  const videoRef = useRef(null);
  const playerRef = React.useRef(null);
  const [showHls, setShowHls] = useState(false);
  const [showRTC, setShowRTC] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    init();
    return (
      () => {
        if (socket) {
          socket.disconnect();
          socket = null;
          myPeerConnection = null;
          joined = 0;
          videoJsOptions = null;
        }
      }
    )
  }, [])

  useImperativeHandle(ref, () => ({
    handleAudio,
  }));

  const handlePlayerReady = (player) => {
    player.getChild("ControlBar").getChild("SettingsButton").on("click", handleRTCclick);
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
    if (showHls === true) setShowHls(false);
    setShowRTC(true);
  }

  function initSocket() {
    if (myPeerConnection && socket === null) {
      const accessToken = getAccessToken();

      socket = io(SFU_SERVER_URL, { query: `accessToken=${accessToken}&lecturecode=${props.lecturecode}` });

      socket.on("welcome", () => {
        console.log("i got welcome");
        if (joined === 0) {
          joined = 1;
          socket.emit("offerstudent", props.lecturecode);
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
        socket.emit("offerstudent", props.lecturecode);
      });

      socket.on("hls-video-option", async (hlsOption) => {
        videoJsOptions = hlsOption;
        console.log("비디오옵션은", hlsOption);
      });

      socket.emit("join_roomstudent", props.lecturecode);
    }
  }

  async function makeConnection() {
    try {
      myPeerConnection = new RTCPeerConnection(iceConfig);
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
      if (showRTC) setShowRTC(false);
      setShowHls(true);
    }
  };

  const handleRTCclick = () => {
    if (showHls) setShowHls(false);
    setShowRTC(true);
  };

  const handleAudio = () => {
    setAudioOn(!audioOn);
    console.log("하위 컴포넌트의 핸들오디오");
  }



  //-----view----------view----------view----------view----------view----------view----------view-----

  return (
    <div className='screen-view '>
      <div className="video-wrap" style={{ display: showRTC ? 'block' : 'none' }}>
        <Video videoref={videoRef} className="video-play" hlsButtonClicked={handleReplayClick} />
      </div>
      <div>
        {showHls && <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />}
      </div>
    </div>
  );
});

export default StudentScreen;
