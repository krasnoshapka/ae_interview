import axios from 'axios';
import {apiKey, apiURL} from '../constants/config';

const authMiddleWare = () => {
  return new Promise((resolve, reject) => {
    const authToken = localStorage.getItem('AuthToken');
    if (authToken === null ) {
      axios
        .post(`${apiURL}/auth`, {
          'apiKey': apiKey
        })
        .then((response) => {
          localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
          resolve(response.data.token);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            console.log(error);
          }
          reject();
        });
    } else {
      resolve(authToken);
    }
  });
}

export default authMiddleWare;
