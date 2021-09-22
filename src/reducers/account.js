import { mergeObject } from "../lib"

const account = (state = {}, action) => {
  switch (action.type) {
    case 'SETACCOUNT':
      return mergeObject({}, action.account)
    case 'UPDATEACCOUNT':
      return mergeObject(state, action.account)
    default:
      return state
  }
}

export default account
