import React, {useState,useEffect} from 'react'
import { Select,Tag,Layout, Menu,PageHeader,Table, Button, Row, Col,Checkbox,Form,Input,message,
  Breadcrumb, Calendar, Modal, Alert} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import LiveClock from '../MainPage/LiveClock';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Content, Sider, Footer } = Layout;


function Holiday(props) {
  const [Date, setDate] = useState('');

 
  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }
  const setOnSelect = (value) => {
    //console.log(value.format('L'));
    setDate(...Date, value.format('YYYY-MM-DD'));
    console.log(Date);
    
  
  }


  //팝업
  const [Visible, setVisible] = useState(false);
  const showModal = (value) => {
    setVisible(true);
  };
 
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    setVisible(false);
  }
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
              <span>휴일설정</span>
              <Link to="/holiday" />
            </Menu.Item>
            <Menu.Item key="2">
              <span>직원 관리</span>
              <Link to="/manage" />
            </Menu.Item>
            <Menu.Item key="3">
              <span>공통 코드</span>
              <Link to="/code" />
            </Menu.Item>           
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
            <Button style={{marginRight:'1%'}}>로그아웃</Button>
          </Header>
          <Content>
          <Breadcrumb style = {{background: '#fff', minHeight: 100}}>
              <Breadcrumb.Item>
                <PageHeader
                  className="site-page-header"
                  onBack={() => null}
                  title="휴일설정"
                  subTitle="휴일설정 페이지">   
                </PageHeader>
              </Breadcrumb.Item>
            </Breadcrumb>     
            <Calendar onPanelChange={onPanelChange} onSelect={setOnSelect} onChange={showModal} />
           
        <Modal
          title="휴일설정"
          visible={Visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
            
          <Alert message={`날짜 : ${Date}`}/>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Holiday