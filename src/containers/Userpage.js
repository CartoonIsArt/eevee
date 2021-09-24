import { Affix, Card, Col, message, Row, Tabs } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { matchPath, withRouter } from 'react-router-dom'
import {
  getAccount,
  getAccountTimeline,
  getCommentedTimeline,
  getLikedTimeline,
  getMembers,
} from '../actions'
import Page404 from './Page404'
import ProfileImages from '../components/ProfileImages'
import Timeline from '../components/Timeline'
import UserInfo from '../components/UserInfo'
import UserMenu from '../components/UserMenu'
import { isEmptyObject } from '../lib'
import Loading from '../components/Loading'


const { TabPane } = Tabs

function canEditProfile(member, account) {
  return (member.id === account.id)
}

class Userpage extends Component {
  state = {
    loading: false,
    currentTab: '',
    getTimeline: null,
    page: 1,
  }
  mutex = true

  componentWillMount() {
    if (isEmptyObject(this.props.account))
      this.props.getAccount()
        .catch((e) => { message.error(`계정의 정보를 불러오는데 실패했습니다: ${e.message}`) })

    if (this.props.members.length === 0)
      this.props.getMembers()
        .catch((e) => { message.error(`유저들의 정보를 불러오는데 실패했습니다: ${e.message}`) })

    this.setTimeline(this.props.location.pathname)
      .then(() => this.setState({ loading: true }))
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login')
      return false
    }
    return true
  }

  setTimeline = (url) => {
    const match = matchPath(url, {
      path: "/members/:username/:type",
      exact: true,
      strict: false
    });

    if (match)
      switch (match.params.type)
      {
        case 'comments':
          return this.changeTimeline(this.props.getCommentedTimeline, match.params.username, url)
        case 'likes':
          return this.changeTimeline(this.props.getLikedTimeline, match.params.username, url)
      }
    else if (url !== '/members')
      return this.changeTimeline(this.props.getAccountTimeline, this.props.match.params.username, url)
    else
      this.setState({ loading: false })
  }

  changeTimeline = (getTimeline, username, currentTab) => (
    getTimeline({ username, page: 1 })
      .then(() => this.setState({
        getTimeline,
        currentTab,
        page: 1,
      }))
      .catch((e) => { message.error(`타임라인 정보를 불러오는데 실패했습니다: ${e.message}`) })
  )

  changeTab = (url) => {
    this.props.history.push(url)
    this.setTimeline(url)
  }

  nextPage = () => this.setState({ page: this.state.page + 1 })

  render() {
    const { loading, currentTab, getTimeline, page } = this.state
    const { account, members } = this.props
    const { username } = this.props.match.params
    const member = members.find((m) => m.username === username)

    return (
      <Loading loading={loading}>
        {member
          ? (
          <Card className="userpage-card card-no-border">
            <Row className="header-row">
              <ProfileImages
                profile={member.profile}
                footer={
                  <Tabs activeKey={currentTab} onChange={this.changeTab}>
                    <TabPane className="menu" tab="작성글" key={`/members/${username}`} />
                    <TabPane className="menu" tab="작성댓글" key={`/members/${username}/comments`} />
                    <TabPane className="menu" tab="좋아한 글" key={`/members/${username}/likes`} />
                    <TabPane className="menu last" tab="회원들" key="/members" />
                  </Tabs>
                }
              />
            </Row>
            <Row>
              <Col xs={0} lg={6}>
                <Affix offsetTop={52}>
                  <Row type="flex" gutter={[0, 8]}>
                    <Col span={24}>
                      <UserInfo account={member} />
                    </Col>
                    <Col span={24}>
                      <UserMenu canEdit={canEditProfile(member, account)} />
                    </Col>
                  </Row>
                </Affix>
              </Col>
              <Col xs={24} lg={0}>
                <Row type="flex" gutter={[0, 8]}>
                  <Col span={24}>
                    <Affix offsetTop={52}>
                      <UserMenu canEdit={canEditProfile(member, account)} />
                    </Affix>
                  </Col>
                  <Col span={24} style={{ marginBottom: '8px' }}>
                    <UserInfo account={member} />
                  </Col>
                </Row>
              </Col>
              <Col xs={24} lg={12}>
                <Timeline
                  getTimeline={getTimeline}
                  username={username}
                  page={page}
                  nextPage={this.nextPage}
                />
              </Col>
            </Row>
          </Card>
          )
          : <Page404 />
        }
      </Loading>
    )
  }
}

Userpage.propTypes = {
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  account: state.account,
  members: state.members,
})
const mapDispatchToProps = ({
  getAccount,
  getMembers,
  getAccountTimeline,
  getLikedTimeline,
  getCommentedTimeline,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Userpage))
