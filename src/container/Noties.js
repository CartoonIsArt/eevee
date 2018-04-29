import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import Line from '../components/Line'
import Noti from '../components/Noti'
import { getNoties } from '../actions'

class Noties extends Component {
  componentWillMount() {
    this.props.getNoties()
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
              <Noti content={noti} />,
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
