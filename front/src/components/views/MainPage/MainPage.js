import React, {useState, useEffect} from 'react';
import { DatePicker, message, Layout, Menu, Breadcrumb, Button, Row, Col, Modal} from 'antd';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import LiveClock from './LiveClock';
import MainTable from './MainTable';
import LoginedUser from '../../../utils/LoginedUser';
import LogoutUser from '../../../utils/LogoutUser';
import {onWorkUser} from '../../../_actions/user_action';


const { Header, Content, Sider, Footer } = Layout;

function MainPage(props) {
  const dispatch = useDispatch();
  //const mainProps = props;
  const [Picker, setPicker] = useState(''); //날짜 데이터
  //state 값을 조건에 따라 변경하는 함수
  const handleChange = value => {
      message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
      setPicker(value);
  };

  //출근 버튼 부분
 // const [userID, setuserID] = useState('');
  const [Date, setDate] = useState('');
  const [Time, setTime] = useState('');
  const [Visible, setVisible] = useState(false);

  useEffect(() => {
    setDate(moment().format('YYYY/MM/DD')); //현재 날짜
    setTime(moment().format('hh:mm'));//현재 시각
  }, []);
  //팝업 창  
  const handleOnWork = () => {
    setVisible(true);
    setDate(moment().format('YYYY/MM/DD'));
    setTime(moment().format('hh:mm'));
  };
  //확인 창
  const handleOk = () => {
    setVisible(false);
  }
  //체크 시 출근
  const handleCheck = () =>{
    let body ={ //보낼 값
      date:Date,
      time:Time
    }
    dispatch(onWorkUser(body))
            .then(response => { 
                if(response.payload.success){ 
                  console.log(response.payload);
                }
                else {
                  alert('Failed...');
                }
            }) 
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
            <Col span={12}><Button block onClick={handleOnWork}>출근</Button></Col>
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
