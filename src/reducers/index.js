import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import account from './account'
import auth from './auth'
import feed from './feed'
import members from './members'
import notifications from './notifications'
import photos from './photos'
import sun from './sun'
import timeline from './timeline'


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
