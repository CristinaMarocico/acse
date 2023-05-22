import React from 'react';
import './Login.scss';
import '../../resources/main.scss';
import {loginService} from '../../services/LoginService';
import NotificationSystem from 'react-notification-system';
import NotificationSystemStyle from '../../components/NotificationSystemStyle';
import { withRouter } from "react-router";


class Login extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email:"",
            password:""
        }
        this.notificationSystem = React.createRef();
    }
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
      }
      handleChange=event=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleLogin = event => {
        event.preventDefault();
        const notification = this.notificationSystem.current;
  
        loginService
          .login(this.state)
          .then(response => {
              console.log(response)
            loginService.setToken(response.headers.authorization);
            this.props.history.push('/admin')          })
          .catch(error => {
            notification.addNotification({
              message: 'Email sau parolă incorecte.',
              level: 'error',
              position: 'tc'
            });
          });
      }
    render(){
        return(
            <div className='standard login'>
                    <div className='login__container'>
                        <h3 className='login__subtitle'>Bine ai venit!</h3>
                        <form className='login__form' onSubmit={this.handleLogin}>
                            <h4 className='login__label'>Email</h4>
                              <input
                                className='login__input'
                                type="email"
                                name="email"
                                onChange={this.handleChange}
                                required
                                value={this.state.email}/>
                            <h4 className='login__label'>Parola</h4>
                            <input
                                  className='login__input'
                                  type="password"
                                  name="password"
                                  onChange={this.handleChange}
                                  required
                                  value={this.state.password}/>
                            <div className='login__account-box'>
                                <button type='submit' className='login__submit-button'><h5 className='login__button-writing'>Login</h5></button>
                                
                           
                            </div>
                        </form>
                    </div>
                    <NotificationSystem
                      ref={this.notificationSystem}
                      style={NotificationSystemStyle}
                    />
            </div>
        )
    }
}

export default withRouter(Login);
