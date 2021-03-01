import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export default function configureStore() {
  return createStore(
    createRootReducer(history),
    compose(applyMiddleware(routerMiddleware(history), thunk)),
  )
}
