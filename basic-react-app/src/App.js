import React, { useState, useEffect, useRef } from 'react';
import TeacherScreen from './components/TeacherScreen';
import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {

  return (
    <div className="App"> 
    <BrowserRouter> 
       <Routes>  

        <Route path="/" element={<StudentList/>} >  </Route>
        <Route path="/detail" element={<StudentDetail/>}>  </Route> 

       </Routes>
    </BrowserRouter> 
	</div>
  );
}

export default App;
