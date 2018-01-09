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
import Registration from './container/Registration';
import Portal from './container/Portal'
import Login from './container/Login'
import SingleFeed from './container/SingleFeed'
import EditUserProfile from './container/EditUserProfile'

// eslint-disable-next-line
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
    path: '/settings/account',
    sidebar: () => <Sider />,
    main: () => <EditUserProfile />,
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
