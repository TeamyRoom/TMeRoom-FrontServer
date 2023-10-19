import React, { useState, useEffect, useRef } from 'react';
import TeacherScreen from './components/TeacherScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LectureFrame from './components/LectureFrame';
import EmailApprovedFrame from './components/EmailApprovedFrame';

function App() {

  return (
    <BrowserRouter>
      <script src="https://kit.fontawesome.com/a076d05399.js"></script>
      <Routes>
        <Route path="/" element={<Home />} >  </Route>
        <Route path="/lecture/:lecturecode" element={<LectureFrame />}>  </Route>
        <Route path="/email-confirm/:confirmcode" element={<EmailApprovedFrame />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
