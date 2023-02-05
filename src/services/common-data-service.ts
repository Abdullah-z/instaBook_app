import axios from 'axios';

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 50000,
  //httpsAgent: httpsAgent
});

axiosInstance.interceptors.request.use(
  async function (config: any) {
    // let token = await AsyncStorage.getItem(STORAGE_KEY).then((res) => {
    //   return res;
    // });

    // let locale = await AsyncStorage.getItem(STORAGE_KEY2).then((res) => {
    //   return res;
    // });

    let token = '123456789';

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      // lang: locale,
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