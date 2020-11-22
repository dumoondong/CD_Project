import React, {useState, useEffect} from 'react'; //리액트
import { DatePicker, message, Layout, Menu, Breadcrumb, Button, Row, Col} from 'antd'; //antd디자인
import 'antd/dist/antd.css'; //antd디자인 CSS
import { Link } from "react-router-dom"; //라우터
import moment from 'moment'; //시간과 날짜
import LiveClock from '../../../utils/LiveClock'; //시계
import MainTable from './MainTable'; //주차 테이블
import LoginedUser from '../../../utils/LoginedUser'; ///utils 폴더
import LogoutUser from '../../../utils/LogoutUser';
import OnWork from '../../../utils/OnWork';           ///여기까지

const { Header, Content, Sider, Footer } = Layout;

function MainPage(props) {
  const [Picker, setPicker] = useState(''); //날짜 데이터
  //state 값을 조건에 따라 변경하는 함수
  const handleChange = value => {
      message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
      setPicker(value);
  };
  //출근 관련 연동
  const [Visible, setVisible] = useState(false);
  const [Date, setDate] = useState(''); //날짜 변수
  const [Time, setTime] = useState(''); //시간 변수

  useEffect(() => {
    //메인 페이지 들어오면 우선 그 시간으로 시간 초기화(오류방지)
    setDate(moment().format('YYYY/MM/DD')); //현재 날짜
    setTime(moment().format('hh:mm'));//현재 시각
  }, []);
  //팝업 창 ON / 시간 설정
  const handleOnWork = () => {
    setVisible(true);
    setDate(moment().format('YYYY/MM/DD'));
    setTime(moment().format('hh:mm'));
  };
  //팝업 창 OFF
  const handleOk = () => {
    setVisible(false);
  }
    //main
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{background:'dark'}}>
        <div>
        <LiveClock />
        </div>
        <Row>
            <Col span={12}><Button block onClick={handleOnWork}>출근</Button></Col>
            <Col span={12}><Button block>퇴근</Button></Col>
        </Row>
        <OnWork Visible={Visible} Date={Date} Time={Time} handleOk={handleOk} />
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
              <Link to="/employee" />
            </Menu.Item>
            <Menu.Item key="5">
              <span>마이 페이지</span>
              <Link to="/ckmypage" />
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
