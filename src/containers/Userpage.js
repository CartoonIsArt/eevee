import { Affix, Button, Card, Col, Descriptions, Icon, Popconfirm, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {
  getAccount,
  getAccountTimeline,
  getCommentedTimeline,
  getLikedTimeline,
  getMembers,
  logout,
} from '../actions'
import Feed from '../components/Feed'
import { isAlmostScrolled, isRegularMember } from '../lib'


const TIMELINE_TYPE = {
  WRITTEN: 0,
  COMMENTED: 1,
  LIKED: 2,
}

function canEditProfile(member, account) {
  return (member.id === account.id)
}

function check(boolean) {
  if (boolean) return <Icon type="check" style={{ color: 'green' }} />
  return <Icon type="close" style={{ color: 'red' }} />
}

class Userpage extends Component {
  constructor(props) {
    super(props)
    this.props.getMembers()
    this.props.getAccount()

    this.state = {
      page: 1,
      doclen: 0,
      timelineType: TIMELINE_TYPE.WRITTEN,
    }
    this.mutex = true
    this.wrapper = (e) => this.loadMore(e)
  }

  componentWillMount() {
    const { username } = this.props.match.params
    this.getTimeline()(username, 1)
    this.setState({ doclen: this.props.timeline.length })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.wrapper)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.wrapper)
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login')
      return false
    }
    return true
  }

  onLogout = () => {
    this.props.logout()
  }

  onWrittenClick = async () => {
    await this.setState({page: 1,doclen: 0,timelineType: TIMELINE_TYPE.WRITTEN,})
    const { username } = this.props.match.params
    this.getTimeline()(username, 1)
  }

  onCommentedClick = async () => {
    await this.setState({page: 1,doclen: 0,timelineType: TIMELINE_TYPE.COMMENTED,})
    const { username } = this.props.match.params
    this.getTimeline()(username, 1)
  }

  onLikedClick = async () => {
    await this.setState({page: 1,doclen: 0,timelineType: TIMELINE_TYPE.LIKED,})
    const { username } = this.props.match.params
    this.getTimeline()(username, 1)
  }

  getTimeline = () => {
    switch(this.state.timelineType)
    {
      case TIMELINE_TYPE.WRITTEN:   return this.props.getAccountTimeline
      case TIMELINE_TYPE.COMMENTED: return this.props.getCommentedTimeline
      case TIMELINE_TYPE.LIKED:     return this.props.getLikedTimeline
      default:                      return null
    }
  }

  loadMore = (e) => {
    const { page } = this.state
    const { username } = this.props.match.params
    const timelinelen = this.props.timeline.length
    e.preventDefault()
    if (this.mutex && isAlmostScrolled()
      && (this.state.doclen !== timelinelen)) {
      this.mutex = false
      this.getTimeline()(username, page + 1)
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
          <Card className="header">
            <div
              className="background-image"
              style={{backgroundImage: `url(${member.profile.profileBannerImage})`}}
            >
              <div className="profile-image-wrapper">
                <img className="profile-image" src={member.profile.profileImage} alt="프로필 이미지" />
              </div>
            </div>
            <div className="menu-bar">
              <div className="menu">
                <Link to={`/members/${username}`} onClick={() => this.onWrittenClick()}>작성한 글</Link>
              </div>
              <div className="menu">
                <Link to={`/members/${username}/comments`} onClick={() => this.onCommentedClick()}>작성한 댓글</Link>
              </div>
              <div className="menu">
                <Link to={`/members/${username}/likes`} onClick={() => this.onLikedClick()}>좋아요한 글</Link>
              </div>
              <div className="menu last" onClick={() => this.props.history.push('/members')}>회원들</div>
              <div className="blank" />
              {canEditProfile(member, account) && (
                <Link to="/settings/account">
                  <Button className="menu-btn" icon="tool" type="dashed">
                    <span>프로필 수정</span>
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </Row>
        <Row>
          <Col span={6}>                
            <Affix offsetTop={52}>
              <Row gutter={[0, 8]}>
                <Col span={24}>
                  <Card title="유저 정보" size="small">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="기수">{member.student.nTh}기</Descriptions.Item>
                      <Descriptions.Item label="이름">{member.student.name}</Descriptions.Item>
                      <Descriptions.Item label="학과">{member.student.major}</Descriptions.Item>
                      <Descriptions.Item label="활동인구">{check(member.isActive)}</Descriptions.Item>
                      <Descriptions.Item label="정회원">{check(isRegularMember(member))}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card title="메뉴" size="small">
                    <Popconfirm
                      title="정말 로그아웃 하시겠습니까?"
                      onConfirm={this.onLogout}
                      okText="로그아웃"
                      cancelText="취소"
                    >
                      <Button icon="logout">로그아웃</Button>
                    </Popconfirm>
                  </Card>
                </Col>
              </Row>
              </Affix>
            </Col>
            <Col span={12}>
              <section style={{ padding: '0px 8px', width: '100%' }}>
                {timeline.map((feed) => (
                  <Feed account={account} key={feed.id} feed={feed}/>
                  ))
                }
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
  logout: PropTypes.func.isRequired,
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
  logout,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Userpage))
