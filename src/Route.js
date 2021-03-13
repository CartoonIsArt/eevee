import React from 'react'
import Sider from './container/Sider'
import Dashboard from './container/Dashboard'
import Noties from './container/Noties'
import Members from './container/Members'
import Accounting from './container/Accounting'
import Cleaning from './container/Cleaning'
import OldNoties from './container/OldNoties'
import OldTexts from './container/OldTexts'
import Deactivate from './container/Deactivate'
import Logout from './container/Logout'
import Userpage from './container/Userpage'
import Doorlock from './container/Doorlock'
import Registration from './container/Registration'
import Portal from './container/Portal'
import Login from './container/Login'
import SingleFeed from './container/SingleFeed'
import EditUserProfile from './container/EditUserProfile'

// eslint-disable-next-line
export const routes = [
  {
    path: '/',
    exact: true,
    has_navigator: true,
    sidebar: <div />,
    main: <Portal />,
  },
  {
    path: '/login',
    has_navigator: false,
    is_public: true,
    sidebar: <div />,
    main: <Login />,
  },
  {
    path: '/registration',
    has_navigator: false,
    is_public: true,
    sidebar: <div />,
    main: <Registration />,
  },
  {
    path: '/feed/:id',
    has_navigator: true,
    sidebar: <div />,
    main: <SingleFeed />,
  },
  {
    path: '/dashboard',
    has_navigator: true,
    sidebar: <Sider />,
    main: <Dashboard />,
  },
  {
    path: '/noties',
    has_navigator: true,
    sidebar: <Sider />,
    main: <Noties />,
  },
  {
    path: '/accounting',
    has_navigator: true,
    sidebar: <Sider />,
    main: <Accounting />,
  },
  {
    path: '/cleaning',
    has_navigator: true,
    sidebar: <Sider />,
    main: <Cleaning />,
  },
  {
    path: '/members',
    exact: true,
    has_navigator: true,
    sidebar: <Sider />,
    main: <Members />,
  },
  {
    path: '/members/:username',
    has_navigator: true,
    sidebar: <div />,
    main: <Userpage />,
  },
  {
    path: '/old/noties',
    has_navigator: true,
    sidebar: <div />,
    main: <OldNoties />,
  },
  {
    path: '/old/texts',
    has_navigator: true,
    sidebar: <div />,
    main: <OldTexts />,
  },
  {
    path: '/settings/account',
    has_navigator: true,
    sidebar: <Sider />,
    main: <EditUserProfile />,
  },
  {
    path: '/deactivate',
    has_navigator: true,
    sidebar: <Sider />,
    main: <Deactivate />,
  },
  {
    path: '/logout',
    has_navigator: true,
    sidebar: <Sider />,
    main: <Logout />,
  },
  {
    path: '/doorlock',
    has_navigator: true,
    sidebar: <Sider />,
    main: <Doorlock />,
  },
]
