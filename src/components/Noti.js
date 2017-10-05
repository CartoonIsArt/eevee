import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import Namecard from './Namecard'
import Line from './Line'
import { printTime } from '../policy'

class Noti extends Component {
  render() {
    const noti = this.props.content
    return (
      <div key={noti.id}>
        <div
          className="noti"
              // eslint-disable-next-line
              onClick={() => console.log(noti.id)}
          style={
                noti.had_read ?
                  { height: '56px', display: 'flex', alignItems: 'stretch' } :
                  { background: '#bbdefb', height: '56px', display: 'flex', alignItems: 'stretch' }}
        >
          <div
            style={{ width: '48px', height: '48px', borderRadius: '24px', overflow: 'hidden', backgroundSize: 'cover' }}
          >
            <a href="#">
              <img width="100%" src={noti.from.image.src} alt={noti.from.image.alt} />
            </a>
          </div>
          <div style={{ flexGrow: '2', display: 'flex', alignItems: 'stretch', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '24px', marginLeft: '12px' }}>
                <Popover
                  placement="leftTop"
                  content={<Namecard content={noti.from} />}
                >
                  <a href="#"> {noti.from.last_name}</a>
                </Popover>
              </div>
              <div style={{ color: 'rgba(1,1,1,0.5)' }}> {printTime(noti.write_date)} </div>
            </div>
            <div style={{ flexGrow: '1', display: 'flex', marginLeft: '12px' }}>
              <a href="#" >
                <div style={{ color: 'rgba(0,0,0, 0.8)', wordWrap: 'break-word', WebkitBoxOrient: 'vertical', WebkitLineClamp: '2', width: '232px', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box' }}>
                  { noti.text }
                </div>
              </a>
            </div>
          </div>
        </div>
        <Line />
      </div>
    )
  }
}

Noti.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Noti
