import axios from '../fetches/axios'

const SET_SUN = 'SETSUN'
const TOGGLE_SUN = 'TOGGLESUN'
const SET_TIMELINE = 'SETTIMELINE'
const SET_FEED = 'SETFEED'
const UPDATE_FEED = 'UPDATEFEED'
const SET_ACCOUNT = 'SETACCOUNT'
const SET_MEMBERS = 'SETMEMBERS'
const SET_NOTIFICATIONS = 'SETNOTIFICATIONS'
const APPEND_TIMELINE = 'APPENDTIMELINE'
const APPEND_FEED = 'APPENDFEED'
const APPEND_COMMENT = 'APPENDCOMMENT'
const UPDATE_COMMENT = 'UPDATECOMMENT'
const SET_LOGIN = 'SETLOGIN'
const SET_LOGOUT = 'SETLOGOUT'
const SET_PHOTOS = 'SETPHOTOS'

const setSun = (sun) => ({ type: SET_SUN, sun })
const toggleSun = () => ({ type: TOGGLE_SUN, sun: false })
const setAccount = (account) => ({ type: SET_ACCOUNT, account })
const setTimeline = (timeline) => ({ type: SET_TIMELINE, timeline })
const appendTimeline = (timeline) => ({ type: APPEND_TIMELINE, timeline })
const setFeed = (feed) => ({ type: SET_FEED, feed })
const appendFeed = (feed) => ({ type: APPEND_FEED, feed })
const updateFeed = (feed) => ({ type: UPDATE_FEED, feed })
const appendComment = (comment) => ({ type: APPEND_COMMENT, comment })
const updateComment = (comment) => ({ type: UPDATE_COMMENT, comment })
const setMembers = (members) => ({ type: SET_MEMBERS, members })
const setNotifications = (notifications) => ({ type: SET_NOTIFICATIONS, notifications })
const setLogin = () => ({ type: SET_LOGIN })
const setLogout = () => ({ type: SET_LOGOUT })
const setPhotos = (photos) => ({ type: SET_PHOTOS, photos })

export const sunrise = () => (dispatch) =>
  dispatch(setSun(true))

export const sundown = () => (dispatch) =>
  dispatch(setSun(false))
  
export const suntoggle = () => (dispatch) =>
  dispatch(toggleSun())

// Auth
//
export const login = (account) => (dispatch) =>
  axios.post('/public/login', account)
    .then(() => {
      dispatch(setLogin(true))
    })

export const logout = () => (dispatch) => 
  axios.get('/logout')
    .then(() => {
      dispatch(setLogout())
    })

export const clearAccount = () => (dispatch) =>
  dispatch(setAccount({}))

// Account
//
export const getMembers = () => (dispatch) =>
  axios.get('/account')
    .then((r) => {
      const { accounts } = r.data
      dispatch(setMembers(accounts))
    })

export const getAccount = () => (dispatch) =>
  axios.get('/account/authenticated')
    .then((r) => {
      const { account } = r.data
      dispatch(setAccount(account))
    })

// Timeline
//
export const getTimeline = (page = 1, keyword = undefined) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()
  
  return axios.get(`/timeline?${queryString}`)
    .then((r) => {
      const { timeline } = r.data
      dispatch(page == 1 ? setTimeline(timeline) : appendTimeline(timeline))
    })
}

export const getAccountTimeline = (username, page = 1, keyword = undefined) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()

  return axios.get(`/timeline/${username}?${queryString}`)
    .then((r) => {
      const { timeline } = r.data
      dispatch(page == 1 ? setTimeline(timeline) : appendTimeline(timeline))
    })
}

export const getLikedTimeline = (username, page = 1, keyword = undefined) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()
  
  return axios.get(`/timeline/${username}/likes?${queryString}`)
    .then((r) => {
      const { timeline } = r.data
      dispatch(page == 1 ? setTimeline(timeline) : appendTimeline(timeline))
    })
}

export const getCommentedTimeline = (username, page = 1, keyword = undefined) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()
  
  return axios.get(`/timeline/${username}/comments?${queryString}`)
    .then((r) => {
      const { timeline } = r.data
      dispatch(page == 1 ? setTimeline(timeline) : appendTimeline(timeline))
    })
}

// Notification
export const getNotifications = (from) => (dispatch) => {
  const parameter = { from }
  const queryString = new URLSearchParams(parameter).toString()

  return axios.get(`/notification?${queryString}`)
    .then((r) => {
      const { notifications } = r.data
      dispatch(setNotifications(notifications))
    })
}

// Feed
//
export const getFeed = (id) => (dispatch) =>
  axios.get(`/document/${id}`)
    .then((r) => {
      const { document } = r.data
      dispatch(setFeed(document))
    })

// Document
//
export const postDocument = (document) => (dispatch) => 
  axios.post('/document', document)
    .then((r) => {
      const { document } = r.data
      dispatch(appendFeed(document))
      dispatch(setAccount(document.author))
    })

export const patchDocument = (document) => (dispatch) => 
  axios.patch('/document', document)
    .then((r) => {
      const { document } = r.data
      dispatch(updateFeed(document))
    })

export const postDocumentLike = (id) => (dispatch) => 
  axios.post(`/document/${id}/LikeIt`)
    .then((r) => {
      const { likedAccounts, account } = r.data
      dispatch(updateFeed({ id, likedAccounts }))
      dispatch(setAccount(account))
    })

export const patchDocumentLike = (id) => (dispatch) => 
  axios.patch(`/document/${id}/LikeIt`)
    .then((r) => {
      const { likedAccounts, account } = r.data
      dispatch(updateFeed({ id, likedAccounts }))
      dispatch(setAccount(account))
    })

// Comment
//
export const postComment = (comment) => (dispatch) => 
  axios.post('/comment', comment)
    .then((r) => {
      const { comment } = r.data
      dispatch(appendComment(comment))
      dispatch(setAccount(comment.author))
    })

export const postCommentLike = (id) => (dispatch) => 
  axios.post(`/comment/${id}/LikeIt`)
    .then((r) => {
      const { likedAccounts } = r.data
      dispatch(updateComment({ id, likedAccounts }))
    })

export const patchCommentLike = (id) => (dispatch) =>
  axios.patch(`/comment/${id}/LikeIt`)
    .then((r) => {
      const { likedAccounts } = r.data
      dispatch(updateComment({ id, likedAccounts }))
    })

// File
// 
export const postPhotos = (photos) => (dispatch) => {
  const config = {
    header: { 'Content-Type': 'multipart/form-data' }
  }
  const formData = new FormData()
  photos.forEach(photo => formData.append('photo', photo))

  return axios.post('/files', formData, config)
    .then((r) => {
      const { photos } = r.data
      dispatch(setPhotos(photos))
    })
}