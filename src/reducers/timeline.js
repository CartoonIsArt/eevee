const timeline = (state = [], action) => {
  switch (action.type) {
    case 'SETTIMELINE':
      return action.timeline
    case 'APPENDTIMELINE':
      return [
        ...state,
        ...action.timeline,
      ]
    default:
      return state
  }
}

// export { timeline as default }
export default timeline
