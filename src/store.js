import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore, compose } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import createRootReducer from './reducers'


const history = createBrowserHistory()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['account', 'auth']
}
const persistedReducer = persistReducer(persistConfig, createRootReducer(history))

const store = (function configureStore() {
  return createStore(
    persistedReducer,
    compose(applyMiddleware(routerMiddleware(history), thunk)),
  )
})()
const persistor = persistStore(store)

export { history, store, persistor }