import axios from 'axios';
const TOKEN_KEY = 'tokenkey123';
import AsyncStorage from '@react-native-async-storage/async-storage';

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 50000,
  //httpsAgent: httpsAgent
});

let token = null;

axiosInstance.interceptors.request.use(
  async function (config: any) {
    token = await AsyncStorage.getItem(TOKEN_KEY).then((res) => {
      // token = JSON.parse(data);

      token = JSON.parse(res);
      console.log('token on commonData: ' + token);
    });

    config.headers = {
      ...config.headers,
      // Authorization: `Bearer ${token}`,
      Authorization: token,
      limit: 9,
      // os: Platform.OS,
    };
    // you can also do other modification in config
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const REACT_APP_API_URL = 'http://172.16.1.74:8080/';

export default class CommonDataService {
  executeApiCall(path, data) {
    return axiosInstance
      .post(`${REACT_APP_API_URL}${path}`, data)
      .then((res) => res);
  }

  fetchData(path) {
    return axiosInstance.get(`${REACT_APP_API_URL}${path}`).then((res) => res);
  }

  uploadDocument(path, document) {
    var data = new FormData();
    data.append('file', document);
    return axiosInstance
      .post(`${REACT_APP_API_URL}${path}`, data)
      .then((res) => res);
  }
}
