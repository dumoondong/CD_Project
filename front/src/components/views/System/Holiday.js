import React, {useState,useEffect} from 'react'
import { Select,Tag,Layout, Menu,PageHeader,Table, Button, Row, Col,Checkbox,Form,Input,message,
  Breadcrumb, Calendar, Modal, Alert,Cascader} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import LiveClock from '../MainPage/LiveClock';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Content, Sider, Footer } = Layout;
const { Option} = Select;
const { TextArea } = Input;
function Holiday(props) {
  //캘린더
  const [Date, setDate] = useState('');
  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }
  const setOnSelect = (value) => {
    //console.log(value.format('L'));
    setDate(...Date, value.format('YYYY-MM-DD'));
    console.log(Date);
  }

  //휴일종류 선택
  function onChange(value) {
    console.log(`selected ${value}`);
  }
   
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }

  const [data, setData] = useState([]);
  onclick = () => {
    fetch("http://http://localhost:5000/api/smallcode", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          setdata: json.SmallInfo,
        });
      });
  };


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
          <div style = {{fontSize: 15,background: '#fff'}}>날짜
          <Alert style={{ background: '#fff'}} message={Date}/>
          </div>
          <div style = {{fontSize: 15,background: '#fff'}}>휴일종류</div>
         
         
          <Select showSearch style={{ width: 472 }} placeholder="휴일 지정"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={data}
          filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
           }
           >
         <Option value={data}/>
        
         </Select>
          
         <div style = {{fontSize: 15,background: '#fff'}}>비고</div>
          <TextArea  rows={8}  />
        </Modal>
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Holiday