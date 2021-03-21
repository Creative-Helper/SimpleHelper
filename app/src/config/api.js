import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const axiosApi = axios.create({
  baseURL: process.env.VUE_APP_DOMAIN + ':' + process.env.VUE_APP_PORT,
  timeout: process.env.VUE_APP_TIMEOUT
})

axiosApi.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.request) {
    console.log('Error request: ', error.request)
  } else {
    console.log('Error response: ', error.message)
  }
  return Promise.reject(error)
})

export default axiosApi
