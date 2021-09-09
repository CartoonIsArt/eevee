import { mergeObject } from '../lib'


const feed = (state = {}, action) => {
  switch (action.type) {
    case 'SETFEED':
      return action.feed
    case 'UPDATEFEED':
      return mergeObject(state, action.feed)
    case 'UPDATECOMMENT':
      if (state.comments) {
        state.comments = state.comments.map((comment) => {
          if (comment.id === action.comment.id)
            return mergeObject(comment, action.comment)
          return comment
        })
      }
      return mergeObject({}, state)
    default:
      return state
  }
}

export default feed
