import React from 'react'
import Accounting from './containers/Accounting'
import Cleaning from './containers/Cleaning'
import ResetActiveMembers from './containers/ResetActiveMembers'
import Doorlock from './containers/Doorlock'
import EditUserProfile from './containers/EditUserProfile'
import Enrollment from './containers/Enrollment'
import Law from './containers/Law'
import Login from './containers/Login'
import Members from './containers/Members'
import Notifications from './containers/Notifications'
import OldNoties from './containers/OldNoties'
import OldTexts from './containers/OldTexts'
import Page404 from './containers/Page404'
import Portal from './containers/Portal'
import Registration from './containers/Registration'
import Sider from './containers/Sider'
import SingleFeed from './containers/SingleFeed'
import Userpage from './containers/Userpage'
import EnrollmentList from './containers/EnrollmentList'
import Votes from './containers/Votes'
import Vote from './components/Vote'
import RegistrationApproval from './containers/RegistrationApproval'


// eslint-disable-next-line
export const routes = [
  {
    path: '/',
    exact: true,
    has_navigation: true,
    sidebar: <div />,
    main: <Portal />,
  },
  {
    path: '/login',
    is_public: true,
    sidebar: <div />,
    main: <Login />,
  },
  {
    path: '/registration',
    is_public: true,
    sidebar: <div />,
    main: <Registration />,
  },
  {
    path: '/registration-approval',
    has_navigation: true,
    sidebar: <Sider />,
    main: <RegistrationApproval />,
  },
  {
    path: '/feed/:id',
    has_navigation: true,
    sidebar: <div />,
    main: <SingleFeed />,
  },
  {
    path: '/enrollment',
    has_navigation: true,
    sidebar: <Sider />,
    main: <Enrollment />,
  },
  {
    path: '/notifications',
    has_navigation: true,
    sidebar: <Sider />,
    main: <Notifications />,
  },
  {
    path: '/accounting',
    has_navigation: true,
    sidebar: <Sider />,
    main: <Accounting />,
  },
  {
    path: '/cleaning',
    has_navigation: true,
    sidebar: <Sider />,
    main: <Cleaning />,
  },
  {
    path: '/members',
    exact: true,
    has_navigation: true,
    sidebar: <Sider />,
    main: <Members />,
  },
  {
    path: '/members/:username',
    has_navigation: true,
    sidebar: <div />,
    main: <Userpage />,
  },
  {
    path: '/old/noties',
    has_navigation: true,
    sidebar: <div />,
    main: <OldNoties />,
  },
  {
    path: '/old/texts',
    has_navigation: true,
    sidebar: <div />,
    main: <OldTexts />,
  },
  {
    path: '/settings/account',
    has_navigation: true,
    sidebar: <div />,
    main: <EditUserProfile />,
  },
  {
    path: '/enrollment-list',
    has_navigation: true,
    sidebar: <Sider />,
    main: <EnrollmentList />
  },
  {
    path: '/reset-active-members',
    has_navigation: true,
    sidebar: <Sider />,
    main: <ResetActiveMembers />,
  },
  {
    path: '/doorlock',
    has_navigation: true,
    sidebar: <Sider />,
    main: <Doorlock />,
  },
  {
    path: '/law',
    has_navigation: true,
    sidebar: <Sider />,
    main: <Law />,
  },
  {
    path: '/votes',
    has_navigation: true,
    sidebar: <Sider />,
    main: <Votes />,
  },
  {
    path: '/embed/vote/:id',
    has_navigation: false,
    sidebar: <div />,
    main: <Vote />,
  },
  {
    path: '*',
    sidebar: <div />,
    main: <Page404 />,
  },
]
