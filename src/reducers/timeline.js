import { mergeObject } from '../lib'


const appendComment = (content, comment, rootId) => {
  if (content.id === rootId)
    content.comments = (content.comments || []).concat([comment])
  else
    (content.comments || []).forEach(_comment => appendComment(_comment, comment, rootId))
}

const updateComment = (content, comment) => {
  if (content.id === comment.id)
    content = mergeObject(content, comment)
  else
    (content.comments || []).forEach(_comment => updateComment(_comment, comment))
}

const timeline = (state = [], action) => {
  switch (action.type) {
    case 'SETTIMELINE':
      return action.timeline
    case 'APPENDTIMELINE':
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
      const root = action.comment.rootComment || action.comment.rootDocument
      return state.map((feed) => {
        appendComment(feed, action.comment, root.id)
        return feed
      })
    case 'UPDATECOMMENT':
      return state.map((feed) => {
        updateComment(feed, action.comment)
        return feed
      })
    default:
      return state
  }
}

// export { timeline as default }
export default timeline
