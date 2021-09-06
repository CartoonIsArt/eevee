import { Button, Popover, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NameTag from './NameTag'


function showLikedAccounts(likedAccounts) {
  return likedAccounts.length
    ? likedAccounts.map((lover, idx) => <NameTag key={idx} nameOnly account={lover} />)
    : <span>당신이 이 댓글의 첫 번째 좋아요를 눌러주세요!</span>
}

const FooterButton = ({ icon, text, onClick }) => {
  return [
    <Button
      key="icon"
      shape="circle"
      icon={icon}
      size="small"
      onClick={onClick}
    />,
    <Button key="text" type="link" size="small" onClick={onClick}>
      {text}
    </Button>
    
  ]
}

class ContentFooter extends Component {
  onClickLikeIt = () => {
    const { account, content } = this.props

    if (content.likedAccounts.findIndex((lover) => lover.id === account.id) === -1)
      this.props.postLike(content.id)
    else
      this.props.cancelLike(content.id)
  }

  render() {
    const { content, toggleComment, visibleAppend, toggleAppend } = this.props

    return (
      <Row>
        <Popover content={showLikedAccounts(content.likedAccounts)}>
          <FooterButton
            icon="like"
            text={`좋아요 ${content.likedAccounts.length}`}
            onClick={this.onClickLikeIt}
          />
        </Popover>
        <FooterButton
          icon="edit"
          text={`댓글 ${content.comments.length}`}
          onClick={toggleComment}
        />
        {visibleAppend && (
          <FooterButton
            icon="plus"
            text="이어쓰기"
            onClick={toggleAppend}
          />
        )}
      </Row>
    )
  }
}

ContentFooter.propTypes = {
  content: PropTypes.object.isRequired,
  toggleComment: PropTypes.func.isRequired,
  visibleAppend: PropTypes.bool,
  toggleAppend: PropTypes.func,
  postLike: PropTypes.func.isRequired,
  cancelLike: PropTypes.func.isRequired,
}

ContentFooter.defaultProps = {
  visibleAppend: false,
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
})
export default connect(mapStateToProps, mapDispatchToProps)(ContentFooter)
