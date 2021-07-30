import React, { Component } from 'react'

class Page404 extends Component {
  render() {
    const backgroundStyle = {
      position: 'fixed',
      top: '0',
      left: '0',
      minWidth: '100%',
      minHeight: '100%',
    }
    return (
      <img style={backgroundStyle} src="/images/error.png" alt="error" />
    )
  }
}

export default Page404
