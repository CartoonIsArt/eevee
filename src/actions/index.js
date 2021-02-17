import axios from 'axios'

// const host = 'https://cia.kw.ac.kr/api/'
const host = 'http://localhost/api/'

const SET_SUN = 'SETSUN'
const TOGGLE_SUN = 'TOGGLESUN'
const SET_TIMELINE = 'SETTIMELINE'
const UPDATE_FEED = 'UPDATEFEED'
const APPEND_FEED = 'APPENDFEED'
const SET_USER = 'SETUSER'
const SET_MEMBERS = 'SETMEMBERS'
const SET_NOTIES = 'SETNOTIES'
<<<<<<< HEAD
// const APPEND_NOTIES = 'APPENDNOTIES'
=======
const APPEND_TIMELINE = 'APPENDTIMELINE'
// const APPEND = 'APPEND' // future
>>>>>>> dc46c2cfaa6a9556b4f66e532324521cc73acec8

const setSun = sun => ({ type: SET_SUN, sun })
const toggleSun = () => ({ type: TOGGLE_SUN, sun: false })
const setUser = user => ({ type: SET_USER, user })
const setTimeline = timeline => ({ type: SET_TIMELINE, timeline })
<<<<<<< HEAD
const appendFeed = feed => ({ type: APPEND_FEED, feed })
=======
const appendTimeline = timeline => ({ type: APPEND_TIMELINE, timeline })
>>>>>>> dc46c2cfaa6a9556b4f66e532324521cc73acec8
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
  axios.get(`${host}users`)
    .then((r) => {
      dispatch(setMembers(r.data))
    })
    .catch()
}

export const getUser = () => (dispatch) => {
  axios.get(`${host}users/session`)
    .then((r) => {
      dispatch(setUser(r.data))
    })
<<<<<<< HEAD
    .catch((e) => {
      console.log(e)
    })
=======
    .catch(e => console.log(e))
>>>>>>> dc46c2cfaa6a9556b4f66e532324521cc73acec8
}

export const getNoties = () => (dispatch) => {
  dispatch(setNoties([
    {
      id: 1,
<<<<<<< HEAD
      createdAt: '2017-06-22T07:03:20.963737Z',
      from: user1,
      text: '님의 댓글: 구동게 메인화면에서는 모던동게 링크가 https://cia.kw.ac.kr 로 이어지는데 게시판이나 글로 이동후에는 https://128.134.57.197 로 이어집니다.',
      had_read: false,
    },
    {
      id: 2,
=======
>>>>>>> dc46c2cfaa6a9556b4f66e532324521cc73acec8
      createdAt: '2017-06-23T07:03:20.963737Z',
      from: user1,
      text: '님의 댓글: 전 시간 좀 지나니까 적용되던데 다시 시도해보고 기다려보는건 어떤가욤 ㅇㅅㅇ??',
      had_read: true,
    },
    {
      id: 2,
      createdAt: '2017-06-10T07:03:20.963737Z',
      from: user1,
      text: '공지: 6월 종강총회 회의록',
      had_read: false,
    },
  ]))
}

export const getTimeline = (page = 1) => (dispatch) => {
  axios.get(`${host}timeline/${page}`)
    .then((r) => {
      dispatch(setTimeline(r.data))
    })
    .catch((e) => {
      console.log(e)
    })
}

export const postDocumentLike = (id, userid) => (dispatch) => {
  axios.post(`${host}documents/${id}/likeIt`)
    .then((r) => {
      dispatch(updateFeed({
        id: userid,
        likedBy: r.data.likedBy,
      }))
    })
    .catch(e => console.log(e))
}

<<<<<<< HEAD
export const deleteDocumentLike = (id, userid) => (dispatch) => {
  axios.delete(`${host}documents/${id}/likeIt`)
=======
export const postDocumentLike = id => (dispatch) => {
  axios.post(`${host}documents/${id}/LikeIt`)
>>>>>>> dc46c2cfaa6a9556b4f66e532324521cc73acec8
    .then((r) => {
      dispatch(updateFeed({
        id: userid,
        likedBy: r.data.likedBy,
      }))
    })
    .catch(e => console.log(e))
}

<<<<<<< HEAD
export const postCommentLike = (id, userid) => (dispatch) => {
  axios.post(`${host}comments/${id}/LikeIt`)
=======
export const deleteDocumentLike = id => (dispatch) => {
  axios.delete(`${host}documents/${id}/LikeIt`)
>>>>>>> dc46c2cfaa6a9556b4f66e532324521cc73acec8
    .then((r) => {
      dispatch(updateFeed({
        id: userid,
        likedBy: r.data.likedBy,
      }))
    })
    .catch(e => console.log(e))
}

<<<<<<< HEAD
export const deleteCommentLike = (id, userid) => (dispatch) => {
  axios.delete(`${host}comments/${id}/LikeIt`)
    .then((r) => {
      dispatch(updateFeed({
        id: userid,
        likedBy: r.data.likedBy,
      }))
    })
    .catch(e => console.log(e))
}

export const patchDocument = (id, text) => (dispatch) => {
  axios.patch(`${host}documents/${id}`, {
    text,
=======
export const patchDocument = (id, data) => (dispatch) => {
  axios.patch(`${host}documents/${id}`, {
    data,
>>>>>>> dc46c2cfaa6a9556b4f66e532324521cc73acec8
  })
    .then((r) => {
      dispatch(updateFeed({
        id,
        text: r.data.text,
      }))
    })
    .catch(e => console.log(e))
}

// postRecomment 함수 작성이 필요합니다.
// 아니면 postComment로 해결해주세요.
export const postComment = data => (dispatch) => {
  axios.post(`${host}comments`, {
<<<<<<< HEAD
    documentId: data.documentId,
    commentId: data.commentId,
    text: data.text,
  })
    .then((r) => {
      dispatch(updateFeed({
        id: data.documentId,
        comments: [
          ...r.data.rootDocument.comments,
          {
            ...r.data,
            likedBy: [],
            replies: [],
          },
        ],
        likedBy: [],
      }))
    })
    .catch(e => console.log(e))
}

export const postDocument = text => (dispatch) => {
  axios.post(`${host}documents`, {
    text,
=======
    data,
>>>>>>> dc46c2cfaa6a9556b4f66e532324521cc73acec8
  })
    .then((r) => {
      dispatch(appendFeed({
        ...r.data,
        comments: [],
        likedBy: [],
      }))
    })
    .catch(e => console.log(e))
}

export const postDocument = data => (dispatch) => {
  axios.post(`${host}documents`, {
    data,
  })
    .then((r) => {
      dispatch(appendTimeline(r.data))
    })
    .catch(e => console.log(e))
}
