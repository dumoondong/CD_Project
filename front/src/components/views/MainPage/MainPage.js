import React, {useState} from 'react'
import { DatePicker, message, Layout, Menu, Breadcrumb, Button, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import LiveClock from './LiveClock';
import MainTable from './MainTable'

const { Header, Content, Sider, Footer } = Layout;

function MainPage() {
  const [date, setDate] = useState('');
  //state 값을 조건에 따라 변경하는 함수
  const handleChange = value => {
      message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
      setDate(value);
  };
    //main
  return (
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
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
          <Breadcrumb style={{ margin: '16px 0', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Breadcrumb.Item>
                <DatePicker onChange={handleChange} />
              </Breadcrumb.Item>
            </Breadcrumb>
            <MainTable></MainTable>
            <MainTable></MainTable>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainPage
