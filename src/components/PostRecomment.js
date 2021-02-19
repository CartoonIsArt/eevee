import React, { Component } from 'react'
import { connect } from 'react-redux'
import koKR from 'antd/lib/locale-provider/ko_KR'
import { postComment } from '../actions'

const Input = require('antd/lib/input')
const Button = require('antd/lib/button')
const LocaleProvider = require('antd/lib/locale-provider')

class PostRecomment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    };
  }

  onButtonClicked() {
    this.props.postComment({
      commentId: this.props.commentId,
      text: this.state.text,
    })
    this.setState({ text: '' })
  }

  onChangeInput(e) {
    this.setState(e);
  }

  render() {
    const { user } = this.props
    const { text } = this.state
    return (
      <LocaleProvider locale={koKR}>
        <div style={{ display: 'flex' }}>
          <div style={{
            marginRight: '4px', width: '32px', height: '32px', background: '#FFF',
          }}
          >
            <img src={user.profileImage.src} alt={user.profileImage.alt} width="100%" />
          </div>
          <div style={{
            width: '94%',
            display: 'flex',
          }}
          >
            <div style={{ width: '94%', marginRight: '4px' }}>
              <Input
                type="textarea"
                autosize={{ minRows: 1 }}
                onChange={(e) => this.onChangeInput({ text: e.target.value })}
                placeholder="Write Recomment"
                value={text}
              />
            </div>
            <div>
              <Button icon="enter" shape="circle" onClick={() => this.onButtonClicked()} />
            </div>
          </div>
        </div>
      </LocaleProvider>
    )
  }
}

const mapStateToProps = () => ({
})
const mapDispatchToProps = ({
  postComment,
})
export default connect(mapStateToProps, mapDispatchToProps)(PostRecomment)
