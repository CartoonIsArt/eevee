import axios from 'axios';

const baseURL =  process.env.NODE_ENV === 'production' ? 'https://cartoonisart.azurewebsites.net/api/' : 'https://localhost/api'

export default axios.create({
  baseURL,
  Headers: {
    withCredentials: true
  }
})