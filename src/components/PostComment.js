import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, LocaleProvider, Modal } from 'antd'
import PropTypes from 'prop-types'
import koKR from 'antd/lib/locale-provider/ko_KR'
import { request } from '../fetches/request'
import { getTimeline, getUser } from '../actions'

const args = [];

class PostComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    };
  }
  onButtonClicked() {
    args.push({ type: 'Number', key: 'documentId', value: this.props.feedId })
    args.push({ type: 'String', key: 'text', value: this.state.text })

    request('POST', 'comments', args)
      .then(() => {
        this.props.getUser()
        this.props.getTimeline()
        this.setState({ text: '' })
      })
      .catch((e) => {
        console.log(e)
        Modal.warning({ title: '오류', content: '댓글을 작성하지 못 했습니다.' })
      })
  }
  onChangeInput(e) {
    this.setState(e);
  }
  render() {
    const user = this.props.user
    const text = this.state.text
    return (
      <LocaleProvider locale={koKR}>
        <div style={{ display: 'flex' }} >
          <div style={{ marginRight: '4px', width: '32px', height: '32px', background: '#FFF' }} >
            <img src={user.profileImage.savedPath} alt={user.profileImage.filename} width="100%" />
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
                onChange={e => this.onChangeInput({ text: e.target.value })}
                placeholder="Write Comment"
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

PostComment.propTypes = {
  getTimeline: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})
const mapDispatchToProps = ({
  getTimeline,
  getUser,
})
export default connect(mapStateToProps, mapDispatchToProps)(PostComment)
