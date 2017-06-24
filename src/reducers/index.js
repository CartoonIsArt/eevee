import { combineReducers } from 'redux'
import sun from './sun'
import timeline from './timeline'

const reducers = combineReducers({
  sun,
  timeline,
})

export default reducers
