import axios from 'axios'
// const LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');

export default {
  AuthAxios : axios.create({
    // baseURL: 'https://intense-scrubland-78603.herokuapp.com/',
    // baseURL: 'http://10.250.6.252:4000/',
    // baseURL: 'http://localhost:4000/',
    baseURL: 'https://intense-scrubland-78603.herokuapp.com/',
    headers: {
      'Authorization':`Bearer ${window.localStorage.getItem("token")}`
    }
  }),
  NotAuthAxios : axios.create({
    // baseURL: 'http://localhost:4000/',
      baseURL: 'https://intense-scrubland-78603.herokuapp.com/',
      /* other custom settings */
  })
}
