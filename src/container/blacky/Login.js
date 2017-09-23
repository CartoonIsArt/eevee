import React, { Component } from 'react'
import { Form, Icon, Input, Checkbox, Button } from 'antd'

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActivated: false,
      isLoginClicked: false,
    }
  }

  toLogin() {
    if (!this.state.isLoginClicked) this.setState({ isLoginClicked: true })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}> 당신의 욕망을 이곳에서 ♥ </p>
            </div>
          </div>
          <div /* 버튼 3개 */>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                    placeholder="Username"
                  />,
                      )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    type="password"
                    placeholder="Password"
                  />,
                      )}
              </FormItem>
              <FormItem>

                <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
                          Log in
                      </Button>
                      Or <a href="">register now!</a>
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
