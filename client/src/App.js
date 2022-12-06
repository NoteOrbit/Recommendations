import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import About from './components/About'
import {Users} from './components/Users'
import CollapsibleExample from './components/Navbar'
import {Predict} from './components/Predicts'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    
    <Router>
      <CollapsibleExample/>
      
      <div>
        <Routes>
          
          <Route path="/Predict" element={<Predict/>}/>
          <Route path="/data" element={<Users/>} />
          <Route path="/" element={<About/>} />
        </Routes>
      </div>
    </Router>
  )
}


export default App


