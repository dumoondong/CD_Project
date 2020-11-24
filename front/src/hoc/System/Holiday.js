import React, {useState,useEffect} from 'react'
import { Layout, Menu,PageHeader, Button, Row, Col,Badge, Breadcrumb} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import LiveClock from '../../utils/LiveClock';
import { Link } from "react-router-dom";
import HolidayAdd from '../SystemAdd/HolidayAdd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; //fullCalender 데이터 선택할려면 필요함

const { Header, Content, Sider } = Layout;

function Holiday(props) {
  const [ListData, setListData] = useState([]);

  useEffect(() => {         
    axios.get('/api/listdata').then(response => {
      // response.data.map(listData => (
      //   console.log(listData)
      // ));
      setListData(response.data);
    });
}, []);
  //캘린더
  const [Date, setDate] = useState('');
  /////////////////////////////////////////////////HolidayAdd.js와 연결하는 부분
  const [Visible, setVisible] = useState(false);
  //팝업 ON(빅캘린더에서 날짜정보를 가져오고 모달창을 띄움)
  const handleDateSelect = (value) => {
    console.log(value.dateStr);
    setDate(value.dateStr);
    setVisible(true);
  }
  //팝업 OFF
  const handleCancel = () => {
    setVisible(false);
  }
  ///팝업 OFF
  const handleOk = () => {
    setVisible(false);
  }
  //분리 작업 테스트 성공...휴일 설정/////////////////////////////////////////////
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
        <div>
        <LiveClock></LiveClock>
        </div>
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
          <Link  to="/">
            <Button style={{marginRight:'1%'}}>로그아웃</Button>
            </Link>
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
            <FullCalendar 
              initialView="dayGridMonth"
              plugins={[ dayGridPlugin, interactionPlugin]}
              dateClick = {handleDateSelect}
              height = '90%'
              events={ListData}
            />
            <HolidayAdd Date={Date} Visible={Visible} handleOk={handleOk} handleCancel={handleCancel} />
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Holiday
