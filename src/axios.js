import axios from 'axios'
const API_URL = 'https://intense-scrubland-78603.herokuapp.com/'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'type': 'application/json',
  }
})
