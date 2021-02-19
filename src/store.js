import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'

export default function configureStore(history) {
  return createStore(
    createRootReducer(history),
    applyMiddleware(routerMiddleware(history), thunk),
  )
}
