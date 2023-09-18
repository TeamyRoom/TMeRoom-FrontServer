import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from "mediasoup-client";
import TeacherScreen from './components/TeacherScreen';

function App() {

  //-----view----------view----------view----------view----------view----------view----------view-----

  return (
    <div>
      <TeacherScreen/>
    </div>
  );
}

export default App;
