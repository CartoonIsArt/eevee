// import { mergeObject } from '../lib'

const feed = (state = {}, action) => {
  switch (action.type) {
    case 'SETFEED':
      return action.feed
    // case 'APPENDFEED':
    //   return Object.values([action.feed, ...state])
    // case 'UPDATEFEED':
    //   return state.map((feed) => {
    //     if (feed.id === action.feed.id) {
    //       return mergeObject(feed, action.feed)
    //     }
    //     return feed
    //   })
    // case 'APPENDCOMMENT':
    //   return state.map((feed) => {
    //     if (feed.id === action.comment.rootDocument.id)
    //       feed.comments.push(action.comment)
    //     return feed
    //   })
    default:
      return state
  }
}

export default feed
