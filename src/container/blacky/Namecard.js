import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Namecard extends Component {
  render() {
    let cwidth = '320px'  // component width
    const user = this.props.content
    cwidth = this.props.width
    return (
      <div style={{ width: cwidth }}>
        <a className="ant-anchor-link-title" href="#">
          <img width="100%" src={user.image.src} alt={user.image.alt} />
        </a>
        <div style={{ height: '98px',
          display: 'flex',
          flexDirection: 'row',
          padding: '8px',
          lineHeight: '1rem' }}
        >
          <div style={{ fontSize: '18pt', textAlign: 'left' }}>
            <div style={{ height: '34%', fontWeight: 'bold' }} >
              <Link to={`/members/${user.username}`}>
                {user.last_name}
              </Link>
            </div>
            <div style={{ height: '33%', fontSize: '14pt' }}>
              {user.username}
            </div>
            <div style={{ height: '33%', fontSize: '14pt' }}>
              {user.department}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Namecard.propTypes = {
  content: PropTypes.object.isRequired,
  width: PropTypes.string,
}

Namecard.defaultProps = {
  width: '320px',
}

const mapStateToProps = state => ({
  user: state.user,
})
const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Namecard)
