import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Feed from '../components/Feed'
import { getMembers, logout, getUser, getUserTimeline, getLikedTimeline, getCommentedTimeline, checkPassword } from '../actions'
import { Button, Icon, Menu, Modal, Form, Input } from 'antd'
import { isAlmostScrolled } from '../lib'

const TIMELINE_TYPE = {
  WRITTEN: 0,
  COMMENTED: 1,
  LIKED: 2,
}

class Userpage extends Component {
  constructor(props) {
    super(props)
    this.props.getMembers()
    this.props.getUser()

    this.state = {
      eVisible: false,
      visible: false,
      response: '',
      password: '',
      page: 1,
      doclen: 0,
      timelineType: TIMELINE_TYPE.WRITTEN,
    }
    this.mutex = true
    this.wrapper = (e) => this.loadMore(e)
  }

  static check(boolean) {
    if (boolean) {
      return <Icon type="check" />
    }
    return <Icon type="close" />
  }

  showModal() {
    this.setState({ visible: true })
  }

  hideModal() {
    this.setState({ visible: false })
  }

  showProfileModal(){
    this.setState({ eVisible: true })
  }

  async hideProfileModal(){
    await this.setState({ eVisible: false })
  }

  onLogout() {
    this.props.logout()
  }

  onWrittenClick(){
    this.setState({page: 1,doclen: 0,timelineType: TIMELINE_TYPE.WRITTEN,})
  }

  onCommentedClick(){
    this.setState({page: 1,doclen: 0,timelineType: TIMELINE_TYPE.COMMENTED,})
  }

  onLikedClick(){
    this.setState({page: 1,doclen: 0,timelineType: TIMELINE_TYPE.LIKED,})
  }

  componentWillMount() {
    this.getTimeline()(this.props.user.username)
    this.setState({ doclen: this.props.timeline.length })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.wrapper)
  }

  componentWillUnmount() {
    window.addEventListener('scroll', this.wrapper)
  }

  getTimeline(){
    switch(this.state.timelineType)
    {
      case TIMELINE_TYPE.WRITTEN:   return this.props.getUserTimeline
      case TIMELINE_TYPE.COMMENTED: return this.props.getCommentedTimeline
      case TIMELINE_TYPE.LIKED:     return this.props.getLikedTimeline
      default:                      return null
    }
  }

  loadMore(e) {
    const { page } = this.state
    const timelinelen = this.props.timeline.length
    e.preventDefault()
    if (this.mutex && isAlmostScrolled()
      && (this.state.doclen !== timelinelen)) {
      this.mutex = false
      this.getTimeline()(this.props.user.username, page + 1)
      this.setState({
        page: page + 1,
        doclen: timelinelen,
      }, () => { this.mutex = true })
    }
  }

  clickEditProfileBtn() {
    const args = {
      password: this.state.password,
    }

    if(checkPassword(args)) {
      this.props.history.push('/settings/account')
    }
    else {
      this.hideProfileModal()
      this.setState({ password: '' })
      Modal.warning({ title: '비밀번호가 틀립니다.', content: '비밀번호를 확인해주세요.' })
    }
  }

  render() {
    const { timeline, user , members } = this.props
    const { username } = this.props.match.params
    const { password } = this.state
    const member = members.length > 0 ? members.find((m) => m.username === username) : []
    return (
      <div className="userpage">
        <div className="header">
          <div className="background-image" style={{backgroundImage: 'url(/images/profile_banner_default.png)'}}>
            <div className="user-profile">
              <img className="profile-image-size" src="/images/profile_image_default.png" alt="Profile-img" />
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
            {member.id === user.id 
              &&(
              <Button className="menu-btn" type="dashed" onClick={() => this.showProfileModal()}>
                <Icon type="tool" />
                {' '}
                프로필 수정
              </Button>
            )}
            <Modal 
              title="프로필 수정"
              visible={this.state.eVisible}
              onOk={() => this.clickEditProfileBtn()}
              onCancel={() => this.hideProfileModal()}
            >
              <Form layout="inline">
                <Form.Item
                  rules={[
                    { required: true, message: '비밀번호를 입력해주세요!' },
                  ]}
                >
                  비밀번호 확인
                  <Input 
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                  />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
        <div className="under-board">
          <div className="my-inform-size">
            <div className="my-inform-board">
              <div className="my-inform-title">
                <Icon type="user" />
                {' '}
                유저 정보
              </div>
              <div className="my-inform-content">
                <div className="my-inform-key">                 
                  <p>기수</p>
                  <p>이름</p>
                  <p>학과</p>
                  <p>활동인구</p>
                  <p>정회원</p>                  
                </div>
                <div className="my-inform-value">                  
                  <p>{member.nTh}기</p>
                  <p>{member.fullname}</p>
                  <p>{member.major}</p>
                  <p>{Userpage.check(member.isActive)}</p>
                  <p>{Userpage.check(member.isRegular)}</p>   
                </div>
              </div>
            </div>
            <div style={{ position: "sticky", width: "100%", border:"solid 1px #d3d6db", top:"324px", marginTop :"12px"}}>
              <div style={{ fontSize: "12pt", backgroundColor: "#f6f7f9", padding: "12px", fontWeight: "bold", borderBottom: "solid 1px #d3d6db" }}>메뉴</div>
              <div>
                <Menu mode="inline">
                    <Menu.Item key="logout" onClick={() => this.showModal()}>
                      <Icon type="logout" />
                      <span>로그아웃</span>
                    </Menu.Item>
                    <Modal
                      title="로그아웃"
                      visible={this.state.visible}
                      onOk={() => this.onLogout()}
                      onCancel={() => this.hideModal()}
                    >
                      정말 로그아웃 하시겠습니까?
                    </Modal>
                </Menu>
              </div>
            </div>
          </div>
          <section style={{ padding: '0px 8px' }}>
            {timeline.map((feed) => (
              <Feed user={user} key={feed.id} content={feed}/>
              ))
            }
          </section>
        </div>
      </div>
    )
  }
}

Userpage.propTypes = {
  history: PropTypes.object.isRequired,
  getUserTimeline: PropTypes.func.isRequired,
  getLikedTimeline: PropTypes.func.isRequired,
  getCommentedTimeline: PropTypes.func.isRequired,
}

Userpage.defaultProps = {
  timeline: [],
}

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  members: state.members,
  user: state.user,
})
const mapDispatchToProps = ({
  getUserTimeline,
  getLikedTimeline,
  getCommentedTimeline,
  getMembers,
  getUser,
  logout,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Userpage))
