import { createStore } from 'redux'

export const sun = (state=true, action) => {
  switch(action.type) {
    case "TOGGLESUN":
      return state ? false : true
    case "SETSUN":
      return action.sun
    default:
      return state
  }
}
