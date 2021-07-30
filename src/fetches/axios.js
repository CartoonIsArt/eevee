import axios from 'axios';

const hostname = require("os").hostname()
const baseURL = `https://${hostname}/api`

export default axios.create({
  baseURL,
  Headers: {
    withCredentials: true
  }
})