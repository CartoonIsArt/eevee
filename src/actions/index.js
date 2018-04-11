import { request } from '../fetches/request'

const SET_SUN = 'SETSUN'
const TOGGLE_SUN = 'TOGGLESUN'
const SET_TIMELINE = 'SETTIMELINE'
const SET_USER = 'SETUSER'
const SET_MEMBERS = 'SETMEMBERS'
const SET_NOTIES = 'SETNOTIES'
// const APPEND = 'APPEND' // future

const setSun = sun => ({ type: SET_SUN, sun })
const toggleSun = () => ({ type: TOGGLE_SUN, sun: false })
const setUser = value => ({
  type: SET_USER,
  user: value,
})
const setTimeline = timeline => ({ type: SET_TIMELINE, timeline })
const setMembers = members => ({ type: SET_MEMBERS, members })
const setNoties = noties => ({ type: SET_NOTIES, noties })

export const sunrise = () => (dispatch) => {
  dispatch(setSun(true))
}
export const sundown = () => (dispatch) => {
  dispatch(setSun(false))
}
export const suntoggle = () => (dispatch) => {
  dispatch(toggleSun())
}

const user1 = {
  id: 1,
  date_joined: '2017-02-05 05:10:13.768196+00:00',
  date_of_birth: '1999-11-11 03:00:00+00:00',
  department: '전자통신공학과',
  nDocuments: 3,
  nComments: 5,
  nDocumentLikes: 4,
  isActive: false,
  isContributer: false,
  isGraduate: false,
  isRegular: true,
  is_admin: false,
  is_staff: false,
  nTh: 16,
  fullname: '와아이',
  phone_number: '010-0000-0000',
  student_number: '2000000000',
  username: 'kswcia',
  profileImage: {
    id: 1,
    savedPath: 'https://cia.kw.ac.kr/media/2462a3f1-9bb5-4758-9cbe-fcf7f33db668.png',
    filename: 'kPanic.png',
  },
}

const user2 = {
  id: 2,
  date_joined: '2017-02-14T03:41:33.603865Z',
  date_of_birth: '1999-11-11 03:00:00+00:00',
  nDocuments: 3,
  nComments: 5,
  nDocumentLikes: 4,
  department: '컴퓨터공학과',
  isActive: false,
  isContributer: false,
  isGraduate: false,
  isRegular: true,
  is_admin: false,
  is_staff: false,
  nTh: 13,
  fullname: '송민준',
  phone_number: '010-0000-0000',
  student_number: '2000000000',
  username: 'eksrns22tp',
  profileImage: {
    id: 1,
    savedPath: 'https://cia.kw.ac.kr/media/7efeeb45-097e-4d9a-bc37-da767dc97ceb.jpg',
    filename: 'kPanic.png',
  },
}
const user3 = {
  id: 3,
  date_joined: '2017-02-05T09:07:11.014557Z',
  date_of_birth: '1999-11-11 03:00:00+00:00',
  department: '컴퓨터 소프트웨어',
  nDocuments: 3,
  nComments: 5,
  nDocumentLikes: 4,
  isActive: true,
  isContributer: false,
  isGraduate: false,
  isRegular: true,
  is_admin: false,
  is_staff: false,
  nTh: 18,
  fullname: '송나리',
  phone_number: '010-0000-0000',
  student_number: '2000000000',
  username: 'na06130',
  profileImage: {
    id: 1,
    savedPath: 'https://cia.kw.ac.kr/media/3ec5f542-0444-4d8b-b19b-6c0f02e19ff6.png',
    filename: '리_profile.png',
  },
}

export const getMembers = () => (dispatch) => {
  dispatch(setMembers([
    user1,
    user2,
    user3,
  ]))
}

export const getUser = () => (dispatch) => {
  request('GET', 'users/session', [])
  .then((r) => {
    dispatch(setUser(r.data))
  })
  .catch((e) => {
    if (e.response.status === 401) {
      location.href = '/Login'
    }
  })
}

export const getNoties = () => (dispatch) => {
  dispatch(setNoties([
    {
      id: 1,
      createdAt: '2017-06-22T07:03:20.963737Z',
      from: user1,
      text: '님의 댓글: 구동게 메인화면에서는 모던동게 링크가 https://cia.kw.ac.kr 로 이어지는데 게시판이나 글로 이동후에는 https://128.134.57.197 로 이어집니다.',
      had_read: false,
    },
    {
      id: 2,
      createdAt: '2017-06-23T07:03:20.963737Z',
      from: user1,
      text: '님의 댓글: 전 시간 좀 지나니까 적용되던데 다시 시도해보고 기다려보는건 어떤가욤 ㅇㅅㅇ??',
      had_read: true,
    },
    {
      id: 3,
      createdAt: '2017-06-10T07:03:20.963737Z',
      from: user1,
      text: '공지: 6월 종강총회 회의록',
      had_read: false,
    },
  ]))
}

export const getTimeline = () => (dispatch) => {
  request('GET', 'documents', [])
  .then((r) => {
    dispatch(setTimeline(r.data))
  })
  .catch((e) => {
    if (e.response.status === 401) {
      location.href = '/Login'
    }
  })

  /*eslint-disable */
  /*
  dispatch(setTimeline([
    {
      id: 1,
      author: user1,
      text: '### 여름엠티 수요조사\n\n여름엠티 1차 수요조사 글입니다.\n\n1. 엠티를 언제가든 참가할 것이다.\n\n2. 엠티를 7월에 간다면 참가할 것이다.\n\n3. 엠티를 8월에 간다면 참가할 것이다.\n\n4. 기타\n\n1,2,3번은 번호로 댓글 남겨주시고 4번은 구체적으로 댓글로 남겨주시면 됩니다.\n불참은 댓글 달지 않아도 좋습니다.\n\n**현재 작성일 6/20 화요일 1차 수요조사는 6/25 일요일 자정까지 합니다.**',
      createdAt: '2017-06-20T07:03:20.963737Z',
      isBlind: false,
      touch_date: '2017-06-23T13:14:53.579546Z',
      images: [
      ],
      comments: [
        {
          id: 373,
          author: user1,
          text: '내년 2월',
          createdAt: '2017-02-05T09:22:35.164895Z',
          recomments: [],
        },
        {
          id: 375,
          author: user1,
          text: '구동게 메인화면에서는 모던동게 링크가 https://cia.kw.ac.kr 로 이어지는데 게시판이나 글로 이동후에는 https://128.134.57.197 로 이어집니다.',
          createdAt: '2017-02-05T09:32:11.001298Z',
          recomments: [
            {
              id: 381,
              author: user1,
              text: '왜 하필 터닝메카드죠?',
              createdAt: '2017-02-07T14:15:29.397188Z',
              recomments: [],
            },
            {
              id: 382,
              author: user1,
              text: '전 시간 좀 지나니까 적용되던데 다시 시도해보고 기다려보는건 어떤가욤 ㅇㅅㅇ??',
              createdAt: '2017-02-07T16:18:24.217215Z',
              recomments: [],
            },
            {
              id: 383,
              author: user1,
              text: '프사는 2메가 제한있어요. 써놓겠습니다.',
              createdAt: '2017-02-07T23:53:52.766760Z',
              recomments: [],
            },
          ],
        },
        {
          id: 376,
          author: user1,
          text: 'ㅇㅇㅇㅇㅇㅇ그거 구동게 이미지 안깨지게 하려면 어쩔수 없다.',
          createdAt: '2017-02-05T09:32:38.560752Z',
          recomments: [],
        },
      ],
    },
    {
      id: 2,
      author: user1,
      text: '### 여름엠티 수요조사\n\n여름엠티 1차 수요조사 글입니다.\n\n1. 엠티를 언제가든 참가할 것이다.\n\n2. 엠티를 7월에 간다면 참가할 것이다.\n\n3. 엠티를 8월에 간다면 참가할 것이다.\n\n4. 기타\n\n1,2,3번은 번호로 댓글 남겨주시고 4번은 구체적으로 댓글로 남겨주시면 됩니다.\n불참은 댓글 달지 않아도 좋습니다.\n\n**현재 작성일 6/20 화요일 1차 수요조사는 6/25 일요일 자정까지 합니다.**',
      createdAt: '2017-06-20T07:03:20.963737Z',
      isBlind: false,
      touch_date: '2017-06-23T13:14:53.579546Z',
      images: [
        {
          id: 2,
          savedPath: 'https://cia.kw.ac.kr/media/20c2603a-013e-4e24-a517-64ecc5e97007.jpg',
          filename: 'aaa.jpg',
        },
      ],
      comments: [],
    },
    {
      id: 3,
      author: user1,
      text: '### 여름엠티 수요조사\n\n여름엠티 1차 수요조사 글입니다.\n\n1. 엠티를 언제가든 참가할 것이다.\n\n2. 엠티를 7월에 간다면 참가할 것이다.\n\n3. 엠티를 8월에 간다면 참가할 것이다.\n\n4. 기타\n\n1,2,3번은 번호로 댓글 남겨주시고 4번은 구체적으로 댓글로 남겨주시면 됩니다.\n불참은 댓글 달지 않아도 좋습니다.\n\n**현재 작성일 6/20 화요일 1차 수요조사는 6/25 일요일 자정까지 합니다.**',
      createdAt: '2017-06-20T07:03:20.963737Z',
      isBlind: false,
      touch_date: '2017-06-23T13:14:53.579546Z',
      images: [
        {
          id: 2,
          savedPath: 'https://cia.kw.ac.kr/media/20c2603a-013e-4e24-a517-64ecc5e97007.jpg',
          filename: 'aaa.jpg',
        },
        {
          id: 3,
          savedPath: 'https://cia.kw.ac.kr/media/8c061e9e-0478-4772-aef9-ce6899fc7a92.jpg',
          filename: 'bbb.jpg',
        },
      ],
      comments: [],
    },
    {
      id: 4,
      author: user1,
      text: '### 여름엠티 수요조사\n\n여름엠티 1차 수요조사 글입니다.\n\n1. 엠티를 언제가든 참가할 것이다.\n\n2. 엠티를 7월에 간다면 참가할 것이다.\n\n3. 엠티를 8월에 간다면 참가할 것이다.\n\n4. 기타\n\n1,2,3번은 번호로 댓글 남겨주시고 4번은 구체적으로 댓글로 남겨주시면 됩니다.\n불참은 댓글 달지 않아도 좋습니다.\n\n**현재 작성일 6/20 화요일 1차 수요조사는 6/25 일요일 자정까지 합니다.**',
      createdAt: '2017-06-20T07:03:20.963737Z',
      isBlind: false,
      touch_date: '2017-06-23T13:14:53.579546Z',
      images: [
        {
          id: 1,
          savedPath: 'http://www.lorempixel.com/300/400',
          filename: 'aaa.jpg',
        },
        {
          id: 2,
          savedPath: 'http://www.lorempixel.com/600/400',
          filename: 'aaa.jpg',
        },
        {
          id: 3,
          savedPath: 'http://www.lorempixel.com/600/200',
          filename: 'bbb.jpg',
        },
      ],
      comments: [],
    },
    {
      id: 5,
      author: user1,
      text: '### 여름엠티 수요조사\n\n여름엠티 1차 수요조사 글입니다.\n\n1. 엠티를 언제가든 참가할 것이다.\n\n2. 엠티를 7월에 간다면 참가할 것이다.\n\n3. 엠티를 8월에 간다면 참가할 것이다.\n\n4. 기타\n\n1,2,3번은 번호로 댓글 남겨주시고 4번은 구체적으로 댓글로 남겨주시면 됩니다.\n불참은 댓글 달지 않아도 좋습니다.\n\n**현재 작성일 6/20 화요일 1차 수요조사는 6/25 일요일 자정까지 합니다.**',
      createdAt: '2017-06-20T07:03:20.963737Z',
      isBlind: false,
      touch_date: '2017-06-23T13:14:53.579546Z',
      images: [
        {
          id: 1,
          savedPath: 'http://www.lorempixel.com/200/100',
          filename: 'aaa.jpg',
        },
        {
          id: 2,
          savedPath: 'http://www.lorempixel.com/1000/400',
          filename: 'aaa.jpg',
        },
        {
          id: 3,
          savedPath: 'http://www.lorempixel.com/400/1000',
          filename: 'aaa.jpg',
        },
        {
          id: 4,
          savedPath: 'http://www.lorempixel.com/400/300',
          filename: 'aaa.jpg',
        },
      ],
      comments: [],
    },
  ]))
  */
 /*eslint-enable */
  return 'next cur'
}

/*
로그인함수의 정체가 뭔지 모르겠다.
export const postLogin = (body) => {
  axios.post(
    '/api/login',
    body,
  )
}
*/
