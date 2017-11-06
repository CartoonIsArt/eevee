import React from 'react'
import Sider from './container/evee/Sider'
import Dashboard from './container/evee/Dashboard'
import Noties from './container/blacky/Noties'
import Members from './container/evee/Members'
import Accounting from './container/evee/Accounting'
import Cleaning from './container/evee/Cleaning'
import OldNoties from './container/evee/OldNoties'
import OldTexts from './container/evee/OldTexts'
import Deactivate from './container/evee/Deactivate'
import Logout from './container/evee/Logout'
import Userpage from './container/evee/Userpage'
import Doorlock from './container/evee/Doorlock'
import Registration from './container/blacky/Registration';
import Portal from './container/blacky/Portal'
import Login from './container/blacky/Login'
import SingleFeed from './container/blacky/SingleFeed'

export const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div />,
    main: () => <Portal />,
  },
  {
    path: '/login',
    sidebar: () => <div />,
    main: () => <Login />,
  },
  {
    path: '/registration',
    sidebar: () => <div />,
    main: () => <Registration />,
  },
  {
    path: '/feed/:id',
    sidebar: () => <div />,
    main: () => <SingleFeed />,
  },
  {
    path: '/dashboard',
    sidebar: () => <Sider />,
    main: () => <Dashboard />,
  },
  {
    path: '/noties',
    sidebar: () => <Sider />,
    main: () => <Noties />,
  },
  {
    path: '/accounting',
    sidebar: () => <Sider />,
    main: () => <Accounting />,
  },
  {
    path: '/cleaning',
    sidebar: () => <Sider />,
    main: () => <Cleaning />,
  },
  {
    path: '/members',
    exact: true,
    sidebar: () => <Sider />,
    main: () => <Members />,
  },
  {
    path: '/members/:username',
    sidebar: () => <div />,
    main: () => <Userpage />,
  },
  {
    path: '/old/noties',
    sidebar: () => <div />,
    main: () => <OldNoties />,
  },
  {
    path: '/old/texts',
    sidebar: () => <div />,
    main: () => <OldTexts />,
  },
  {
    path: '/deactivate',
    sidebar: () => <Sider />,
    main: () => <Deactivate />,
  },
  {
    path: '/logout',
    sidebar: () => <Sider />,
    main: () => <Logout />,
  },
  {
    path: '/doorlock',
    sidebar: () => <Sider />,
    main: () => <Doorlock />,
  },
]
