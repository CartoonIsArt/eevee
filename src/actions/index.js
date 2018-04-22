import { request } from '../fetches/request'

const SET_SUN = 'SETSUN'
const TOGGLE_SUN = 'TOGGLESUN'
const SET_TIMELINE = 'SETTIMELINE'
const UPDATE_FEED = 'UPDATEFEED'
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
const updateFeed = feed => ({ type: UPDATE_FEED, feed })
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


export const getMembers = () => (dispatch) => {
  request('GET', 'users', [])
    .then((r) => {
      dispatch(setMembers(r.data))
    })
    .catch()
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
      console.log(e)
    })

  return 'next cur'
}

export const patchDocument = (id, args) => dispatch => {
  request('PATCH', `documents/${id}`, args)
  .then(r => {
    dispatch(updateFeed(r.data))
  })
  .catch(e => console.log(e))
}
