import React, { useState, useEffect, useRef } from 'react';
import TeacherScreen from './components/TeacherScreen';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import Teacher from './components/Teacher';
import Student from './components/Student';

function App() {

  return (
    <div className="App"> 
    <BrowserRouter> 
       <Routes>  

        <Route path="/" element={<Home/>} >  </Route>
        <Route path="/teacher" element={<Teacher/>}>  </Route> 
        <Route path="/student" element={<Student/>}>  </Route>

       </Routes>
    </BrowserRouter> 
	</div>
  );
}

export default App;
