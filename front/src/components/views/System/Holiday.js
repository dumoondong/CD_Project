import React, {useState,useEffect} from 'react'
import { Select,Tag,Layout, Menu,PageHeader,Table, 
  Button,Calendar, Alert, Row, Col,Checkbox,Form,Input,message,
  Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import moment from 'moment';
import LiveClock from '../MainPage/LiveClock';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from 'react-dom';

const { Header, Content, Sider, Footer } = Layout;
function Holiday( ){
  const [date,setDate] = useState(moment('2017-01-25'));
  const [selectedValue,setselectedValue] = useState(moment('2017-01-25'));
  
  function  onSelect(value){
    setDate(value);
    setselectedValue(value);
  }
  function  onPanelChange(value){
    setDate(value);

  }
  const handleChange = value => {
    message.info(`Selected value: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
    setDate(value);
};
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
          
       
        <Calendar  value={date} onSelect={onSelect} onChange={handleChange} onPanelChange={onPanelChange} />
     
       
            </Content>
      </Layout>
    </Layout>
    </div>
  
  );
  
};

export default Holiday