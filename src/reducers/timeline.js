const timeline = (state = [], action) => {
  switch (action.type) {
    case 'SETTIMELINE':
      return action.timeline
    case 'APPENDTIMELINE':
      return [
        ...state,
        ...action.timeline,
      ]
    case 'UPDATETIMELINE':
      return state.map((feed, idx) => idx === action.id ? action.feed : feed)
    case 'PUSHFEED':
      return [
        action.feed,
        ...state,
      ]
    case 'UPDATEHEAD':
      return state.map((feed, idx) => idx === 0 ? action.feed : feed)
    case 'DELETEHEAD':
      return state.slice(1, state.length)
    default:
      return state
  }
}

// export { timeline as default }
export default timeline
