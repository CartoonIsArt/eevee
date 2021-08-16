import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon, Tag } from 'antd'

function makeAccountBadge(account, minimizeIcon) {
  if (account.role === "superuser")     return (<Tag color="tomato"><Icon type="user" />{minimizeIcon || " 관리자"}</Tag>)
  if (account.role === "board manager") return (<Tag color="yellowgreen"><Icon type="form" />{minimizeIcon || " 임원진"}</Tag>)
  if (account.role === "manager")       return (<Tag color="goldenrod"><Icon type="dollar" />{minimizeIcon || " 총무"}</Tag>)
  return (<span />)
}

class NameTag extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { account, minimizeIcon, nameOnly, ...rest } = this.props
    const nickname = `${account.student.nTh}기 ${account.student.name}`

    // Popover를 위해서 {...rest} 전달 필요
    const tag = nameOnly
      ? (
        <div {...rest}>
          <span style={{ verticalAlign: 'middle' }}>{nickname} </span>
        </div>
      )
      : (
        <Link to={`/members/${account.username}`} {...rest}>
          <span style={{ verticalAlign: 'middle' }}>{nickname} </span>{makeAccountBadge(account, minimizeIcon)}
        </Link>
      )
    return tag
  }
}

NameTag.propTypes = {
  account: PropTypes.object.isRequired,
  minimizeIcon: PropTypes.bool,
  nameOnly: PropTypes.bool,
}

NameTag.defaultProps = {
  minimizeIcon: false,
  nameOnly: false,
}

export default NameTag
