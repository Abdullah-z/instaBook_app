// import axios from 'axios';

// export const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   timeout: 10000,
// });

// axiosInstance.interceptors.request.use(
//   function (config) {
//     config.headers = {
//       ...config.headers,
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     };
//     // you can also do other modification in config
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );
