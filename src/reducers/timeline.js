const timeline = (state = [], action) => {
  switch (action.type) {
    case 'SET':
      return action.timeline
    case 'APPEND':
      return state.append(timeline)
    default:
      return state
  }
}

// export { timeline as default }
export default timeline
