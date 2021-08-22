import React from 'react'
import Accounting from './container/Accounting'
import Cleaning from './container/Cleaning'
import Deactivate from './container/Deactivate'
import Doorlock from './container/Doorlock'
import EditUserProfile from './container/EditUserProfile'
import Enrollment from './container/Enrollment'
import Law from './container/Law'
import Login from './container/Login'
import Members from './container/Members'
import Notifications from './container/Notifications'
import OldNoties from './container/OldNoties'
import OldTexts from './container/OldTexts'
import Page404 from './container/Page404'
import Portal from './container/Portal'
import Registration from './container/Registration'
import Sider from './container/Sider'
import SingleFeed from './container/SingleFeed'
import Userpage from './container/Userpage'


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
    path: '/enrollment',
    has_navigator: true,
    sidebar: <Sider />,
    main: <Enrollment />,
  },
  {
    path: '/notifications',
    has_navigator: true,
    sidebar: <Sider />,
    main: <Notifications />,
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
    path: '/doorlock',
    has_navigator: true,
    sidebar: <Sider />,
    main: <Doorlock />,
  },
  {
    path: '/law',
    has_navigator: true,
    sidebar: <Sider />,
    main: <Law />,
  },
  {
    path: '*',
    has_navigator: false,
    sidebar: <div />,
    main: <Page404 />,
  },
]
