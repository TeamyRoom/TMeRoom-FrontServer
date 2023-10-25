import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Main/Home'
import LectureFrame from './components/Lecture/LectureFrame';
import EmailApprovedFrame from './components/SinglePage/EmailApprovedFrame';
import PasswordResetFrame from './components/SinglePage/PasswordResetFrame';
import TeacherAccept from './components/SinglePage/TeacherAccept';

function App() {

  return (
    <BrowserRouter>
      <script src="https://kit.fontawesome.com/a076d05399.js"></script>
      <Routes>
        <Route path="/" element={<Home page={0}/>} >  </Route>
        <Route path="/mypage" element={<Home page={1}/>} >  </Route>
        <Route path="/lecturelist" element={<Home page={2}/>} >  </Route>
        <Route path="/lecture/:lecturecode" element={<LectureFrame />}>  </Route>
        <Route path="/email-confirm/:confirmcode" element={<EmailApprovedFrame />}> </Route>
        <Route path="/pw-reset/:resetcode" element={<PasswordResetFrame />}> </Route>
        <Route path="/teacher-accept/:lecturecode/:answer" element={<TeacherAccept />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
