import { Button, Popover, message, Row } from 'antd'
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
        .catch((e) => message.error(`좋아요 요청에 실패했습니다: ${e.message}`))
    else
      this.props.cancelLike(content.id)
        .catch((e) => message.error(`좋아요 취소에 실패했습니다: ${e.message}`))
  }

  render() {
    const { content, visibleComment, toggleComment, visibleAppend, toggleAppend } = this.props

    return (
      <Row>
        <Popover content={showLikedAccounts(content.likedAccounts)}>
          <FooterButton
            icon="like"
            text={`좋아요 ${content.likedAccounts.length}`}
            onClick={this.onClickLikeIt}
          />
        </Popover>
        {visibleComment && (
          <FooterButton
            icon="edit"
            text={`댓글 ${content.comments.length}`}
            onClick={toggleComment}
          />
        )}
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
  visibleComment: PropTypes.bool,
  toggleComment: PropTypes.func.isRequired,
  visibleAppend: PropTypes.bool,
  toggleAppend: PropTypes.func,
  postLike: PropTypes.func.isRequired,
  cancelLike: PropTypes.func.isRequired,
}

ContentFooter.defaultProps = {
  visibleComment: true,
  visibleAppend: false,
}

const mapStateToProps = (state) => ({
  account: state.account,
  feed: state.feed,   // feed를 state로 지정하지 않으면 댓글 & 대댓글 좋아요 누를 때 업데이트가 안됨
})
const mapDispatchToProps = ({
})
export default connect(mapStateToProps, mapDispatchToProps)(ContentFooter)
