import React, {useState} from 'react'
import { Layout, Menu, Breadcrumb, Button, Row, Col, Table} from 'antd';
import 'antd/dist/antd.css';
import LiveClock from './LiveClock';
import MiddlePage from '../MiddlePage/MiddlePage';
import MyPage from '../MyPage/MyPage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const columns = [
  {
    title: '날짜',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '일수',
    dataIndex: 'day',
    key: 'day',
  },
  {
    title: '연가종류',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '연가내용',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '승인여부',
    dataIndex: 'confirm',
    key: 'confirm',
  },
];
//칼럼 안 데이터
const data = [
  {
    key: '1',
    date: 'YYYY/MM/DD',
    day: 'n',
    type: '연차',
    content: 'Null',
    confirm: 'Null',
  },
];

const { Header, Content, Sider, Footer } = Layout;

function OutWork() {
    return(
        <div>
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
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
            <Menu.Item key="1">
              <span>홈 바로가기</span>
              <Link to="/main" />
            </Menu.Item>
            <Menu.Item key="2">
              <span>연가</span>
              <Link to="/outWork" />
            </Menu.Item>
            <Menu.Item key="3">
              <span>근무조회</span>
              <Link to="/middle" />
            </Menu.Item>
            <Menu.Item key="4">
              <span>업무지시 및 조회</span>
            </Menu.Item>
            <Menu.Item key="5">
              <span>마이 페이지</span>
              <Link to="/mypage" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
            <Button style={{marginRight:'1%'}}>로그아웃</Button>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{backgroundColor: 'cyan', height: '500px'}}>
              캘린더자리
            </div>
            <div>
              <Button style = {{float: 'right'}}>연가신청</Button>
            </div>
            <div>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
    );
}

export default OutWork
