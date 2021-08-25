import { Card, List } from 'antd'
import React, { Component } from 'react'

const externalLinks = [
  { name: '동아리 카페', url: 'https://cafe.naver.com/ciapg523' },
  { name: '인사부 열정페이팀', url: 'https://github.com/CartoonIsArt/' },
  // { name: '동아리 위키', url: 'https://cia.kw.ac.kr/wiki/index.php' },
]

class ExternalLinks extends Component {  
  render() {
    return (
      <Card title="외부 링크" size="small">
        <List
          size="small"
          dataSource={externalLinks}
          renderItem={(link) => (<List.Item><a href={link.url}>{link.name}</a></List.Item>)}
        />
      </Card>
    )
  }
}

export default ExternalLinks
