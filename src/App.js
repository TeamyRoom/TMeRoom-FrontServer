import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Home from './components/Main/Home'
// import LectureFrame from './components/Lecture/LectureFrame';
import EmailApprovedFrame from './components/SinglePage/EmailApprovedFrame';
import PasswordResetFrame from './components/SinglePage/PasswordResetFrame';
import TeacherAccept from './components/SinglePage/TeacherAccept';

const LectureFrame = React.lazy(() => import('./components/Lecture/LectureFrame'));

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
        <Routes>
          <Route path="/" element={<Home page={0} />} >  </Route>
          <Route path="/mypage" element={<Home page={1} />} >  </Route>
          <Route path="/lecturelist" element={<Home page={2} />} >  </Route>
          <Route path="/lecture/:lecturecode" element={<LectureFrame />}>  </Route>
          <Route path="/email-confirm/:confirmcode" element={<EmailApprovedFrame />}> </Route>
          <Route path="/pw-reset/:resetcode" element={<PasswordResetFrame />}> </Route>
          <Route path="/teacher-accept/:lecturecode/:answer" element={<TeacherAccept />}> </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
