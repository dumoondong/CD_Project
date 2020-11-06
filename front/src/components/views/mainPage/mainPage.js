import React, {useRef, useState} from 'react'
import { DatePicker, message, Alert, Layout, Menu, Breadcrumb, Button, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import LiveClock from './LiveClock';

const { Header, Content, Sider, Footer } = Layout;

function MainPage() {
    //state
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
        <Sider>
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
            </Menu.Item>
            <Menu.Item key="2">
              <span>연가</span>
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
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
              {/* 달력 */}
                <DatePicker onChange={handleChange} />
                <div style={{ marginTop: 16 }}>
                    <Alert message="Selected Date" description={date ? date.format('YYYY-MM-DD') : 'None'} />
                </div>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              MainPage
            </div>
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