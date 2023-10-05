import React, { useState, useEffect, useRef } from 'react';
import TeacherScreen from './components/TeacherScreen';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Teacher from './components/Teacher';
import Student from './components/Student';
import Main from './components/Main';
import Home from './components/Home';

function App() {

  return (
    <BrowserRouter> 
       <Routes>  

        <Route path="/" element={<Main/>} >  </Route>
        <Route path="/home" element={<Home/>}> </Route>
        <Route path="/teacher/:code/:nickname" element={<Teacher/>}>  </Route> 
        <Route path="/student/:code/:nickname" element={<Student/>}>  </Route>

       </Routes>
    </BrowserRouter> 
  );
}

export default App;
