import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Namecard from './Namecard'
import NameTag from './NameTag'
import { Popover } from 'antd'

class Recomment extends Component {
  render() {
    const { recomment } = this.props
    const { author, text } = recomment
    const imgsrc = author.profile.profileImage
    const imgalt = author.profile.profileImage
    
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
                content={<Namecard account={author} />}
                placement="leftTop"
              >
                <NameTag account={lover} nameOnly={true} />
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
  recomment: PropTypes.object.isRequired,
}

export default Recomment
