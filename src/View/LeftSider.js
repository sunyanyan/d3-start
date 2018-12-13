import React, { Component } from 'react';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import { Link } from 'react-router-dom';
import {D3RouteConfig} from '../Routes/index'
const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class LeftSider extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div style={{
          color: 'white', display: 'flex', justifyContent: 'center',
          alignItems: 'center', height: '32px', margin: '16px', backgroundColor: '#1890ff33'
        }}>
          <Link to="/">可视化学习</Link></div>
        <Menu theme="dark" defaultOpenKeys={['D3图表']} mode="inline">

          <SubMenu
            key="D3图表"
            title={<span><Icon type="user" /><span>D3 图表</span></span>}
          >
          {D3RouteConfig.map((value,index)=>{
            if( value.path !== "/")
              return <Menu.Item key={index}><Link to={value.path}>{value.desc}</Link></Menu.Item>
          })}            
          </SubMenu>

        </Menu>
      </Sider>
    );
  }
}
