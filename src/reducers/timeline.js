const timeline = (state = [], action) => {
  switch (action.type) {
    case 'SETTIMELINE':
      return action.timeline
    case 'APPENDTIMELINE':
      return [
        ...state,
        ...action.timeline,
      ]
    case 'UPDATEFEED':
      console.log(state, action)
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
