import axios from '../fetches/axios'

// const host = 'https://cia.kw.ac.kr/api/'

const SET_SUN = 'SETSUN'
const TOGGLE_SUN = 'TOGGLESUN'
const SET_TIMELINE = 'SETTIMELINE'
const UPDATE_FEED = 'UPDATEFEED'
const SET_USER = 'SETUSER'
const SET_MEMBERS = 'SETMEMBERS'
const SET_NOTIES = 'SETNOTIES'
const APPEND_TIMELINE = 'APPENDTIMELINE'
const SET_LOGIN = 'SETLOGIN'
const APPEND_FEED = 'APPENDFEED'
const APPEND_COMMENT = 'APPENDCOMMENT'
const UPDATE_USER = 'UPDATEUSER'
// const APPEND = 'APPEND' // future

const setSun = (sun) => ({ type: SET_SUN, sun })
const toggleSun = () => ({ type: TOGGLE_SUN, sun: false })
const setUser = (value) => ({ type: SET_USER, user: value })
const setTimeline = (timeline) => ({ type: SET_TIMELINE, timeline })
const appendTimeline = (timeline) => ({ type: APPEND_TIMELINE, timeline })
const appendFeed = (feed) => ({ type: APPEND_FEED, feed })
const updateFeed = (feed) => ({ type: UPDATE_FEED, feed })
const appendComment = (comment) => ({ type: APPEND_COMMENT, comment })
const setMembers = (members) => ({ type: SET_MEMBERS, members })
const setNoties = (noties) => ({ type: SET_NOTIES, noties })
const setLogin = (is_success) => ({ type: SET_LOGIN, is_success })
const updateUser = (user) => ({ type: UPDATE_USER, user })

export const notifyLogin = () => (dispatch) => {
  dispatch(setLogin(true))
}

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
  joinDate: '2017-02-05 05:10:13.768196+00:00',
  birthdate: '1999-11-11 03:00:00+00:00',
  department: '전자통신공학과',
  documentsCount: 3,
  commentsCount: 5,
  likedDocumentsCount: 4,
  isActive: false,
  // isContributer: false,
  hasGraduated: false,
  isRegular: true,
  isSuperuser: false,
  // is_staff: false,
  nTh: 16,
  fullname: '와아이',
  phoneNumber: '010-0000-0000',
  studentNumber: '2000000000',
  username: 'kswcia',
  profileImage: {
    id: 1,
    savedPath: 'https://avatars.githubusercontent.com/u/8765507?s=400&u=56caf9f6b2255647317e8896972b7e7004b59579&v=4',
    filename: 'kPanic.png',
  },
}

export const getMembers = () => (dispatch) => {
  axios.get('/user')
    .then((r) => {
      dispatch(setMembers(r.data))
    })
    .catch()
}

export const getUser = () => (dispatch) => {
  axios.get('/user/authenticated')
    .then((r) => {
      dispatch(setUser(r.data))
    })
    .catch((e) => console.log(e))
}

export const getNoties = () => (dispatch) => {
  dispatch(setNoties([
    {
      id: 1,
      createdAt: '2017-06-23T07:03:20.963737Z',
      from: user1,
      content: '님의 댓글: 전 시간 좀 지나니까 적용되던데 다시 시도해보고 기다려보는건 어떤가욤 ㅇㅅㅇ??',
      had_read: true,
    },
    {
      id: 2,
      createdAt: '2017-06-10T07:03:20.963737Z',
      from: user1,
      content: '공지: 6월 종강총회 회의록',
      had_read: false,
    },
  ]))
}

export const getTimeline = (page = 1) => (dispatch) => {
  axios.get(`/timeline/${page}`)
    .then((r) => {
      dispatch(setTimeline(r.data))
    })
    .catch((e) => {
      console.log(e)
    })
}

export const postDocumentLike = (id) => (dispatch) => {
  axios.post(`/document/${id}/LikeIt`)
    .then((r) => {
      dispatch(updateFeed({
        id,
        likedUsers: r.data.likedUsers,
      }))
      dispatch(setUser(r.data.author))
    })
    .catch((e) => console.log(e))
}

export const deleteDocumentLike = (id) => (dispatch) => {
  axios.delete(`/document/${id}/LikeIt`)
    .then((r) => {
      dispatch(updateFeed({
        id,
        likedUsers: r.data.likedUsers,
      }))
      dispatch(setUser(r.data.author))
    })
    .catch((e) => console.log(e))
}

export const patchDocument = (id, data) => (dispatch) => {
  axios.patch(`/document/${id}`, {
    data,
  })
    .then((r) => {
      dispatch(updateFeed({
        id,
        content: r.data.content,
      }))
      dispatch(setUser(r.data.author))
    })
    .catch((e) => console.log(e))
}

export const postComment = (data) => (dispatch) => {
  axios.post('/comment', {
    data,
  })
    .then((r) => {
      dispatch(appendComment(r.data))
      dispatch(setUser(r.data.author))
    })
    .catch((e) => console.log(e))
}

export const postDocument = (data) => (dispatch) => {
  axios.post('/document', {
    data,
  })
    .then((r) => {
      dispatch(appendFeed(r.data))
      dispatch(setUser(r.data.author))
    })
    .catch((e) => console.log(e))
}

export const postCommentLike = (id) => (dispatch) => {
  axios.post(`/comment/${id}/LikeIt`)
    .then((r) => {
      dispatch(updateFeed({
        id,
        likedUsers: r.data.likedUsers,
      }))
      dispatch(setUser(r.data.author))
    })
    .catch((e) => console.log(e))
}

export const deleteCommentLike = (id) => (dispatch) => {
  axios.delete(`/comment/${id}/LikeIt`)
    .then((r) => {
      dispatch(updateFeed({
        id,
        likedUsers: r.data.likedUsers,
      }))
      dispatch(setUser(r.data.author))
    })
    .catch((e) => console.log(e))
}

export const patchUser = (user) => (dispatch) => {
  axios.patch(`/user/${user.id}`, user)
    .then((r) => {
      dispatch(updateUser(r.data))
    })
    .catch((e) => console.log(e))
}
