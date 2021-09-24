import { Card, Col, Input, Row, Tabs } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getVotes } from '../actions'
import Loading from '../components/Loading'
import Vote from '../components/Vote'
import { isVoteExpired } from '../lib'


const { TabPane } = Tabs
const { Search } = Input

const voted = (vote) => Array.isArray(vote.selections)
  ? vote.selections.length > 0
  : vote.selections >= 0

const searchResult = (votes, filter) => (
  votes
    .filter((vote) => vote.title.includes(filter))
    .map((vote) => (
      <Col className="votes-col" key={vote.id} flex={1}>
        <Vote
          type={isVoteExpired(vote) || voted(vote)  ? 'result' : 'vote'}
          data={vote}
          style={{ width: "24rem" }}
        />
      </Col>
    ))
)

class Votes extends Component {
  state = {
    loading: false,
    filter: '',
  }

  componentDidMount() {
    this.props.getVotes()
      .then(() => this.setState({ loading: true }))
      .catch((e) => {
        message.error(`투표 정보들을 불러오는데 실패했습니다: ${e.message}`)
        this.setState({ loading: true })
      })
    }

  setFilter(e) {
    this.setState({ filter: e.target.value })
  }

  render() {
    const { loading, filter } = this.state

    return (
      <Card id="votes" className="page-card" title="투표">
        <Loading loading={loading}>
          <Tabs
            destroyInactiveTabPane={true}
            tabBarExtraContent={<Search onChange={(e) => this.setFilter(e)} />}
          >
            <TabPane tab="진행중인 투표" key="vote">
              <Row className="votes-row" type="flex" justify="center">
                {searchResult(this.props.votes.filter((vote) => !isVoteExpired(vote)), filter)}
              </Row>
            </TabPane>
            <TabPane tab="종료된 투표" key="result">
              <Row className="votes-row" type="flex" justify="center">
                {searchResult(this.props.votes.filter((vote) => isVoteExpired(vote)), filter)}
              </Row>
            </TabPane>
            <TabPane tab="투표 만들기" key="edit">
              <Row className="votes-row" type="flex" justify="center">
                <Col className="votes-col" flex={1}>
                  <Vote type="edit" style={{ width: "24rem" }} />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Loading>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  votes: state.votes,
})
const mapDispatchToProps = ({
  getVotes,
})

export default connect(mapStateToProps, mapDispatchToProps)(Votes)
