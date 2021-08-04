import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Namecard from './Namecard'
import { Popover } from 'antd'

class Recomment extends Component {
  render() {
    const { content } = this.props
    const { author } = content
    const nickname = `${author.nTh}기 ${author.fullname}`
    const { text } = content
    const imgsrc = author.profileImage.savedPath
    const imgalt = author.profileImage.filename
    return (
      <div style={{ margin: '2px 0px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{
            width: '32px', marginRight: '4px', height: '32px', background: '#686868',
          }}
          >
            <img src={imgsrc} alt={imgalt} style={{ width: '100%' }} />
          </div>
          <div style={{ width: '91%' }}>
            <p>
              <Popover
                content={<Namecard content={author} />}
                placement="leftTop"
              >
                <a>
                  {' '}
                  {nickname}
                  {' '}
                </a>
              </Popover>
              {text}
            </p>
            <div>
              <a> Like 2 </a>
              {' '}
              13hrs
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Recomment.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Recomment
