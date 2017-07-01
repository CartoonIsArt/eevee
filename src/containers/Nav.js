import React, { Component } from 'react'
import { Affix, Input, Button } from 'antd'

class Nav extends Component {
  render() {
    const Search = Input.Search;
    return (
      <Affix>
        <nav className="Nav-wrapper">
          <div className="Nav" style={{ display: 'flex', flexDirection: 'row', alignContent: 'left' }}>
            <div style={{ width: '10%' }}>
              <a className="ant-anchor-link-title" href="#" width="10%">
                <img height="44px" width="107px" src="https://cia.kw.ac.kr/media/logo.png" alt="logo" />
              </a>
            </div>
            <div style={{ display: 'flex', width: '80%', padding: '7px' }}>
              <Search
                placeholder="검색(ex: 16기 김성우)"
                style={{ width: '50%' }}
              />
            </div>
            <div style={{ width: '10%', padding: '7px' }}>
              <Button icon="bulb" shape="circle" />
            </div>
          </div>
        </nav>
      </Affix>
    )
  }
}

export default Nav
