import React, {useState,useEffect} from 'react'
import { Layout, Menu,PageHeader, Button, Row, Col,Badge, Breadcrumb, Calendar} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import LiveClock from '../../../utils/LiveClock';
import { Link } from "react-router-dom";
import HolidayAdd from '../SystemAdd/HolidayAdd';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction' //fullCalender 데이터 선택할려면 필요함

const { Header, Content, Sider } = Layout;

function Holiday(props) {
  //holiday table 날짜 smallcode table 코드 정보 가져옴
  const [ListData, setListData] = useState([]);
  const [Info, setInfo] = useState([]); 
  const [DateInfo, setDateInfo] = useState([]);
  const [DayInfo,setDayInfo] = useState('');

  useEffect(() => {         
    axios.get('/api/ListData').then(response => {
      let temp = {};
      for(let i=0; i< response.data.length; i++) {
        temp = {
          DATE: response.data[i].DATE,
          SmallInfo: response.data[i].SmallInfo,
        };
        setInfo(Info => [...Info,response.data[i].SmallInfo]);  //코드정보
        setDateInfo(DateInfo => [...DateInfo,response.data[i].DATE]);  //날짜정보
        setDayInfo(DayInfo => [...DayInfo,response.data[i].DATE.substring(8,10)]);
      }
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
              events={[
                { title: 'event 1', date: '2020-11-01' },
                { title: 'event 2', date: '2020-11-02' }
              ]}
            />
            <HolidayAdd Date={Date} Visible={Visible} handleOk={handleOk} handleCancel={handleCancel} />
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Holiday
