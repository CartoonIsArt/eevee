import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Popover } from 'antd'
import Namecard from './Namecard'

class Recomment extends Component {
  render() {
    const content = this.props.content
    const author = content.author.fullname
    const text = content.text
    const imgsrc = content.author.profileImage.savedPath
    const imgalt = content.author.profileImage.filename
    return (
      <div style={{ margin: '2px 0px' }} >
        <div style={{ display: 'flex' }} >
          <div style={{ width: '32px', marginRight: '4px', height: '32px', background: '#686868' }} >
            <img src={imgsrc} alt={imgalt} style={{ width: '100%' }} />
          </div>
          <div style={{ width: '91%' }}>
            <p>
              <Popover
                content={<Namecard content={content.author} />}
                placement="leftTop"
              >
                <a> {author} </a>
              </Popover>
              {text}
            </p>
            <div>
              <a> Like 2 </a> 13hrs
            </div>
          </div>
          <div>
            <Button icon="down" shape="circle" size="small" />
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
