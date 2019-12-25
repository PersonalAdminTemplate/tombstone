import axios from 'axios'
import { Message } from 'ant-design-vue'

// Swagger 47.107.184.14:7777/swagger-ui.html#/
// axios.defaults.baseURL = 'http://192.168.0.138:7777'
axios.defaults.baseURL = 'http://47.107.184.14:7777'
// axios.defaults.baseURL = 'http://113.246.243.124:7777'

axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.data.code !== 0) {
      Message.error(response.data.message, 2)
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        resolve(response && response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
