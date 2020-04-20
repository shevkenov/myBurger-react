import axios from 'axios';

const instance = axios.create({
  baseURL: "https://my-burger-app-6c0cd.firebaseio.com/"
});

export default instance;