import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import account from './account'
import members from './members'
import notifications from './notifications'
import sun from './sun'
import timeline from './timeline'
import auth from './auth'
import photos from './photos'
import feed from './feed'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  sun,
  account,
  members,
  notifications,
  timeline,
  auth,
  photos,
  feed,
})

export default createRootReducer
