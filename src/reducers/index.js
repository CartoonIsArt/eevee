import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import account from './account'
import auth from './auth'
import enrollments from './enrollments'
import feed from './feed'
import members from './members'
import notifications from './notifications'
import photos from './photos'
import registrations from './registrations'
import timeline from './timeline'
import { vote, votes } from './vote'


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  account,
  auth,
  enrollments,
  feed,
  members,
  notifications,
  photos,
  registrations,
  timeline,
  vote,
  votes,
})

export default createRootReducer
