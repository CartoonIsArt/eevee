import { mergeObject } from '../lib'


const appendComment = (content, comment, rootId) => {
  if (content.id === rootId)
    content.comments = (content.comments || []).concat([comment])
  else
    (content.comments || []).forEach(_comment => appendComment(_comment, comment, rootId))
}

const feed = (state = {}, action) => {
  switch (action.type) {
    case 'SETFEED':
      return action.feed
    case 'UPDATEFEED':
      return mergeObject(state, action.feed)
    case 'APPENDCOMMENT':
      const root = action.comment.rootComment || action.comment.rootDocument
      appendComment(state, action.comment, root.id)
      return mergeObject({}, state)
    default:
      return state
  }
}

export default feed
