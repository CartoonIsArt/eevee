import { combineReducers } from 'redux'
import user from './user'
import members from './members'
import noties from './noties'
import sun from './sun'
import timeline from './timeline'

const reducers = combineReducers({
  sun,
  user,
  members,
  noties,
  timeline,
})

export default reducers
