import axios from '../fetches/axios'

const SET_LOGIN             = 'SETLOGIN'
const SET_LOGOUT            = 'SETLOGOUT'
const SET_ACCOUNT           = 'SETACCOUNT'
const UPDATE_ACCOUNT        = 'UPDATEACCOUNT'
const SET_MEMBERS           = 'SETMEMBERS'
const UPDATE_MEMBERS        = 'UPDATEMEMBERS'
const SET_TIMELINE          = 'SETTIMELINE'
const APPEND_TIMELINE       = 'APPENDTIMELINE'
const SET_NOTIFICATIONS     = 'SETNOTIFICATIONS'
const INSERT_NOTIFICATIONS  = 'INSERTNOTIFICATIONS'
const UPDATE_NOTIFICATIONS  = 'UPDATENOTIFICATIONS'
const SET_FEED              = 'SETFEED'
const APPEND_FEED           = 'APPENDFEED'
const UPDATE_FEED           = 'UPDATEFEED'
const APPEND_COMMENT        = 'APPENDCOMMENT'
const UPDATE_COMMENT        = 'UPDATECOMMENT'
const SET_PHOTOS            = 'SETPHOTOS'
const SET_ENROLLMENTS       = 'SETENROLLMENTS'
const APPEND_ENROLLMENTS    = 'APPENDENROLLMENTS'
const SET_REGISTRATIONS     = 'SETREGISTRATIONS'
const SET_VOTE              = 'SETVOTE'
const SET_VOTES             = 'SETVOTES'
const APPEND_VOTE           = 'APPENDVOTE'
const UPDATE_POLL           = 'UPDATEPOLL'

const setLogin = () => ({ type: SET_LOGIN })
const setLogout = () => ({ type: SET_LOGOUT })
const setAccount = (account) => ({ type: SET_ACCOUNT, account })
const updateAccount = (account) => ({ type: UPDATE_ACCOUNT, account })
const setMembers = (members) => ({ type: SET_MEMBERS, members })
const updateMembers = (actives, inactives) => ({ type: UPDATE_MEMBERS, members: { actives, inactives } })
const setTimeline = (timeline) => ({ type: SET_TIMELINE, timeline })
const appendTimeline = (timeline) => ({ type: APPEND_TIMELINE, timeline })
const setNotifications = (notifications) => ({ type: SET_NOTIFICATIONS, notifications })
const insertNotifications = (notification) => ({ type: INSERT_NOTIFICATIONS, notification })
const updateNotifications = (notification) => ({ type: UPDATE_NOTIFICATIONS, notification })
const setFeed = (feed) => ({ type: SET_FEED, feed })
const appendFeed = (feed) => ({ type: APPEND_FEED, feed })
const updateFeed = (feed) => ({ type: UPDATE_FEED, feed })
const appendComment = (comment) => ({ type: APPEND_COMMENT, comment })
const updateComment = (comment) => ({ type: UPDATE_COMMENT, comment })
const setPhotos = (photos) => ({ type: SET_PHOTOS, photos })
const setEnrollments = (enrollments) => ({ type: SET_ENROLLMENTS, enrollments })
const appendEnrollments = (enrollment) => ({ type: APPEND_ENROLLMENTS, enrollment })
const setRegistrations = (registrations, unregistrations) => ({ type: SET_REGISTRATIONS, members: { registrations, unregistrations } })
const setVote = (vote) => ({ type: SET_VOTE, vote })
const setVotes = (votes) => ({ type: SET_VOTES, votes })
const appendVote = (vote) => ({ type: APPEND_VOTE, vote })
const updatePoll = (poll) => ({ type: UPDATE_POLL, poll })

// Auth
//
export const login = (account) => (dispatch) =>
  axios.post('/public/login', account)
    .then(() => {
      dispatch(setLogin())
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
export const getAccount = () => (dispatch) =>
axios.get('/account/authenticated')
  .then((r) => {
    const { account } = r.data
    dispatch(setAccount(account))
  })

export const getMembers = () => (dispatch) =>
  axios.get('/account')
    .then((r) => {
      const { accounts } = r.data
      dispatch(setMembers(accounts))
    })

export const patchAccount = (account) => (dispatch) =>
  axios.patch(`/account/${account.id}`, account)
    .then(() => dispatch(updateAccount(account)))

export const patchMembers = (members) => (dispatch) =>
  axios.patch('/account', members)
    .then((r) => {
      const { actives, inactives } = r.data
      dispatch(updateMembers(actives, inactives))
    })

// Timeline
//
export const getTimeline = ({ page, keyword }) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()
  
  return axios.get(`/timeline?${queryString}`)
    .then((r) => {
      const { timeline } = r.data
      dispatch(page == 1 ? setTimeline(timeline) : appendTimeline(timeline))
    })
}

export const getAccountTimeline = ({ username, page, keyword }) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()

  return axios.get(`/timeline/${username}?${queryString}`)
    .then((r) => {
      const { timeline } = r.data
      dispatch(page == 1 ? setTimeline(timeline) : appendTimeline(timeline))
    })
}

export const getCommentedTimeline = ({ username, page, keyword }) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()
  
  return axios.get(`/timeline/${username}/comments?${queryString}`)
    .then((r) => {
      const { timeline } = r.data
      dispatch(page == 1 ? setTimeline(timeline) : appendTimeline(timeline))
    })
}

export const getLikedTimeline = ({ username, page, keyword }) => (dispatch) => {
  const parameter = keyword ? { page, keyword } : { page }
  const queryString = new URLSearchParams(parameter).toString()
  
  return axios.get(`/timeline/${username}/likes?${queryString}`)
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
      
      if (document.isNotification)
        dispatch(insertNotifications(document))
    })

export const patchDocument = (document) => (dispatch) => 
  axios.patch('/document', document)
    .then((r) => {
      const { document } = r.data
      dispatch(updateFeed(document))
      dispatch(updateNotifications(document))
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
class UnsafeImageError extends Error {
  constructor(message, unsafes) {
    super(message)
    this.unsafes = unsafes
  }
}

export const postPhotos = (photos) => (dispatch) => {
  const config = {
    header: { 'Content-Type': 'multipart/form-data' }
  }
  const formData = new FormData()
  photos.forEach(photo => formData.append('photo', photo))

  return axios.post('/files', formData, config)
    .then((r) => {
      const { photos, warning, unsafes } = r.data
      dispatch(setPhotos(photos))
      if (warning)
        throw new UnsafeImageError(warning, unsafes)
    })
}

// Enrollment
export const getRegistrations = () => (dispatch) =>
  axios.get('/registration')
    .then((r) => {
      const { registrations, unregistrations } = r.data
      dispatch(setRegistrations(registrations, unregistrations))
    })

// Enrollment
export const getEnrollments = () => (dispatch) =>
  axios.get('/enrollment')
    .then((r) => {
      const { enrollments } = r.data
      dispatch(setEnrollments(enrollments))
    })

export const postEnrollment = (enrollment) => (dispatch) =>
  axios.post('/enrollment', enrollment)
    .then((r) => {
      const { enrollment } = r.data
      dispatch(appendEnrollments(enrollment))
    })

// Vote
export const getVote = (id) => (dispatch) =>
  axios.get(`/vote/${id}`)
    .then((r) => {
      const { vote } = r.data
      dispatch(setVote(vote))
    })

export const getVotes = () => (dispatch) =>
  axios.get('/vote')
    .then((r) => {
      const { votes } = r.data
      dispatch(setVotes(votes))
    })

export const postVote = (vote) => (dispatch) =>
  axios.post('/vote', vote)
    .then((r) => {
      const { vote } = r.data
      dispatch(setVote(vote))
      dispatch(appendVote(vote))
    })

export const castVote = (id, poll) => (dispatch) =>
  axios.post(`/vote/${id}`, poll)
    .then((r) => {
      const { poll, result } = r.data
      dispatch(updatePoll(poll))
      return result
    })
