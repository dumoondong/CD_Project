import React, { useState, useEffect } from "react";
import {Layout, Button, Descriptions, Input} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import MyPageUpdate from './MyPageUpdate';
// 불러오는 곳
const { Content } = Layout;

function MyPage() {
  const [User, setUser] = useState(['']);

  useEffect(() => {
    axios.get('/api/mypage').then(response => {
      setUser(response.data);
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
        <Content style={{ margin: '0', backgroundColor: 'white'}}>
          <div style = {{width: '700px', margin: '0px auto', backgroundColor: 'orange'}}>
              <div>
                  <h2 style = {{textAlign: "center"}}>개인정보</h2>
              </div>
              <div  style = {{display: "flex"}}>
                  <div style = {{margin: '0px auto'}}>
                      <Descriptions bordered style = {{width: 700}}>
                          <Descriptions.Item label="부서" span={3} style = {{textAlign: "center"}}>
                            {User[0].dept}
                          </Descriptions.Item>
                          <Descriptions.Item label="직급" span={3} style = {{textAlign: "center"}}>
                            {User[0].rank}
                          </Descriptions.Item>
                          <Descriptions.Item label="사원번호" span={3} style = {{textAlign: "center"}}>
                            {User[0].id}
                          </Descriptions.Item>
                          <Descriptions.Item label="사원이름" span={3} style = {{textAlign: "center"}}>
                            {User[0].name}
                          </Descriptions.Item>
                          <Descriptions.Item label="새로운 비밀번호" span={3} style = {{textAlign: "center"}}>
                            <Input.Password placeholder="새로운 비밀번호 입력"/>
                          </Descriptions.Item>
                          <Descriptions.Item label="새로운 비밀번호 확인" span={3} style = {{textAlign: "center"}}>
                            <Input.Password placeholder="새로운 비밀번호 확인"/>
                          </Descriptions.Item>
                          <Descriptions.Item label="이메일" span={3} style = {{textAlign: "center"}}>
                            {User[0].email}
                          </Descriptions.Item>
                          <Descriptions.Item label="휴대폰 번호" span={3} style = {{textAlign: "center"}}>
                            {User[0].phone}
                          </Descriptions.Item>
                          <Descriptions.Item label="우편번호" span={3} style = {{textAlign: "center"}}>
                            {User[0].zim}
                          </Descriptions.Item>
                          <Descriptions.Item label="주소" span={3} style = {{textAlign: "center"}}>
                            {User[0].address}
                          </Descriptions.Item>
                      </Descriptions>
                  </div>
              </div>
              <div>
                  <Button style = {{float: 'right'}} href = '/mypage'>취소</Button>
                  <Button style = {{float: 'right'}} onClick = {showModal}>확인</Button>
                  <MyPageUpdate Visible={Visible} handleOk={handleOk} handleCancel={handleCancel}/>
              </div>
          </div>
        </Content>
    </div>
    );
};

export default MyPage
