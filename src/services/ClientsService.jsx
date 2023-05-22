import axios from 'axios';
import { loginService } from './LoginService';

export const clientsService={
    createOrUpdate,
    getClients
}
function createOrUpdate(newContact) {
    let url = `${
      process.env.REACT_APP_API_URL
    }/api/contacts${newContact.id ? `/${newContact.id}` : ''}`;
    const requestOptions = {
      method: newContact.id ? 'PUT' : 'POST',
      url,
      headers: {
        Accept: 'application/json'
      },
      data: { 
        contact: { ...newContact }
      }
    };
  
  
    if (loginService.loggedIn()) {
      requestOptions.headers['Authorization'] =loginService.getToken();
    }
  
  
  
    return axios(requestOptions);
  }
  
  function getClients(pageNumber){
    let url = `${process.env.REACT_APP_API_URL}/api/contacts?page[number]=${pageNumber ? pageNumber : 1}`;
    const requestOptions = {
      method: 'GET',
      url,
      headers: {
        Accept: 'application/json'
      }
    };
    if (loginService.loggedIn()) {
      requestOptions.headers['Authorization'] =loginService.getToken();
    }
    return axios(requestOptions);
}