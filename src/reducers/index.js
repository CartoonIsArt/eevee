import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import members from './members'
import noties from './noties'
import sun from './sun'
import timeline from './timeline'

const reducers = combineReducers({
  router: routerReducer,
  sun,
  user,
  members,
  noties,
  timeline,
})

export default reducers
