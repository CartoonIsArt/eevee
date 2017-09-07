import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { connect } from 'react-redux'
import { getUser } from '../../actions'

class Doorlock extends Component {
  constructor(props) {
      super(props)
      this.state = {
          mode: 'warning',
      }
  }
  componentWillMount() {
      this.props.getUser()
  }
  verify() {
      if (this.props.user.user.isRegularMember) {
          this.setState({ mode: 'Regular' })
      }
      else {
          this.setState({ mode: 'Ilregular' })
      }
  }
  render() {
    if (this.state.mode === 'warning') {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '1040px',
          textAlign: 'center',
          margin: '0px 8px',
          padding: '0px 20px',
          backgroundColor: 'white',
        }}
        >
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            paddingBottom: '10px',
            margin: '20px 0px 10px 0px',
            borderBottom: '1px solid black',
          }}
          >
                    동방 비밀번호
                </div>
          <div style={{ color: 'red', fontSize: '20px', fontWeight: 'bold', padding: '10px', margin: '10px 0px' }}>
            <Icon type="exclamation-circle-o" /> 동방 비밀번호를 동아리회원 이외의 사람이나 준회원에게 알려주면 안됩니다!
                </div>
          <div style={{ margin: '10px 0px' }}>
            <Button
              onClick={() => this.verify().mode}
              size="large"
              style={{ fontSize: '14pt', fontWeight: 'bold', backgroundColor: '#1976D2', color: 'white' }}
            >
              <Icon type="double-right" /> 보러가기
                    </Button>
          </div>
        </div>
      )
    }
    else if (this.state.mode === 'Regular') {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '1040px',
          textAlign: 'center',
          margin: '0px 8px',
          padding: '0px 20px',
          backgroundColor: 'white',
        }}
        >
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            paddingBottom: '10px',
            margin: '20px 0px 10px 0px',
            borderBottom: '1px solid black',
          }}
          >
                    동방 비밀번호
                </div>
          <div style={{ fontSize: '50px', fontWeight: 'bold', padding: '20px' }}>
                    [동방 비번]
                </div>
        </div>
      )
    }

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '1040px',
        textAlign: 'center',
        margin: '0px 8px',
        padding: '0px 20px',
        backgroundColor: 'white',
      }}
      >
        <div style={{
          fontSize: '32px',
          fontWeight: 'bold',
          paddingBottom: '10px',
          margin: '20px 0px 10px 0px',
          borderBottom: '1px solid black',
        }}
        >
                    동방 비밀번호
                </div>
        <div style={{ fontSize: '50px', fontWeight: 'bold', padding: '20px' }}>
          <img scr="https://cia.kw.ac.kr/static/neogulman.png" alt="동방 비밀번호" />
        </div>
        <div>
                    정회원이 된후에 오라구!!
                </div>
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
