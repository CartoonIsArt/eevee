import { mergeObject } from "../lib"

const notifications = (state = [], action) => {
  switch (action.type) {
    case 'SETNOTIFICATIONS':
      return action.notifications
    case 'INSERTNOTIFICATIONS':
      return [
        action.notification,
        ...state,
      ]
    case 'UPDATENOTIFICATIONS':
      if (!action.notification.isNotification) {
        return state.filter((notification) => notification.id !== action.notification.id)
      }
      let hasInclude = false
      const res = state.map((notification) => {
        if (notification.id === action.notification.id) {
          hasInclude = true
          return mergeObject(notification, action.notification)
        }
        return notification
      })
      if (!hasInclude) {
        state.push(action.notification)
        state.sort((lhs, rhs) => (rhs.id - lhs.id))
        return state.splice(0)
      }
      return res
    default:
      return state
  }
}

export default notifications
