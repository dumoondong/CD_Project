import React, {useState, useEffect} from 'react';
import { DatePicker, message, Layout, Menu, Breadcrumb, Button, Row, Col, Modal} from 'antd';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import LiveClock from '../../../src/components/views/MainPage/LiveClock';
import MainTable from '../../../src/components/views/MainPage/MainTable';
import LoginedUser from '../../utils/LoginedUser';
import LogoutUser from '../../utils/LogoutUser';

const { Header, Content, Sider, Footer } = Layout;

function MasterMainPage(props) {
  //const mainProps = props;
  const [Picker, setPicker] = useState(''); //날짜 데이터
  //state 값을 조건에 따라 변경하는 함수
  const handleChange = value => {
      message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
      setPicker(value);
  };

  //출근 버튼 부분
  const [userID, setuserID] = useState('');
  const [Date, setDate] = useState('');
  const [Time, setTime] = useState('');
  const [Visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get('/api/userInfo').then(res => {
      setuserID(res.data.userID);
    });
    setDate(moment().format('YYYY/MM/DD'));
    setTime(moment().format('hh:mm:ss'));
  }, []);
  //팝업 창  
  const handleOnWork = () => {
    setVisible(true);
    setDate(moment().format('YYYY/MM/DD'));
    setTime(moment().format('hh:mm:ss'));
  };

  const handleOk = () => {
    setVisible(false);
  }
  const handleCheck = () =>{
    let body ={
      id:userID,
      date:Date,
      time:Time
    }
    console.log(body);
    /* 구현 중 테스트 중*/
    axios.get('/api/onWork', body).then(res => {
      console.log(res.data);
    });
  }
    //main
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{background:'dark'}}>
        <div>
        <LiveClock />
        </div>
        {/* grid */}
        <Row>
            <Col span={12}><Button block onClick={handleOnWork} onOk={handleOk}>출근</Button></Col>
            <Col span={12}><Button block>퇴근</Button></Col>
        </Row>
        <Modal
          visible={Visible}
          onOk={handleOk}
          afterClose={handleCheck}
          closable={false}
          cancelButtonProps={{disabled: true}}
          width={250}
          style={{textAlign:'center'}}
        >
          출근되었습니다
          </Modal>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <span>홈 바로가기</span>
              <Link to="/mastermain" />
            </Menu.Item>
            <Menu.Item key="2">
              <span>연가</span>
              <Link to="/masteroutWork" />
            </Menu.Item>
            <Menu.Item key="3">
              <span>근무조회</span>
              <Link to="/mastermiddle" />
            </Menu.Item>
            <Menu.Item key="4">
              <span>업무지시 및 조회</span>
              <Link to="/mastermanage" />
            </Menu.Item>
            <Menu.Item key="5">
              <span>마이 페이지</span>
              <Link to="/masterpage" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
            {/* 로그인 시 유저 이름 및 로그아웃 */}
            <LoginedUser />
            <LogoutUser pageChange={props}/>
          </Header>
          <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Breadcrumb.Item>
                <DatePicker onChange={handleChange} />
              </Breadcrumb.Item>
            </Breadcrumb>
            <MainTable />
            <MainTable />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MasterMainPage
