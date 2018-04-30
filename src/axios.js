import axios from 'axios'
// const LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');

let baseURL= 'http://localhost:4000/';

export default {
  AuthAxios : axios.create({
    baseURL,
    headers: {
      'Authorization':`Bearer ${window.localStorage.getItem("token")}`
    }
  }),
  NotAuthAxios : axios.create({
    baseURL,
  })
}
