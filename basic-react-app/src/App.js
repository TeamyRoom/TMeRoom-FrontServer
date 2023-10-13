import React, { useState, useEffect, useRef } from 'react';
import TeacherScreen from './components/TeacherScreen';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import LectureFrame from './components/LectureFrame';

function App() {

  return (
    <BrowserRouter> 
       <Routes>  
       <script src="https://kit.fontawesome.com/a076d05399.js"></script>

        <Route path="/" element={<Home/>} >  </Route>
        <Route path="/lecture/:lecturecode" element={<LectureFrame/>}>  </Route> 
       </Routes>
    </BrowserRouter> 
  );
}

export default App;
