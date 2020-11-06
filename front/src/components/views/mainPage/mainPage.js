import React, {useState} from 'react'
import { DatePicker, message, Alert, Layout, Menu, Breadcrumb, Button, Row, Col, Switch} from 'antd';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LiveClock from './LiveClock';
import Home from './Home';
import OutWork from './OutWork';

const { Header, Content, Sider, Footer } = Layout;

function MainPage() {
    //main
  return (
    <div>
      <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{background:'dark'}}>
        <div>
        <LiveClock></LiveClock>
        </div>
        {/* grid */}
        <Row>
            <Col span={12}><Button block>출근</Button></Col>
            <Col span={12}><Button block>퇴근</Button></Col>
        </Row>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <span>홈 바로가기</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
              <span>연가</span>
              <Link to="/outWork" />
            </Menu.Item>
            <Menu.Item key="3">
              <span>근무조회</span>
            </Menu.Item>
            <Menu.Item key="4">
              <span>업무지시 및 조회</span>
            </Menu.Item>
            <Menu.Item key="5">
              <span>마이 페이지</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
            <Button style={{marginRight:'1%'}}>로그아웃</Button>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Route exact path="/" component={Home} />
            {/* 바꾸고 새로고침 시 안에 내용이 사라짐. 수정해야함 */}
            <Route exact path="/outWork" component={OutWork} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      </Router>
    </div>
  );
};

export default MainPage