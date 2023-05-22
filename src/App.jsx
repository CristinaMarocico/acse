import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from "./containers/Homepage/Homepage";
import Login from "./containers/Login/Login";
import Admin from './containers/Admin/Admin'
class App extends Component{

  render(){
    return (
      <div>
        <Router>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/admin" component={Admin}/>
            
        </Router>
      </div>
    );
  }
}



export default App;
