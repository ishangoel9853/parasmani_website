import axios from 'axios'

export default {
  AuthAxios : axios.create({
    // baseURL: 'https://intense-scrubland-78603.herokuapp.com/',
    // baseURL: 'http://10.250.6.252:4000/',
    // baseURL: 'http://10.100.73.241:4000/',
    baseURL: 'http://localhost:4000/',
    headers: {
      'Authorization':`Bearer ${sessionStorage.getItem("token")}`
    }
  }),
  NotAuthAxios : axios.create({
      baseURL: 'http://localhost:4000/',
      /* other custom settings */
  })
}
