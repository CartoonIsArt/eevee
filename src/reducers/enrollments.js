const enrollments = (state = [], action) => {
  switch (action.type) {
    case 'SETENROLLMENTS':
      return action.enrollments
    case 'APPENDENROLLMENTS':
      return [
        action.enrollment,
        ...state,
      ]
    default:
      return state
  }
}

export default enrollments
