const timeline = (state = [], action) => {
  switch (action.type) {
    case 'SETTIMELINE':
      return action.timeline
    case 'APPEND':
      return [
        ...state,
        timeline,
      ]
    case 'UPDATEFEED':
      return state.filter((feed, idx) => {
        if (idx === action.feed.id) {
          return action.feed
        }
        return feed
      })
    default:
      return state
  }
}

// export { timeline as default }
export default timeline
