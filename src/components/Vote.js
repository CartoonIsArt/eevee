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
  Row
} from 'antd'
import os from 'os'
import PropTypes from 'prop-types'
import React, { Component, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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

const TitleVote = ({ title, id }) => {
  return (
    <Row type="flex" justify="space-between">
    <Col>
      <span>{title}</span>
    </Col>
    <Col>
      <CopyToClipboard text={`${os.hostname()}/embed/vote/${id}`}>
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

const HeaderEdit = ({ onChange }) => <DatePicker placeholder="종료시간" onChange={onChange} />
const HeaderVote = ({ endTime }) => <span>종료시간: {printTime(endTime)}</span>
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
            <Selector value={idx}>{item}</Selector>
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
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <span>{item.item} </span>
          </Col>
          <Col span={20}>
            <Progress
              percent={item.percent}
              format={(percent) => `${percent.toFixed(0)}% (${item.count})`}
            />
          </Col>
        </Row>
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

const FooterVote = ({ onClickVote }) => (
  <Row type="flex" justify="end">
    <Button icon="inbox" onClick={onClickVote}>투표하기</Button>
  </Row>
)

const FooterResult = ({ onClickEdit, disabled }) => (
  <Row type="flex" justify="end">
    <Button icon="edit" onClick={onClickEdit} disabled={disabled}>수정하기</Button>
  </Row>
)

class Vote extends Component {
  state = {
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
          const { account, vote } = this.props
          const myPoll = vote.polls
            .find((poll) => poll.account.id === account.id)

          const result = [
            vote.polls.filter(x => x.selection & 1).length,
            vote.polls.filter(x => x.selection & 2).length,
            vote.polls.filter(x => x.selection & 4).length,
            vote.polls.filter(x => x.selection & 8).length,
          ]
          const total = result[0] + result[1] + result[2] + result[3]

          this.setState({
            type: isVoteExpired(vote.endTime) ? 'result' : 'vote',
            id: vote.id,
            title: vote.title,
            endTime: vote.endTime,
            hasMultiple: vote.hasMultiple,
            items: [
              vote.item1,
              vote.item2,
              vote.item3,
              vote.item4,
            ].filter((item) => item),
            selections: myPoll && [
              (myPoll.selection & 1) && 1,
              (myPoll.selection & 2) && 2,
              (myPoll.selection & 4) && 3,
              (myPoll.selection & 8) && 4,
            ],
            result: result.map((x, idx) => ({
              item: vote[`item${idx + 1}`],
              count: x,
              percent: (total > 0) ? (x / total * 100) : 0,
            }))
            .sort((lhs, rhs) => rhs.count - lhs.count),
          })
        })
    }
    else if (this.props.data) {
      const { account, data } = this.props
      const myPoll = data.polls
        .find((poll) => poll.account.id === account.id)

      const result = [
        data.polls.filter(x => x.selection & 1).length,
        data.polls.filter(x => x.selection & 2).length,
        data.polls.filter(x => x.selection & 4).length,
        data.polls.filter(x => x.selection & 8).length,
      ]
      const total = result[0] + result[1] + result[2] + result[3]
        
      this.setState({
        id: data.id,
        title: data.title,
        endTime: data.endTime,
        hasMultiple: data.hasMultiple,
        items: [
          data.item1,
          data.item2,
          data.item3,
          data.item4,
        ].filter((item) => item),
        selections: myPoll && [
          (myPoll.selection & 1) && 1,
          (myPoll.selection & 2) && 2,
          (myPoll.selection & 4) && 3,
          (myPoll.selection & 8) && 4,
        ],
        result: result.map((x, idx) => ({
          item: data[`item${idx + 1}`],
          count: x,
          percent: (total > 0) ? (x / total * 100) : 0,
        }))
        .sort((lhs, rhs) => rhs.count - lhs.count),
      })
    }
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
  }

  onClickVote = () => {
    const reducer = (prev, cur) => prev + cur
    const sel = this.state.selections
    const formData = {
      selection: Array.isArray(sel)
        ? sel.map(x => 1 << x).reduce(reducer)
        : sel,
    }

    this.props.castVote(this.state.id, formData)
      .then(() => {
        const { vote } = this.props
        const result = [
          vote.polls.filter(x => x.selection & 1).length,
          vote.polls.filter(x => x.selection & 2).length,
          vote.polls.filter(x => x.selection & 4).length,
          vote.polls.filter(x => x.selection & 8).length,
        ]
        const total = result[0] + result[1] + result[2] + result[3]
        
        this.setState({
          type: 'result',
          result: result.map((x, idx) => ({
            item: vote[`item${idx + 1}`],
            count: x,
            percent: (total > 0) ? (x / total * 100) : 0,
          }))
          .sort((lhs, rhs) => rhs.count - lhs.count)
        })
      })
  }

  onClickEdit = () => this.setState({ type: 'vote' })

  render() {
    const { id, title, type, endTime, hasMultiple, items, selections, result } = this.state
    const [Title, Header, Body, Footer] = getContents(type)

    return (
      <Card id="vote-card" size="small" title={<Title id={id} title={title} onChange={this.onChangeTitle} />}>
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
              disabled={isVoteExpired({ endTime })}
            />
          </Col>
        </Row>
      </Card>
    )
  }
}

Vote.propTypes = {
  type: PropTypes.oneOf('edit', 'vote', 'result'),
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
