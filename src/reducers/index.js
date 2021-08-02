import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user'
import members from './members'
import noties from './noties'
import sun from './sun'
import timeline from './timeline'
import auth from './auth'
import photos from './photos'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  sun,
  user,
  members,
  noties,
  timeline,
  auth,
  photos,
})

export default createRootReducer
