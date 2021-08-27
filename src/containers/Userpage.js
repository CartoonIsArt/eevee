import { Affix, Card, Col, Row, Tabs } from 'antd'
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
import Feed from '../components/Feed'
import ProfileImages from '../components/ProfileImages'
import UserInfo from '../components/UserInfo'
import UserMenu from '../components/UserMenu'
import { isAlmostScrolled } from '../lib'


const { TabPane } = Tabs

function canEditProfile(member, account) {
  return (member.id === account.id)
}

class Userpage extends Component {
  constructor(props) {
    super(props)
    this.props.getMembers()
    this.props.getAccount()

    this.state = {
      page: 1,
      doclen: 0,
      currentTab: '',
      getTimeline: null,
    }
    this.setTimeline(this.props.location.pathname, () => {})
    this.mutex = true
  }

  componentDidMount() {
    window.addEventListener('scroll', (e) => this.loadMore(e))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', (e) => this.loadMore(e))
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login')
      return false
    }
    return true
  }

  setTimeline = (url, next = this.props.history.push) => {
    const match = matchPath(url, {
      path: "/members/:username/:type",
      exact: true,
      strict: false
    });

    if (match)
      switch (match.params.type)
      {
        case 'comments':
          this.changeTimeline(this.props.getCommentedTimeline, match.params.username, url)
          break
        case 'likes':
          this.changeTimeline(this.props.getLikedTimeline, match.params.username, url)
          break
      }
    else if (url !== '/members')
      this.changeTimeline(this.props.getAccountTimeline, this.props.match.params.username, url)

    next(url)
  }

  changeTimeline = (getTimeline, username, currentTab) => {
    getTimeline(username, 1)
      .then(() => this.setState({
        page: 1,
        doclen: this.props.timeline.length,
        currentTab,
        getTimeline,
      }))
  }

  loadMore = (e) => {
    const { page } = this.state
    const { username } = this.props.match.params
    const timelinelen = this.props.timeline.length

    e.preventDefault()
    if (this.mutex && isAlmostScrolled() && (this.state.doclen !== timelinelen)) {
      this.mutex = false
      this.state.getTimeline(username, page + 1)
      this.setState({
        page: page + 1,
        doclen: timelinelen,
      }, () => { this.mutex = true })
    }
  }

  render() {
    const { timeline, account, members } = this.props
    const { username } = this.props.match.params
    const member = (members.length > 0)
      ? members.find((m) => m.username === username)
      : {
        id: null,
        isActive: null,
        role: null,
        student: {
          nTh: null,
          name: null,
          major: null,
        },
        profile: {
          profileBannerImage: null,
          profileImage: null,
        }
      } // 임시 방편

    return (
      <Card id="userpage-card">
        <Row className="header-row">
          <ProfileImages
            profile={member.profile}
            footer={
              <Tabs activeKey={this.state.currentTab} onChange={this.setTimeline}>
                <TabPane className="menu" tab="작성글" key={`/members/${username}`} />
                <TabPane className="menu" tab="작성댓글" key={`/members/${username}/comments`} />
                <TabPane className="menu" tab="좋아한 글" key={`/members/${username}/likes`} />
                <TabPane className="menu last" tab="회원들" key="/members" />
              </Tabs>
            }
          />
        </Row>
        <Row>
          <Col xs={24} lg={6}>
            <Affix offsetTop={52}>
              <Row gutter={[0, 8]}>
                <Col span={24}>
                  <UserInfo account={member} />
                </Col>
                <Col span={24}>
                  <UserMenu canEdit={canEditProfile(member, account)} />
                </Col>
              </Row>
            </Affix>
          </Col>
          <Col xs={24} lg={12}>
            <section style={{ padding: '0px 8px', width: '100%' }}>
              {timeline.map((feed) => <Feed account={account} key={feed.id} feed={feed}/>)}
            </section>
          </Col>
        </Row>
      </Card>
    )
  }
}

Userpage.propTypes = {
  auth: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  getAccountTimeline: PropTypes.func.isRequired,
  getLikedTimeline: PropTypes.func.isRequired,
  getCommentedTimeline: PropTypes.func.isRequired,
}

Userpage.defaultProps = {
  timeline: [],
}

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  members: state.members,
  account: state.account,
  auth: state.auth,
})
const mapDispatchToProps = ({
  getAccountTimeline,
  getLikedTimeline,
  getCommentedTimeline,
  getMembers,
  getAccount,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Userpage))
