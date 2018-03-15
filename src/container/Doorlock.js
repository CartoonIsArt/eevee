import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { connect } from 'react-redux'
import { getUser } from '../actions'
import { neogulman } from '../policy'

class Doorlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'warning',
    }
  }
  verify() {
    if (this.props.user.user.isRegularMember) {
      this.setState({ mode: 'Regular' })
    } else {
      this.setState({ mode: 'Ilregular' })
    }
  }
  render() {
    if (this.state.mode === 'warning') {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1',
          width: '100%',
          margin: '0px 8px',
          textAlign: 'center',
          backgroundColor: 'white',
        }}
        >
          <h1 style={{
            fontSize: '32pt',
            borderBottom: '1px solid black',
            padding: '20px',
            marginBottom: '12px',
          }}
          >동방 비밀번호</h1>
          <div style={{
            fontSize: '24px',
            color: 'red',
            margin: '12px 0px',
            padding: '12px',
          }}
          >
            <Icon type="exclamation-circle" /> 동방 비밀번호를 동아리 회원 이외의 사람이나 준회원에게 알려주면 안됩니다!
          </div>
          <div>
            <Button
              style={{
                backgroundColor: '#1976D2',
                fontSize: '12pt',
                color: 'white',
                margin: '12px 0px' }}
              onClick={() => this.verify()}
            >
              <Icon type="double-right" /> 보러가기
            </Button>
          </div>
        </div>
      )
    } else if (this.state.mode === 'Regular') {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'colunm',
          width: '100%',
          marginLeft: '20px',
          textAlign: 'center',
          backgroundColor: 'white',
        }}
        >
          <h1 style={{
            fontSize: '32pt',
            borderBottom: '1px solid black',
            padding: '20px',
            marginBottom: '12pt',
          }}
          >동방 비밀번호</h1>
          <h1 style={{
            margin: '12px 0px',
            fontSize: '24pt',
          }}
          >[동방 비번]</h1>
        </div>
      )
    }

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'colunm',
        width: '100%',
        marginLeft: '20px',
        textAlign: 'center',
        backgroundColor: 'white',
      }}
      >
        <h1 style={{
          fontSize: '32pt',
          borderBottom: '1px solid black',
          padding: '20px',
          marginBottom: '12px',
        }}
        >동방 비밀번호</h1>
        <div style={{ margin: '12px 0px' }}>
          <img
            src={neogulman}
            alt="너굴맨"
          />
        </div>
        <h1
          style={{
            margin: '12px',
          }}
        >
          &ldquo;정회원 심사부터 통과하고 오라구!!&rdquo;
        </h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
const mapDispatchToProps = ({
  getUser,
})
export default connect(mapStateToProps, mapDispatchToProps)(Doorlock)
