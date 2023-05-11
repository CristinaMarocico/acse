import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from "./containers/Homepage/Homepage";

class App extends Component{

  render(){
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage/>}/>
            
          </Routes>
        </Router>
      </div>
    );
  }
}



export default App;
