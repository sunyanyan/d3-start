import React, { Component } from 'react';
import './App.css';
import LeftSider from './View/LeftSider'
import {D3Route} from './Routes/index'
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
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <D3Route />
            </Content>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
