import React, { Component } from 'react';
import './App.css';
import LeftSider from './View/LeftSider'
import { Link } from 'react-router-dom';
import { D3Route } from './Routes/index'
import {
  Layout, Breadcrumb,
} from 'antd';
const {
  Header, Content, Footer,
} = Layout;


class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <LeftSider />
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            {this._renderBreadcrumb()}
            <Content style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <D3Route />
            </Content>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            D3 start ©2018 Created by Sun Tong Sheng
          </Footer>
        </Layout>
      </Layout>
    );
  }

  _renderBreadcrumb = () => {
    let s = window.location.href.split("/");
    let path = s[s.length -1];
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to={"/"}>首页</Link></Breadcrumb.Item>
        {path.length > 0 ? <Breadcrumb.Item>{path}</Breadcrumb.Item> : null}
      </Breadcrumb>
    );
  }
}

export default App;
