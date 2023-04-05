import axios from 'axios';
const TOKEN_KEY = 'tokenkey123';
import AsyncStorage from '@react-native-async-storage/async-storage';

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 50000,
  //httpsAgent: httpsAgent
});

axiosInstance.interceptors.request.use(
  async function (config: any) {
    let token = await AsyncStorage.getItem(TOKEN_KEY).then((res) => {
      return JSON.parse(res);
    });

    config.headers = {
      ...config.headers,

      Authorization: token,
      limit: 9,
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const REACT_APP_API_URL = 'http://172.16.10.65:8080/';

export default class CommonDataService {
  executeApiCall(path, data) {
    return axiosInstance
      .post(`${REACT_APP_API_URL}${path}`, data)
      .then((res) => res);
  }

  patchApiCall(url, data) {
    return axiosInstance.patch(url, data).then((res) => res);
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
