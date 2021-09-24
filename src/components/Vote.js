import { Button, Card, Checkbox, Col, DatePicker, Input, List, message, Progress, Radio, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { getVote, postVote, castVote } from '../actions'


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
const TitleVote = ({ title }) => <span>{title}</span>
const TitleResult = TitleVote

const HeaderEdit = ({ onChange }) => <DatePicker placeholder="종료시간" onChange={onChange} />
const HeaderVote = ({ endTime }) => <span>종료시간: {endTime}</span>
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
        <span>{item.item} </span>
        <Progress
          percent={item.percent}
          format={(percent) => `${(percent).toFixed(2)}% (${item.count})`}
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

const FooterVote = ({ onClickVote }) => (
  <Row type="flex" justify="end">
    <Button icon="inbox" onClick={onClickVote}>투표하기</Button>
  </Row>
)

const FooterResult = ({ onClickEdit }) => (
  <Row type="flex" justify="end">
    <Button icon="edit" onClick={onClickEdit}>수정하기</Button>
  </Row>
)

class Vote extends Component {
  state = {
    type: this.props.type,
    id: 1,
    title: '',
    endTime: '',
    hasMultiple: false,
    items: [],
    selections: [],
    result: [],
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
    const reducer = (prev, cur) => prev + cur
    const sel = this.state.selections
    const formData = {
      selection: Array.isArray(sel)
        ? sel.map(x => 1 << x).reduce(reducer)
        : sel,
    }

    const { vote } = this.props

    this.props.castVote(this.state.id, formData)
      .then(() => {
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
            percent: x / total * 100,
          }))
          .sort((lhs, rhs) => rhs.count - lhs.count)
        })
      })
      .catch((e) => message.error(`투표하는데 실패했습니다: ${e.message}`))
  }

  onClickEdit = () => this.setState({ type: 'vote' })

  render() {
    const { title, type, endTime, hasMultiple, items, selections, result } = this.state
    const [Title, Header, Body, Footer] = getContents(type)
    
    return (
      <Card size="small" title={<Title title={title} onChange={this.onChangeTitle} />}>
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
            />
          </Col>
        </Row>
      </Card>
    )
  }
}

Vote.propTypes = {
  type: PropTypes.oneOf('edit', 'vote', 'result'),
}

Vote.defaultProps = {
  // type: 'vote',
  type: 'edit',
}

const mapStateToProps = (state) => ({
  vote: state.vote,
})
const mapDispatchToProps = ({
  getVote,
  postVote,
  castVote,
})

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
