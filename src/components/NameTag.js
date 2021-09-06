import { Icon, Popover, Tag } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Namecard from './Namecard'


function makeAccountBadge(account, minimizeIcon) {
  if (account.role === "superuser")     return (<Tag color="tomato"><Icon type="user" />{minimizeIcon || " 관리자"}</Tag>)
  if (account.role === "board manager") return (<Tag color="yellowgreen"><Icon type="form" />{minimizeIcon || " 임원진"}</Tag>)
  if (account.role === "manager")       return (<Tag color="goldenrod"><Icon type="dollar" />{minimizeIcon || " 총무"}</Tag>)
  return (<span />)
}

class NameTag extends Component {
  render() {
    const { account, minimizeIcon, nameOnly, hasPopover, ...rest } = this.props
    const nickname = `${account.student.nTh}기 ${account.student.name}`
    
    // Popover를 위해서 {...rest} 전달 필요
    const tag = nameOnly
      ? (
        <div {...rest}>
          <span className="nametag-span">{nickname} </span>
        </div>
      )
      : (
        <Link to={`/members/${account.username}`} {...rest}>
          <span className="nametag-span">{nickname} </span>{makeAccountBadge(account, minimizeIcon)}
        </Link>
      )
    return hasPopover
      ? (
        <Popover
          placement="leftTop"
          content={<Namecard account={account} />}
        >
          {tag}
        </Popover>
      )
      : tag
  }
}

NameTag.propTypes = {
  account: PropTypes.object.isRequired,
  minimizeIcon: PropTypes.bool,
  nameOnly: PropTypes.bool,
  hasPopover: PropTypes.bool,
}

NameTag.defaultProps = {
  minimizeIcon: false,
  nameOnly: false,
  hasPopover: false,
}

export default NameTag
