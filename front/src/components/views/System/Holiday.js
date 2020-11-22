import React, {useState,useEffect} from 'react'
import { Layout, Menu,PageHeader, Button, Row, Col,Badge, Breadcrumb, Calendar} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import LiveClock from '../MainPage/LiveClock';
import { Link } from "react-router-dom";
import HolidayAdd from '../RegisterPage/HolidayAdd';

const { Header, Content, Sider, Footer } = Layout;

function Holiday(props) {
  //holiday table 날짜 smallcode table 코드 정보 가져옴
  const [ListData, setListData] = useState([]);
  const [Info, setInfo] = useState([]); 
  const [DateInfo, setDateInfo] = useState([]);
  const [DayInfo,setDayInfo] = useState('');

  useEffect(() => {         
    axios.get('/api/ListData').then(response => {
      var temp = {};
      for(var i=0; i< response.data.length; i++) {
        temp = {
          DATE: response.data[i].DATE,
          SmallInfo: response.data[i].SmallInfo,
        };
        setInfo(Info => [...Info,response.data[i].SmallInfo]);  //코드정보 
        setDateInfo(DateInfo => [...DateInfo,response.data[i].DATE]);  //날짜정보
      }
    });
    setDayInfo(DateInfo[0],()=>{console.log(DayInfo)});
}, []);
  //캘린더에 표시
  function getListData(value) {
  
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'error', content: Info},
        ];
        break;
      default:
    }
    return listData || [];
  }
  //주석 필요
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  //주석 필요
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  }
  //주석 필요
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  //캘린더
  const [Date, setDate] = useState('');
  //주석 필요
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  }
  //주석 필요
  const setOnSelect = (value) => {
    //console.log(value.format('L'));
    setDate(value.format('YYYY-MM-DD'));
  }
  ///HolidayAdd.js와 연결하는 부분//////////////
  const [Visible, setVisible] = useState(false);
  //팝업 ON
  const showModal = () => {
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
  //분리 작업 테스트 성공...휴일 설정///////////
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
            <Calendar onPanelChange={onPanelChange} onSelect={setOnSelect} onChange={showModal} dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>
            <HolidayAdd Date={Date} Visible={Visible} handleOk={handleOk} handleCancel={handleCancel}/>
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Holiday
