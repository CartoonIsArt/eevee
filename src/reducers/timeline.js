import { mergeObject } from '../lib'

const timeline = (state = [], action) => {
  switch (action.type) {
    case 'SETTIMELINE':
<<<<<<< HEAD
=======
      return action.timeline
    case 'APPENDTIMELINE':
>>>>>>> dc46c2cfaa6a9556b4f66e532324521cc73acec8
      return [
        ...state,
        ...action.timeline,
      ]
    case 'APPENDFEED':
      return Object.values([action.feed, ...state])
    case 'UPDATEFEED':
      return state.map((feed) => {
        if (feed.id === action.feed.id) {
          return mergeObject(feed, action.feed)
        }
        return feed
      })
    case 'APPENDCOMMENT':
      return state.map((feed) => {
        if (feed.id === action.comment.rootDocument.id) {
          return Object.values([action.comment, ...feed.comments])
        }
        return feed
      })
    default:
      return state
  }
}

// export { timeline as default }
export default timeline
