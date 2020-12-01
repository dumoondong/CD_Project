import React from 'react'
import { Layout, Menu } from 'antd';
import LiveClock from '../utils/LiveClock';
import { Link } from "react-router-dom";
import './SideBar.css';

const { Sider } = Layout;

function SideBarSystem(props) {
    return (
        <>
            <Sider>
                <div>
                    <LiveClock></LiveClock>
                </div>
                <Menu theme="dark" defaultSelectedKeys={[props.DefaultKey]} mode="inline">
                    <Menu.Item key="1" style = {{height: 100,padding: 30 }}>
                        <span style = {{fontSize: 20}}>휴일 설정</span>
                        <Link to="/holiday" />
                    </Menu.Item>
                    <Menu.Item key="2" style = {{height: 100,padding: 30}}>
                        <span style = {{fontSize: 20}}>직원 관리</span>
                        <Link to="/manage" />
                    </Menu.Item>
                    <Menu.Item key="3" style = {{height: 100,padding: 30}}>
                        <span style = {{fontSize: 20}}>공통 코드</span>
                        <Link to="/smallcode" />
                    </Menu.Item>           
                </Menu>
            </Sider>
        </>
    )
}

export default SideBarSystem
