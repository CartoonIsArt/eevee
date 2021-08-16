import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Line from '../components/Line'
import Noti from '../components/Noti'
import { getNoties } from '../actions'
import { Icon, Modal, notification } from 'antd'

class Noties extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOn: false,
    }
  }
  componentWillMount() {
    this.props.getNoties()
  }

  hideModal() {
    this.setState({ isModalOn: false })
  }

  render() {
    const { noties } = this.props
    console.log(noties)
    return (
      <div>
        <div style={{ height: '192px', backgroundColor: 'white', padding: '4px' }}>
          <div style={{
            height: '28px', fontSize: '12pt', textAlign: 'left', display: 'flex', flexDrection: 'column',
          }}
          >
            <div style={{ marginRight: '156px', marginLeft: '12px', fontSize: '12pt' }}>
              <Icon type="notification" />
              <span style={{ marginLeft: "12px" }}>공지사항</span>
            </div>
          </div>
          <Line />
          <div style={{ height: '156px', overflowY: 'scroll' }}>
            {noties.map((noti) => <Noti content={noti} key={noti.id} />)}
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

const mapStateToProps = (state) => ({
  noties: state.noties,
})
const mapDispatchToProps = ({
  getNoties,
})

export default connect(mapStateToProps, mapDispatchToProps)(Noties)
