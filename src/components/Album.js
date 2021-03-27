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
    const style = { height: this.props.height, overflow: 'hidden' }
    const { content } = this.props
    const nContent = content.length
    const { isModalOn } = this.state
    const { focus } = this.state
    const modal = (
      <Modal
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
            overflow: 'hidden',
          }}
        />
      </Modal>
    )

    switch (nContent) {
      case 1:
        return (
          <div style={style}>
            <img
              style={{ width: '100%' }}
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
              { content.map((c, idx) => (
                <div
                  onClick={() => this.handleClick(idx)}
                  role="button"
                  tabIndex={-1}
                  key={c.id}
                  style={{
                    boxSizing: 'border-box', position: 'relative', border: '2px solid white', width: '50%', height: '100%', overflow: 'hidden',
                  }}
                >
                  <img
                    src={c.src}
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
                </div>
              ))}
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
                style={{
                  boxSizing: 'border-box', border: '2px solid white', position: 'relative', width: '62%', height: '100%', overflow: 'hidden',
                }}
              >
                <img
                  src={content[0].src}
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
                { content.slice(1).map((c, idx) => (
                  <div
                    onClick={() => this.handleClick(idx + 1)}
                    tabIndex={-1}
                    role="button"
                    key={c.id}
                    style={{
                      position: 'relative', boxSizing: 'border-box', border: '2px solid white', height: '50%', overflow: 'hidden',
                    }}
                  >
                    <img
                      src={c.src}
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
                  </div>
                ))}
              </div>
            </div>
            {modal}
          </div>
        )
      case 4:
        return (
          <div style={style}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div
                onClick={() => this.handleClick(0)}
                tabIndex={-1}
                role="button"
                style={{
                  boxSizing: 'border-box', border: '2px solid white', position: 'relative', width: '62%', height: '100%', overflow: 'hidden',
                }}
              >
                <img
                  src={content[0].src}
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
                <div style={{ height: '62%', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={content[1].src}
                    alt={content[1].alt}
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
                <div style={{ height: '38%', display: 'flex', overflow: 'hidden' }}>
                  { content.slice(2).map((c, idx) => (
                    <div
                      onClick={() => this.handleClick(idx + 2)}
                      tabIndex={-1}
                      role="button"
                      key={c.id}
                      style={{
                        position: 'relative', boxSizing: 'border-box', border: '2px solid white', width: '50%', overflow: 'hidden',
                      }}
                    >
                      <img
                        src={c.src}
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
  content: PropTypes.array.isRequired,
  height: PropTypes.string.isRequired,
}

export default Album
