import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router-dom'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import './App.css';
import Nav from './container/Nav'
import reducers from './reducers'
import { routes } from './Route'

const history = createHistory()
const middleware = applyMiddleware(
  routerMiddleware(history),
  thunk,
)

const store = createStore(
  reducers,
  middleware,
)

class App extends Component {
  static isNavEnabled() {
    const ignoredPaths = ['/login']
    return ignoredPaths.indexOf(history.location.pathname) === -1
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div style={{ background: '#dfdfdf' }}>
            { App.isNavEnabled() && (<Nav />) }
            <div className="Container">
              {routes.map((route, idx) =>
                // eslint-disable-next-line
                (<div key={idx} style={{ display: 'flex' }}> 
                  <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.sidebar}
                  />
                  <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                </div>
                ))}
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
export default App;
