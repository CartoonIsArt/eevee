import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Modal } from 'antd'
import { request } from '../fetches/request'

const FormItem = Form.Item;
const args = [];

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActivated: false,
      isLoginClicked: false,
      id: '',
      password: '',
      responses: [],
    }
  }

  onClickMethod(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    args.push({ type: 'String', key: 'username', value: this.state.id })
    args.push({ type: 'String', key: 'password', value: this.state.password })
    request('POST', 'login', args)
    .then((r) => {
      console.log(r);
      location.href = '/'
    })
    .catch((e) => {
      console.log(e)
      Modal.warning({ title: '로그인에 실패했습니다.', content: '입력한 아이디와 비밀번호를 확인해주세요.' })
    })
  }

  toLogin() {
    if (!this.state.isLoginClicked) {
      this.setState({ isLoginClicked: true })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const id = this.state.id
    const password = this.state.password
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '660px',
          width: '100%',
          fontSize: '20px',
          margin: '0px 8px',
          textAlign: 'left',
          backgroundImage: "url('https://68.media.tumblr.com/c8b2b39b88e638dd419e6ca50a857131/tumblr_nnx1uqMP9v1r2pvg2o1_500.gif')",
          backgroundSize: '100% 100%',
          overflow: 'hidden',
        }}
        align="middle"
      >
        <div
         // 상단 바
          style={{
            height: '232px',
          }}
        >
          <div style={{
            height: '80px',
            padding: '10px',
            fontSize: '40px',
            fontWeight: 'bold',
            textAlign: 'left',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
          >
            CIA 광운대학교 중앙 만화 동아리
          </div>
        </div>
        <div
            // 로그인 사각형
          style={{
            textAlign: 'center',
            justifyContent: 'space-between',
            margin: '0 auto',
            padding: '12px',
            border: '2px solid black',
            borderRadius: '10px',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
        >
          <div>
            <div style={{ textAlign: 'left' }}>
              <img
                src="https://cia.kw.ac.kr/media/logo.png"
                alt="CIA 로고"
                style={{ width: '240px', overflow: 'hidden' }}
              />
              <img
                src=""
                alt="2.0"
                style={{ width: '80px', overflow: 'hidden' }}
              />
            </div>
            <div>
              <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}> 당신의 욕망을 이곳에서 ♥ </p>
            </div>
          </div>
          <div>
            <Form onSubmit={e => this.onClickMethod(e)} className="login-form">
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '아이디를 입력해주세요!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ fontSize: 12 }} />}
                    placeholder="Username"
                    value={id}
                    onChange={e => this.setState({ id: e.target.value })}
                  />,
                      )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '비밀번호를 입력해주세요!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 12 }} />}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />,
                      )}
              </FormItem>
              <FormItem>

                <Button
                  style={{ width: '100%' }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                    로그인
                </Button>
                  아니면 <Link to="/registration"> 지금 회원가입 하세요! </Link>
              </FormItem>
            </Form>
          </div>
        </div>
        <div style={{ height: '144px', marginLeft: '12px' }}>
          <div style={{ fontSize: '12px', marginTop: '80px', color: 'white' }}> 으으 오타쿠 극혐 </div>
          <a href="https://www.battle.net/download/getInstallerForGame?gameProgram=HEROES_OF_THE_STORM">
            <Button type="danger" size="large" icon="rollback"> 도망가기 </Button>
          </a>
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm
