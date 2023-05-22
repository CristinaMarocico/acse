import axios from 'axios';
import decode from 'jwt-decode';
import moment from "moment";

export const loginService={
    login,
    logout,
    setToken,
    getToken,
    loggedIn,
    isTokenExpired,
    removeToken,
    currentUserId
}

function login(userData){
    const requestOptionsPost = {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    };
  
    const data = {
      user: {
        email: userData.email,
        password: userData.password
      }
    };
  
    let url = `${process.env.REACT_APP_API_URL}/api/login`;
  
    return axios.post(url, data, requestOptionsPost);
  }
  
  function logout() {
    const requestOptionsPost = {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    };
  
    let url = `${process.env.REACT_APP_API_URL}/api/logout`;
  
    if (this.loggedIn()) {
      requestOptionsPost.headers['Authorization'] =this.getToken();
    }
  
    return axios.delete(url, requestOptionsPost);
  }
  function setToken(token) {
    localStorage.setItem('token', token);
  }
  
  function getToken() {
    return localStorage.getItem('token');
  }
  
  function removeToken() {
    localStorage.removeItem('token');
  }
  function loggedIn() {
    const token = this.getToken();
    return token !== 'undefined' && !!token && !loginService.isTokenExpired(token);
  }
  
  function isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (moment.unix(decoded.exp) < moment()) {
        return true;
      }
  
      return false;
    } catch (err) {
      return false;
    }
  }
  function currentUserId() {
    try {
      const token = this.getToken();
      const decoded = decode(token);
  
      return decoded.sub;
    } catch (err) {
      return false;
    }
  }