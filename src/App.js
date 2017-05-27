import React, { Component } from 'react';
import logo from './logo.svg';
import Portal from './containers/Portal'
import './App.css';
import Nav from './containers/Nav'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import reducers from './reducers'

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Nav />
            <div className="Container" >
              <Route exact path="/" component={Portal} />
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
export default App;
