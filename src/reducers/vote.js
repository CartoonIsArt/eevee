import { mergeObject } from "../lib"

export const vote = (state = {}, action) => {
  switch (action.type) {
    case 'SETVOTE':
      return action.vote
    case 'UPDATEPOLL':
      return {
        ...state,
        polls: state.polls.concat([action.poll]),
      }
    default:
      return state
  }
}

export const votes = (state = [], action) => {
  switch (action.type) {
    case 'SETVOTES':
      return action.votes
    case 'APPENDVOTE':
      return [
        action.vote,
        ...state,
      ]
    case 'UPDATEPOLL':
      return state.map((vote) => {
        if (action.poll.vote.id === vote.id)
          return mergeObject(vote, action.poll.vote)
        return vote
      })
    default:
      return state
  }
}
