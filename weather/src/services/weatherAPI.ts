import axios from 'axios'

const weatherAPI = axios.create({
  baseURL:  'http://api.weatherapi.com'
})

export default weatherAPI