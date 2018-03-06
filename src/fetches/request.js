import axios from 'axios';


const host = 'http://localhost/api/'

// method에는 명령어(GET, PATCH등...) target은 대상 타겟 도메인, args엔
// string타입 key와 value포함.
// eslint-disable-next-line
export function request(method, target, args) {
  let url = host + target
  if (method === 'GET') {
    if (args.length > 0) {
      url += '?'
      args.forEach((e) => {
        url = `${url + e.key}=${e.value}&`
      })
    }
    return axios(url)
  } else if (['POST', 'PUT', 'PATCH'].includes(method)) {
    console.log(args)
    const data = {}
    args.forEach((e) => {
      data[e.key] = e.value
    });
    console.log(data)
    return axios({
      method,
      url,
      data,
    })
  }
  return axios({
    method,
    url,
  })
}
