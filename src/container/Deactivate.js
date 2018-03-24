import React, { Component } from 'react'
import { Modal, Button, Icon } from 'antd'

class Deactivate extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
  }
  showModal() {
    this.setState({
      visible: true,
      modalLevel: 0,
    });
  }
  handleOk() {
    if (this.state.modalLevel === 1) {
      this.setState({ visible: false })
    }
    this.setState({
      modalLevel: this.state.modalLevel + 1,
    });
  }
  handleCancel() {
    this.setState({
      visible: false,
      modalLevel: 0,
    });
  }
  render() {
    return (
      <div style={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        width: '100%',
        marginLeft: '20px',
        textAlign: 'center',
        backgroundColor: 'white',
      }}
      >
        <div style={{
          fontSize: '120pt',
          backgroundColor: 'red',
          color: 'white',
          margin: '12px',
        }}
        >
          <Icon type="exclamation-circle-o" /> 주의 <Icon type="exclamation-circle-o" />
        </div>
        <div style={{
          fontSize: '32pt',
        }}
        >
          이 버튼을 잘못 누르면 <br />모두가 개고생을 하게됩니다.<br />신중히 생각하세요@
        </div>
        <div style={{ margin: '60px' }}>
          <Button
            type="danger"
            onClick={() => this.showModal()}
            size="large"
            icon="double-right"
            style={{
              fontSize: '12pt',
            }}
          >초기화하기</Button>
          { this.state.modalLevel === 0 ?
            <Modal
              closable={false}
              title="활동인구 초기화"
              visible={this.state.visible}
              footer={[
                <Button key="뒤로" size="large" onClick={() => this.handleCancel()}>뒤로</Button>,
                <Button key="초기화" type="danger" size="large" onClick={() => this.handleOk()}>
                    초기화
                </Button>,
              ]}
            >
              정말정말 초기화 하시겠습니까?
            </Modal>
            : <Modal
              closable={false}
              title="진짜 활동인구 초기화"
              visible={this.state.visible}
              footer={[
                <Button key="뒤로" size="large" onClick={() => this.handleCancel()}>뒤로</Button>,
                <Button key="정말루 초기화" type="danger" size="large" onClick={() => this.handleOk()}>
                        정말루 초기화
                </Button>,
              ]}
            >
                  정말정말 초기화 하시겠습니까?
            </Modal>
            }

        </div>
      </div>
    )
  }
}

export default Deactivate
