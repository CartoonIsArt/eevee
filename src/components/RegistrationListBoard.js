import { Avatar, Card, Checkbox, Col, List, Transfer, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Center from '../components/Center'
import NameTag from '../components/NameTag'

const { registrations, unregistrations } = this.props
const members = registrations.concat(unregistrations)

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: members.id,
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);


class RegistrationListBoard extends Component {
  state = {
    targetKeys: oriTargetKeys,
    selectedKeys: [],
    disabled: false,
  };

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });

    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  handleDisable = disabled => {
    this.setState({ disabled });
  };

  render() {
    const { targetKeys, selectedKeys, disabled } = this.state;
    const { registrations, unregistrations } = this.props

    return (
      <div>
        <Transfer
          dataSource={mockData}
          titles={['가입신청 목록', '승인된 가입신청 목록']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}
          onScroll={this.handleScroll}
          render={item => item.title}
          disabled={disabled}
        />
      </div>
    );
  }
}

RegistrationListBoard.propTypes = {
  registrations: PropTypes.array.isRequired,
  unregistrations: PropTypes.array.isRequired,
}

export default RegistrationListBoard
