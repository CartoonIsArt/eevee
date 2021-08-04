import axios from 'axios';

const hostname = require("os").hostname()
export const baseURL = `https://${hostname}/api`

export default axios.create({
  baseURL,
  Headers: {
    withCredentials: true
  }
})