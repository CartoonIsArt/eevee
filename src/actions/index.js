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
const LOGOUT = 'LOGOUT'
const SET_LOGOUT = 'SETLOGOUT'
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
const logoutUser = () => ({ type: LOGOUT })
const setLogout = () => ({ type: SET_LOGOUT })

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
  major: '전자통신공학과',
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

// User
//
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

export const patchUser = (user) => (dispatch) => {
  axios.patch(`/user/${user.id}`, user)
    .then((r) => {
      dispatch(updateUser(r.data))
    })
    .catch((e) => console.log(e))
}

export const checkPassword = async (password) => {
  try{
    await axios.post('/user/checkPassword', password)
    return true
  }
  catch(e){
    console.log(e)
    return false
  }
}

// Timeline
//
export const getTimeline = (page = 1, keyword = undefined) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()
  console.log(`/timeline?${queryString}`)
  
  axios.get(`/timeline?${queryString}`)
    .then((r) => {
      dispatch(page == 1 ? setTimeline(r.data) : appendTimeline(r.data))
    })
    .catch((e) => {
      console.log(e)
    })
}

export const getUserTimeline = (username, page = 1, keyword = undefined) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()
  console.log(`/timeline/${username}?${queryString}`)
  axios.get(`/timeline/${username}?${queryString}`)
    .then((r) => {
      dispatch(page == 1 ? setTimeline(r.data) : appendTimeline(r.data))
    })
    .catch((e) => {
      console.log(e)
    })
}

export const getLikedTimeline = (username, page = 1, keyword = undefined) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()
  console.log(`/timeline/${username}/likes?${queryString}`)
  
  axios.get(`/timeline/${username}/likes?${queryString}`)
    .then((r) => {
      dispatch(page == 1 ? setTimeline(r.data) : appendTimeline(r.data))
    })
    .catch((e) => {
      console.log(e)
    })
}

export const getCommentedTimeline = (username, page = 1, keyword = undefined) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()
  console.log(`/timeline/${username}/comments?${queryString}`)
  
  axios.get(`/timeline/${username}/comments?${queryString}`)
    .then((r) => {
      dispatch(page == 1 ? setTimeline(r.data) : appendTimeline(r.data))
    })
    .catch((e) => {
      console.log(e)
    })
}

// Document
//
export const postDocument = (document) => (dispatch) => {
  axios.post('/document', document)
    .then((r) => {
      const { document } = r.data
      dispatch(appendFeed(document))
      dispatch(setUser(document.author))
    })
    .catch((e) => console.log(e))
}

export const patchDocument = (document) => (dispatch) => {
  axios.patch('/document', document)
    .then((r) => {
      const { document } = r.data
      dispatch(updateFeed(document))
    })
    .catch((e) => console.log(e))
}

export const postDocumentLike = (id) => (dispatch) => {
  axios.post(`/document/${id}/LikeIt`)
    .then((r) => {
      const { likedUsers, user } = r.data
      dispatch(updateFeed({ id, likedUsers }))
      dispatch(setUser(user))
    })
    .catch((e) => console.log(e))
}

export const deleteDocumentLike = (id) => (dispatch) => {
  axios.delete(`/document/${id}/LikeIt`)
    .then((r) => {
      const { likedUsers, user } = r.data
      dispatch(updateFeed({ id, likedUsers }))
      dispatch(setUser(user))
    })
    .catch((e) => console.log(e))
}

// Comment
//
export const postComment = (comment) => (dispatch) => {
  axios.post('/comment', comment)
    .then((r) => {
      const { comment } = r.data
      dispatch(appendComment(comment))
      dispatch(setUser(comment.author))
    })
    .catch((e) => console.log(e))
}

export const postCommentLike = (id) => (dispatch) => {
  axios.post(`/comment/${id}/LikeIt`)
    .then((r) => {
      const { likedUsers, user } = r.data
      dispatch(updateFeed({ id, likedUsers }))
      dispatch(setUser(user))
    })
    .catch((e) => console.log(e))
}

export const deleteCommentLike = (id) => (dispatch) => {
  axios.delete(`/comment/${id}/LikeIt`)
    .then((r) => {
      const { likedUsers, user } = r.data
      dispatch(updateFeed({ id, likedUsers }))
      dispatch(setUser(user))
    })
    .catch((e) => console.log(e))
}

export const logout = () => (dispatch) => {
  axios.get('/logout')
    .then((r) => {
      dispatch(logoutUser())
      dispatch(setLogout())
    })
    .catch((e) => console.log(e))
}
