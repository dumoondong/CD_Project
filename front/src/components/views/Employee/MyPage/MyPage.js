import React, { useState, useEffect } from "react";
import {Layout, Menu, Button, Row, Col, Descriptions, Input, Modal} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import { Link } from "react-router-dom";
import SideBar from '../../../../utils/SideBar';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';

// 불러오는 곳
const { Header, Content, Sider, Footer } = Layout;

function MyPage(props) {
  const columns = [
    {
        title: '부서',
        dataIndex: '부서',
        key: '부서',
      },
      {
        title: '직급',
        dataIndex: '직급',
        key: '직급',
      },
      {
        title: '사원번호',
        dataIndex: '사원번호',
        key: '사원번호',
      },
      {
        title: '사원이름',
        dataIndex: '사원이름',
        key: '사원이름',
      },
      {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '핸드폰번호',
        dataIndex: '핸드폰번호',
        key: '핸드폰번호',
      },
      {
        title: '우편번호',
        dataIndex: '우편번호',
        key: '우편번호',
      },
      {
        title: '주소',
        dataIndex: '주소',
        key: '주소',
      },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/manage').then(response => {
      var temp = {};
      console.log(response.data);
      for(var i=0; i< response.data.length; i++) {
        temp = {
          key: String(i+1),
          부서: response.data[i].dept,
          직급: response.data[i].rank,
          사원번호: response.data[i].id,
          사원이름: response.data[i].name,
          email: response.data[i].email,
          핸드폰번호: response.data[i].phone,
          우편번호: response.data[i].zim,
          주소: response.data[i].address,
        };
        setData(data => [...data, temp]); //이전 값과 새로운 값을 더하여 새로운 값으로 반환
      }
    });
  }, []);

    //팝업
    const [Visible, setVisible] = useState(false);
    const showModal = () => {
      setVisible(true);
    };
    const handleCancel = () => {
      setVisible(false);
     };
    const handleOk = () => {
      setVisible(false);
    }


    return(
      <div>
        <Layout style={{ minHeight: '100vh' }}>
        <SideBar DefaultKey={'5'}/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
            {/* 로그인 시 유저 이름 및 로그아웃 */}
            <LoginedUser />
            <LogoutUser pageChange={props}/>
          </Header>
              
          <Content style={{ margin: '0', backgroundColor: 'white'}}>
            {/* 마이페이지 전체 div */}
            <div style = {{width: '700px', margin: '0px auto', backgroundColor: 'orange'}}>
                <div>
                    <h2 style = {{textAlign: "center"}}>개인정보</h2>
                </div>
                <div  style = {{display: "flex"}}>
                    <div style = {{margin: '0px auto'}}>
                        <Descriptions bordered style = {{width: 700}}>
                            <Descriptions.Item label="부서" span={3} style = {{textAlign: "center"}}>경리</Descriptions.Item>
                            <Descriptions.Item label="직급" span={3} style = {{textAlign: "center"}}>인턴</Descriptions.Item>
                            <Descriptions.Item label="사원번호" span={3} style = {{textAlign: "center"}}>12</Descriptions.Item>
                            <Descriptions.Item label="사원이름" span={3} style = {{textAlign: "center"}}>홍길이</Descriptions.Item>
                            <Descriptions.Item label="새로운 비밀번호" span={3} style = {{textAlign: "center"}}><Input.Password placeholder="새로운 비밀번호 입력"/></Descriptions.Item>
                            <Descriptions.Item label="새로운 비밀번호 확인" span={3} style = {{textAlign: "center"}}><Input.Password placeholder="새로운 비밀번호 확인"/></Descriptions.Item>
                            <Descriptions.Item label="이메일" span={3} style = {{textAlign: "center"}}>hallym@naver.com</Descriptions.Item>
                            <Descriptions.Item label="휴대폰 번호" span={3} style = {{textAlign: "center"}}>010-0101-0101</Descriptions.Item>
                            <Descriptions.Item label="우편번호" span={3} style = {{textAlign: "center"}}>12345</Descriptions.Item>
                            <Descriptions.Item label="주소" span={3} style = {{textAlign: "center"}}>춘천시</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                <div>
                    <Button style = {{float: 'right'}} href = '/ckmypage'>취소</Button>
                    <Button style = {{float: 'right'}} onClick = {showModal}>확인</Button>
                      <Modal
                        visible={Visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                      변경하시겠습니까?
                      </Modal>
                </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
    );
};

export default MyPage
