import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import './App.css';
import Nav from './container/Nav'
import { routes } from './Route'
import configureStore from './store';

const history = createBrowserHistory()
const store = configureStore(history)

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
                (
                  <div key={idx} style={{ display: 'flex' }}>
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
