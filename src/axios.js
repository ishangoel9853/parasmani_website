import axios from 'axios'

export default {
  AuthAxios : axios.create({
    baseURL: 'https://intense-scrubland-78603.herokuapp.com/',
    headers: {
      'Authorization':`bearer`
    }
  }),
  NotAuthAxios : axios.create({
      baseURL: 'https://intense-scrubland-78603.herokuapp.com/',
      /* other custom settings */
  })
}
