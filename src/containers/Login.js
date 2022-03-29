import { Button, Card, Col, Form, Icon, Input, message, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAccount, login } from '../actions'


const FormItem = Form.Item

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      username: '',
      password: '',
      responses: [],
    }
  }

  componentDidUpdate() {
    if (this.props.auth) this.props.history.push('/')
  }

  submit(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    const formData = {
      username: this.state.username,
      password: this.state.password,
    }
    this.props.login(formData)
      .catch((e) => { message.error(`로그인에 실패했습니다: ${e.response ? e.response.data : e.message}`) })
  }

  render() {
    const { username, password } = this.state
    return (
      <Card
        id="login-card"
        style={{ backgroundImage: "url(/images/login_background.jpg)" }}  // css에 두면 파일 서버에서 안찾음
        title={
          <Card>
            <Row id="login-card-title">
              <span>CIA 광운대학교 중앙 만화 동아리</span>
            </Row>
          </Card>
        }
      >
        <Row id="login-card-body" type="flex" align="middle" justify="center">
          <Col>
            <Card id="login-inner-card">
              <Row type="flex" align="middle" justify="center">
                <Col span={24}>
                  <img style={{ width: '240px' }} alt="CIA 로고" src="/images/logo.png" />
                </Col>
                <Col span={24}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
                    당신의 욕망을 이곳에서 ♥
                  </span>
                </Col>
              </Row>
              <Row>
                <Form className="login-form" onSubmit={(e) => this.submit(e)}>
                  <FormItem rules={[{ required: true, message: '아이디를 입력해주세요!' }]}>
                    <Input
                      prefix={<Icon type="user" />}
                      placeholder="Username"
                      value={username}
                      onChange={(e) => this.setState({ username: e.target.value })}
                    />
                  </FormItem>
                  <FormItem rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}>
                    <Input
                      prefix={<Icon type="lock" />}
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => this.setState({ password: e.target.value })}
                    />
                  </FormItem>
                  <FormItem>
                    <Button
                      className="login-form-button"
                      type="primary"
                      htmlType="submit"
                    >
                      로그인
                    </Button>
                    아니면
                    <Link to="/registration">
                      <b> 지금 회원가입 하세요!</b>
                    </Link>
                  </FormItem>
                </Form>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.bool.isRequired,
  getAccount: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})
const mapDispatchToProps = ({
  login,
  getAccount,
})

const WrappedNormalLoginForm = Form.create()(Login)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm))
