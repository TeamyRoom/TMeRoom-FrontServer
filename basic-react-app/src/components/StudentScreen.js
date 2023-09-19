import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

let socket = null;
let joined = 0;

function StudentScreen() {

  const [myPeerConnection, setMyPeerConnection] = useState();
  const videoRef = useRef(null);

  useEffect(() => {
    if (myPeerConnection && socket === null) {
      console.log("소켓 생성");
      socket = io('http://localhost:3005');

      socket.on("welcome", () => {
        console.log("i got welcome");
        if (joined === 0) {
          joined = 1;
          socket.emit("offerstudent");
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
        myPeerConnection.close();
        setMyPeerConnection(myPeerConnection);
        joined = 0;
        await makeConnection();
        socket.emit("offerstudent");
      });

      socket.emit("join_roomstudent");
    }
  }, [myPeerConnection])

  const joinRoom = () => {
    console.log("조인 룸");
    makeConnection();
  }

  async function makeConnection() {
    try {
      const peerConnection = new RTCPeerConnection({
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
      peerConnection.addEventListener("icecandidate", handleIce);
      peerConnection.addEventListener("track", handleAddTrack);

      setMyPeerConnection(peerConnection);

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


  //-----view----------view----------view----------view----------view----------view----------view-----

  return (
    <div>
      <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
      <main>
        <div id="call">
          <div id="myStream">
            <video ref={videoRef} id="peerFace" autoPlay playsInline width="400" heigth="400"></video>
          </div>
        </div>
        <button onClick={joinRoom}>시작</button>
      </main>

    </div>
  );
}

export default StudentScreen;
