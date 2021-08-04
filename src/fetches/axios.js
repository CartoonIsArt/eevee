import axios from 'axios';

// const host = 'https://cia.kw.ac.kr/api/'

export default axios.create({
  baseURL: 'https://localhost/api',
  Headers: {
    withCredentials: true
  }
})