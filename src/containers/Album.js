import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Modal } from 'antd'


class Album extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOn: false,
      focus: '',
    }
  }
  handleClick(idx) {
    this.setState({
      focus: this.props.content[idx],
      isModalOn: true,
    })
  }
  closeModal() {
    this.setState({ isModalOn: false })
  }
  render() {
    const style = { height: this.props.height }
    const content = this.props.content
    const nContent = content.length
    const isModalOn = this.state.isModalOn
    const focus = this.state.focus
    const modal = (<Modal
      visible={isModalOn}
      onOk={() => this.closeModal()}
      onCancel={() => this.closeModal()}
      footer={[]}
    >
      <img
        src={focus.src}
        alt={focus.alt}
        style={{
          maxWidth: '100%',
        }}
      />
    </Modal>)

    switch (nContent) {
      case 1:
        return (
          <div style={style}>
            <img
              src={content[0].src}
              alt={content[0].alt}
            />
            {modal}
          </div>
        )
      case 2:
        return (
          <div style={style}>
            <div style={{ display: 'flex', height: '100%' }}>
              { content.map((c, idx) =>
                (<div
                  onClick={() => this.handleClick(idx)}
                  role="button"
                  tabIndex={-1}
                  key={c.id}
                  style={{ boxSizing: 'border-box', border: '2px solid white', position: 'relative', width: '50%', height: '100%', overflow: 'hidden', padding: '4px' }}
                >
                  <img
                    src={c.src}
                    alt={c.alt}
                    style={{
                      position: 'absolute',
                      height: '100%',
                      left: '50%',
                      right: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>),
              )}
            </div>
            {modal}
          </div>
        )
      case 3:
        return (
          <div style={style}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div
                onClick={() => this.handleClick(0)}
                tabIndex={-1}
                role="button"
                style={{ boxSizing: 'border-box', border: '2px solid white', position: 'relative', width: '62%', height: '100%', overflow: 'hidden', padding: '4px' }}
              >
                <img
                  src="http://lorempixel.com/1000/400"
                  alt={content[0].alt}
                  style={{
                    position: 'absolute',
                    top: '-100%',
                    left: '-100%',
                    right: '-100%',
                    bottom: '-100%',
                    margin: 'auto',
                  }}
                />
              </div>
              <div style={{ width: '38%' }}>
                { content.slice(1).map((c, idx) =>
                  (<div
                    onClick={() => this.handleClick(idx + 1)}
                    tabIndex={-1}
                    role="button"
                    key={c.id}
                    style={{ position: 'relative', padding: '4px', boxSizing: 'border-box', border: '2px solid white', height: '50%', overflow: 'hidden' }}
                  >
                    <img
                      src="http://lorempixel.com/400/1000"
                      alt={c.alt}
                      style={{
                        position: 'absolute',
                        top: '-100%',
                        left: '-100%',
                        right: '-100%',
                        bottom: '-100%',
                        margin: 'auto',
                      }}
                    />
                  </div>),
              )}
              </div>
            </div>
            {modal}
          </div>
        )
      case 4:
        return (
          <div style={style}>
            <img
              src={content[0].src}
              alt={content[0].alt}
            />
            {modal}
          </div>
        )
      default:
        return (
          <div />
        )

    }
  }
}

Album.propTypes = {
  content: PropTypes.object.isRequired,
  height: PropTypes.string.isRequired,
}

export default Album
