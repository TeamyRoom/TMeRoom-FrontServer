import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Main/Home'
import LectureFrame from './components/Lecture/LectureFrame';
import EmailApprovedFrame from './components/SinglePage/EmailApprovedFrame';
import PasswordResetFrame from './components/SinglePage/PasswordResetFrame';

function App() {

  return (
    <BrowserRouter>
      <script src="https://kit.fontawesome.com/a076d05399.js"></script>
      <Routes>
        <Route path="/" element={<Home/>} >  </Route>
        <Route path="/lecture/:lecturecode" element={<LectureFrame />}>  </Route>
        <Route path="/email-confirm/:confirmcode" element={<EmailApprovedFrame />}> </Route>
        <Route path="/pw-reset/:resetcode" element={<PasswordResetFrame />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
