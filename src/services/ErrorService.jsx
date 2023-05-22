import { loginService } from './LoginService';

export const errorService ={
    handleUnauthorized
}

function handleUnauthorized() {
  loginService.removeToken();
}
