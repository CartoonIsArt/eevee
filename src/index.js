import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import { history, store, persistor } from './store'
import App from './App'
import { ConfigProvider } from 'antd'
import koKR from 'antd/es/locale/ko_KR'
import './styles/main.scss'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <ConfigProvider locale={koKR}>
          <App />
        </ConfigProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
