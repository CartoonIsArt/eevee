import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Input,
  List,
  message,
  Progress,
  Radio,
  Row,
} from 'antd'
import os from 'os'
import PropTypes from 'prop-types'
import React, { Component, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loading from './Loading'
import { getVote, postVote, castVote } from '../actions'
import { isVoteExpired, printTime } from '../lib'


const getContents = (type) => {
  if (type === 'edit') return [TitleEdit, HeaderEdit, BodyEdit, FooterEdit]
  if (type === 'vote') return [TitleVote, HeaderVote, BodyVote, FooterVote]
  return [TitleResult, HeaderResult, BodyResult, FooterResult]
}

const TitleEdit = ({ title, onChange }) => {
  const [disable, setDisable] = useState(false)
  
  return (
    <Input
      placeholder="제목을 입력하세요"
      disabled={disable}
      value={title}
      onChange={onChange}
      onPressEnter={() => setDisable(true)}
    />
  )
}

const TitleVote = ({ title, id, height }) => {
  return (
    <Row type="flex" justify="space-between">
      <Col className="vote-title">
        <span>{title}</span>
      </Col>
      <Col>
        <CopyToClipboard text={`${os.hostname()}/embed/vote/${id}?height=${height}`}>
          <Button
            type="link"
            icon="share-alt"
            size="small"
            onClick={() => message.success('공유 링크를 복사했습니다.')}
          >
            <span>공유</span>
          </Button>
        </CopyToClipboard>
      </Col>
    </Row>
  )
}
const TitleResult = TitleVote

const HeaderEdit = ({ onChange }) => <DatePicker placeholder="투표 종료" onChange={onChange} />
const HeaderVote = ({ endTime }) => <span>투표 종료: {printTime(endTime)}</span>
const HeaderResult = HeaderVote

const BodyEdit = ({ items, addItem }) => {
  const [value, setValue] = useState('')

  return (
    <List
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <span>{item}</span>
        </List.Item>
      )}
      footer={(items.length < 4) &&
        <List.Item>
          <Input
            placeholder="새 투표 항목을 입력하세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={(e) => { addItem(e); setValue(''); }}
          />
        </List.Item>
      }
    />
  )
}

const BodyVote = ({ hasMultiple, items, selections, onChange }) => {
  const Selector = hasMultiple ? Checkbox : Radio

  return (
    <Selector.Group value={selections} onChange={onChange}>
      <List
        dataSource={items}
        renderItem={(item, idx) => (
          <List.Item>
            <List.Item.Meta
              title={<Selector value={idx}>{item}</Selector>}
              description={<Progress showInfo={false} />}
            />
          </List.Item>
        )}
      />
    </Selector.Group>
  )
}

const BodyResult = ({ result }) => (
  <List
    dataSource={result}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          title={item.item}
          description={
            <Col span={20}>
              <Progress
                percent={item.percent}
                format={(percent) => `${percent.toFixed(0)}% (${item.count})`}
              />
            </Col>
          }
        />
      </List.Item>
    )}
  />
)

const FooterEdit = ({ hasMultiple, onChange, onClickCreate }) => (
  <Row type="flex" justify="end">
    <Checkbox checked={hasMultiple} onChange={onChange}>복수 선택</Checkbox>
    <Button icon="form" onClick={onClickCreate}>만들기</Button>
  </Row>
)

const FooterVote = ({ onClickVote, canVote }) => (
  <Row type="flex" justify="end">
    <Button icon="inbox" onClick={onClickVote} disabled={!canVote}>투표하기</Button>
  </Row>
)

const FooterResult = ({ onClickEdit, canFix }) => (
  <Row type="flex" justify="end">
    <Button icon="edit" onClick={onClickEdit} disabled={!canFix}>수정하기</Button>
  </Row>
)

class Vote extends Component {
  state = {
    loading: false,
    type: this.props.type,
    id: -1,
    title: '',
    endTime: '',
    hasMultiple: false,
    items: [],
    selections: [],
    result: [],
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getVote(this.props.match.params.id)
        .then(() => {
          const { vote } = this.props
          const voted = Array.isArray(vote.selections)
            ? vote.selections.length > 0
            : vote.selections >= 0

          this.setState({
            loading: true,
            type: isVoteExpired(vote.endTime) || voted ? 'result' : 'vote',
            id: vote.id,
            title: vote.title,
            endTime: vote.endTime,
            hasMultiple: vote.hasMultiple,
            items: vote.items,
            selections: vote.selections,
            result: vote.result,
          })
        })
        .catch((e) => message.error(`투표 정보를 불러오는데 실패했습니다: ${e.message}`))
    }
    else if (this.props.data) {
      const { data } = this.props
        
      this.setState({
        loading: true,
        id: data.id,
        title: data.title,
        endTime: data.endTime,
        hasMultiple: data.hasMultiple,
        items: data.items,
        selections: data.selections,
        result: data.result,
      })
    }
    else
      this.setState({ loading: true })
  }

  onChangeTitle = (e) => this.setState({ title: e.target.value })

  onChangeDateTime = (_, endTime) => this.setState({ endTime })

  addItem = (e) => this.setState({ items: this.state.items.concat([e.target.value]) })

  onChangeSelect = (e) => this.setState({ selections: e.target ? e.target.value : e })

  toggleMultiple = () => this.setState({ hasMultiple: !this.state.hasMultiple })

  onClickCreate = () => {
    const formData = {
      title: this.state.title,
      endTime: this.state.endTime,
      items: this.state.items,
    }

    this.props.postVote(formData)
      .then(() => this.setState({
        type: 'vote',
        id: this.props.vote.id,
      }))
      .catch((e) => message.error(`투표를 생성하는데 실패했습니다: ${e.message}`))
  }

  onClickVote = () => {
    const sel = this.state.selections
    const formData = {
      selection: Array.isArray(sel)
        ? sel.map(x => 1 << x).reduce((prev, cur) => prev + cur)
        : 1 << sel,
    }

    this.props.castVote(this.state.id, formData)
      .then((result) => this.setState({
        type: 'result',
        result: result,
      }))
      .catch((e) => message.error(`투표하는데 실패했습니다: ${e.message}`))
  }

  onClickEdit = () => this.setState({ type: 'vote' })

  render() {
    const {
      loading,
      id,
      title,
      type,
      endTime,
      hasMultiple,
      items,
      selections,
      result
    } = this.state
    const [Title, Header, Body, Footer] = getContents(type)
    let height = 410
    if (items.length === 2) height = 264
    if (items.length === 3) height = 337

    return (
      <Row id="vote-embed">
        <Loading loading={loading}>
          <Card
            id="vote-card"
            size="small"
            title={<Title id={id} title={title} height={height} onChange={this.onChangeTitle} />}
          >
            <Row>
              <Col>
                <Header endTime={endTime} onChange={this.onChangeDateTime} />
              </Col>
              <Col>
                <Body
                  hasMultiple={hasMultiple}
                  items={items}
                  selections={selections}
                  result={result}
                  addItem={this.addItem}
                  onChange={this.onChangeSelect}
                />
              </Col>
              <Col>
                <Footer
                  hasMultiple={hasMultiple}
                  onChange={this.toggleMultiple}
                  onClickCreate={this.onClickCreate}
                  onClickVote={this.onClickVote}
                  onClickEdit={this.onClickEdit}
                  canVote={Array.isArray(selections) ? selections.length > 0 : selections >= 0}
                  canFix={!isVoteExpired({ endTime })}
                />
              </Col>
            </Row>
          </Card>
        </Loading>
      </Row>
    )
  }
}

Vote.propTypes = {
  type: PropTypes.oneOf(['edit', 'vote', 'result']),
  data: PropTypes.object,
}

Vote.defaultProps = {
  type: 'edit',
}

const mapStateToProps = (state) => ({
  account: state.account,
  vote: state.vote,
})
const mapDispatchToProps = ({
  getVote,
  postVote,
  castVote,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vote))
