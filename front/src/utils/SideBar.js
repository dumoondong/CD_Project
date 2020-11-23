import React, {useState, useEffect} from 'react'; //리액트
import { Layout, Menu, Button, Row, Col} from 'antd'; //antd디자인
import OnWork from './OnWork';
import { Link } from "react-router-dom"; //라우터
import LiveClock from './LiveClock'; //시계
import moment from 'moment'; //시간과 날짜

const { Sider } = Layout;

function SideBar(props) {
      ////////////////////////////////////////////////////////출근 버튼 연동
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
  ////////////////////////////////////////////////////////출근 버튼 연동

    return (
        <>
          <Sider style={{background:'dark'}}>
            <div>
            <LiveClock />
            </div>
            <Row>
                <Col span={12}><Button block onClick={handleOnWork}>출근</Button></Col>
                <Col span={12}><Button block>퇴근</Button></Col>
            </Row>
            <OnWork Visible={Visible} Date={Date} Time={Time} handleOk={handleOk} />
              <Menu theme="dark" defaultSelectedKeys={props.DefaultKey} mode="inline">
                <Menu.Item key="1" >
                  <span>홈 바로가기</span>
                  <Link to="/main" />
                </Menu.Item>
                <Menu.Item key="2" >
                  <span>연가</span>
                  <Link to="/outWork" />
                </Menu.Item>
                <Menu.Item key="3" >
                  <span>근무조회</span>
                  <Link to="/middle" />
                </Menu.Item>
                <Menu.Item key="4" >
                  <span>업무지시 및 조회</span>
                  <Link to="/employee" />
                </Menu.Item>
                <Menu.Item key="5" >
                  <span>마이 페이지</span>
                  <Link to="/ckmypage" />
                </Menu.Item>
              </Menu>
          </Sider>
        </>
    )
}

export default SideBar
