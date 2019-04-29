// @flow
import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Menu, Icon } from "antd";

const SubMenu = Menu.SubMenu;

export type dataSource = Array<{
  icon:string,
  name:string,
  items: Array<{
    icon?:string, // 默认无
    name:string,
  }>
}>

type Props = {
  dataSource: dataSource
}



// 改用ant ui
export class Navantd extends Component<Props> {
  handleClick = (e: Event) => {
    console.log('click ', e);
  }


 
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ height: '100%', minHeight: '91vh'}}
        inlineCollapsed={false}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item>
          <Icon type="bank" />
          首页
        </Menu.Item>
        
        {
          this.props.dataSource.map((value, index, arr) => (
            <SubMenu key={index} title={<span><Icon type={value.icon} /><span>{value.name}</span></span>}>
              {
                value.items.map((value, index, arr) => (
                  <Menu.Item key={index}>{value.icon&&<Icon type={value.icon} />}{value.name}</Menu.Item>
                ))
              }
            </SubMenu>
          ))
        }
      </Menu>
    );
  }
    
}