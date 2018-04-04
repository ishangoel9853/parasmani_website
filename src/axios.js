import axios from 'axios'

export default {
  AuthAxios : axios.create({
    // baseURL: 'https://intense-scrubland-78603.herokuapp.com/',
    baseURL: 'http://localhost:4000/',
    headers: {
      'Authorization':`Bearer ${sessionStorage.getItem("token")}`
    }
  }),
  NotAuthAxios : axios.create({
      baseURL: 'https://intense-scrubland-78603.herokuapp.com/',
      /* other custom settings */
  })
}
