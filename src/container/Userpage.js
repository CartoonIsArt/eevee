import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Feed from '../components/Feed'
import { getMembers, logout, getUser, getTimeline } from '../actions'
import { Button, Icon, Menu, Modal, Form, Input } from 'antd'
import { isAlmostScrolled } from '../lib'

class Userpage extends Component {
  constructor(props) {
    super(props)
    this.props.getMembers()
    this.props.getUser()
    this.state = {
      editVisible: false,
      visible: false,
      response: '',
      password: '',
      page: 1,
      doclen: 0,
      showType: 0,
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
    this.setState({ visible: true, });
  }

  hideModal() {
    this.setState({ visible: false, });
  }

  showProfileModal(){
    this.setState({ editVisible: true, });
  }

  hideProfileModal(){
    console.log("Why? why?")
    this.setState({ editVisible: false, });
  }

  onLogout() {
    this.props.logout();
  }

  componentWillMount() {
    this.props.getTimeline()
    this.setState({ doclen: this.props.timeline.length })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.wrapper)
  }

  componentWillUnmount() {
    window.addEventListener('scroll', this.wrapper)
  }

  loadMore(e) {
    const { page } = this.state
    const timelinelen = this.props.timeline.length
    e.preventDefault()
    console.log(isAlmostScrolled())
    if (this.mutex && isAlmostScrolled()
      && (this.state.doclen !== timelinelen)) {
      this.mutex = false
      this.props.getTimeline(page + 1)
      this.setState({
        page: page + 1,
        doclen: timelinelen,
      }, () => { this.mutex = true })
    }
  }

  clickEditProfileBtn()
  {
    const args = {
      password: this.state.password,
    }
    axios.post('/public/login', args) // how
      .then((r) => {
        this.props.history.push('/settings/account')
      })
      .catch((e) => {
        console.log(e)
        this.hideProfileModal()
        Modal.warning({ title: '비밀번호가 틀립니다.', content: '비밀번호를 확인해주세요.' })
      })
  }

  showMine(feed)
  {
    const { user } = this.props
    switch(this.state.showType)
    {
      case 0 :
        if (feed.author.id === user.id)
          return (<Feed user={user} key={feed.id} content={feed}/>)
        break;

      case 1 :
        feed.comments.map((comment)=>{
          console.log(comment)
          if(comment.author.id === user.id) 
          {
            console.log("why so serious")
            console.log(user)
            console.log(feed.id)
            console.log(feed)
            return (<Feed user={user} key={feed.id} content={feed}/>)
          }
        })
        break;

      case 2:
        feed.likedUsers.map((liker)=>{
          if(liker.id === user.id) 
            return (<Feed user={user} key={feed.id} content={feed}/>)
        })
        break;
    }
  }

  render() {
    const { timeline } = this.props
    const { user } = this.props
    const { members } = this.props
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
              <Link to={`/members/${username}`} onClick={() => this.setState({page: 1,doclen: 0,showType: 0,})}>작성한 글</Link>
            </div>
            <div className="menu">
              <Link to={`/members/${username}/comments`} onClick={() => this.setState({page: 1,doclen: 0,showType: 1,})}>작성한 댓글</Link>
            </div>
            <div className="menu">
              <Link to={`/members/${username}/likes`} onClick={() => this.setState({page: 1,doclen: 0,showType: 2,})}>좋아요한 글</Link>
            </div>
            <div className="menu last" onClick={() => this.props.history.push('/members')}>회원들</div>
            <div className="blank" />
            {member.id === user.id 
              &&(
              <Button className="menu-btn" type="dashed" onClick={() => this.showProfileModal()}>
                <Icon type="tool" />
                {' '}
                프로필 수정
                <Modal 
                  title="프로필 수정"
                  visible={this.state.editVisible}
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
              </Button>
            )}
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
                  <p>학번</p>
                  <p>학과</p>
                  <p>활동인구</p>
                  <p>정회원</p>                  
                </div>
                <div className="my-inform-value">                  
                  <p>{member.nTh}기</p>
                  <p>{member.fullname}</p>
                  <p>{member.studentNumber}</p>
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
              this.showMine(feed)
              // (feed.author.id === user.id)
              // ?(<Feed
              //   user={user}
              //   key={feed.id}
              //   content={feed}
              // />)
              // :("")
              ))
            }
            {console.log(timeline)}
            {console.log(user)}
          </section>
          {/* <div className="my-write-size">
            <div className="my-write-title">
              <Icon type="edit" />
              {' '}
              작성한 글
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '12px' }}>
              <div style={{ display: 'block' }}>
                <div style={{ display: 'flex', marginBottom: '8px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    position: 'relative',
                    marginRight: '8px',
                    overflow: 'hidden',
                  }}
                  >
                    {member.profileImage 
                      ?(<img src={member.profileImage.savedPath} alt={member.profileImage.filename} style={{ maxWidth: '100%', height: 'auto' }} />)
                      :(<img src="/images/profile_image_default.png" alt="Default-Profile-img" style={{ maxWidth: '100%', height: 'auto' }}/>)
                    }
                  </div>
                  <div>
                    <p style={{ fontSize: '16pt' }}>19기 심심한 바보</p>
                    <p>2017년 10월 4일 오후 11시 22분</p>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '12pt' }}>
                추석 연휴 아니었음 진짜 손도 안댔다...
                <div style={{ display: 'block' }}>
                  <img src="https://i.imgur.com/OwKtSaK.jpg" style={{ maxWidth: '100%', height: 'auto' }} alt="HK 416" />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

Userpage.propTypes = {
  history: PropTypes.object.isRequired,
  getTimeline: PropTypes.func.isRequired,
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
  getTimeline,
  getMembers,
  getUser,
  logout,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Userpage))
