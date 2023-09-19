import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from "mediasoup-client";
import os from 'os-browserify';

function StudentScreen() {

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [myPeerConnection, setMyPeerConnection] = useState();
  const [myStream, setMyStream] = useState();
  const videoRef = useRef(null);




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

export default StudentScreen;
