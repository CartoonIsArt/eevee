import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Popover } from 'antd'
import { connect } from 'react-redux'
import Line from '../../components/Line'
import Namecard from './Namecard'
import { getNoties } from '../../actions'
import { printTime } from '../../policy'


class Noties extends Component {
  componentWillMount() {
    const noties = this.props.noties
    if (noties.length === 0) { this.props.getNoties() }
  }
  render() {
    const noties = this.props.noties
    return (
      <div >
        <div style={{ height: '8px' }} />
        <div style={{ height: '192px', backgroundColor: 'white', padding: '4px' }}>
          <div style={{ height: '28px', fontSize: '12pt', textAlign: 'left', display: 'flex', flexDrection: 'column' }}>
            <div style={{ marginRight: '228px', marginLeft: '12px', fontSize: '12pt' }}>
              <Icon type="notification" />
            </div>
            <div style={{ fontSize: '12pt', marginTop: '4px' }}>
              <a href="#">설정</a>
            </div>
          </div>
          <Line />
          <div style={{ height: '156px', overflowY: 'scroll' }}>
            {noties.map(noti =>
          (<div key={noti.id}>
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
          </div>),
        )}
          </div>
        </div>
      </div>
    )
  }
}


Noties.propTypes = {
  noties: PropTypes.array,
  getNoties: PropTypes.func.isRequired,
}

Noties.defaultProps = {
  noties: [],
}

const mapStateToProps = state => ({
  noties: state.noties,
})
const mapDispatchToProps = ({
  getNoties,
})

export default connect(mapStateToProps, mapDispatchToProps)(Noties)
