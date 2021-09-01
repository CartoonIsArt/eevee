import { Component } from 'react'
import PropTypes from 'prop-types'


class DelayComponent extends Component {
  render() {
    return (this.props.loading && this.props.children)
  }
}

DelayComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
}

export default DelayComponent
