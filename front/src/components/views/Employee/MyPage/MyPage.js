import React, { useState, useEffect } from "react";
import {Layout, Button, Descriptions, Input} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import MyPageUpdate from './MyPageUpdate';
import '../../user.css';

// 불러오는 곳

const { Content } = Layout;

function MyPage() {
  const [User, setUser] = useState(['']);
  const [Password, setPassword] = useState('');//바꿀비밀번호
  const [CkPassword, setCkPassword] = useState('');//바꿀비밀번호확인

  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  }
  const handleChangeCkPassword = (e) => {
    setCkPassword(e.currentTarget.value);
  }
  useEffect(() => {
    console.log(Password);
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
      if(Password == CkPassword){
        let body = {
          Password : Password,
          UserPassword : User[0].password,
          id : User[0].id
        }
        axios.post('/api/mypagepasswordedit',body).then(response => {
          alert('비밀번호가 변경되었습니다');
          window.location.reload();
        });
      }else{
        alert('비밀번호가 일치하지 않습니다');
      }
    }
    const handleUpdateCancel = () => {
      window.location.reload();
    }
    
    return(
        <Content className = "mycontent">
          <div id = "mywrap">
              <h2>개인정보</h2>
              <Descriptions bordered style = {{width: 700}}>
                  <Descriptions.Item label="부서" span={3}>
                    {User[0].dept}
                  </Descriptions.Item>
                  <Descriptions.Item label="직급" span={3}>
                    {User[0].rank}
                  </Descriptions.Item>
                  <Descriptions.Item label="사원번호" span={3}>
                    {User[0].id}
                  </Descriptions.Item>
                  <Descriptions.Item label="사원이름" span={3}>
                    {User[0].name}
                  </Descriptions.Item>
                  <Descriptions.Item label="새로운 비밀번호" span={3}>
                    <Input.Password value={Password} onChange={handleChangePassword} placeholder="새로운 비밀번호 입력"/>
                  </Descriptions.Item>
                  <Descriptions.Item label="새로운 비밀번호 확인" span={3}>
                    <Input.Password value={CkPassword} onChange={handleChangeCkPassword} placeholder="새로운 비밀번호 확인"/>
                  </Descriptions.Item>
                  <Descriptions.Item label="이메일" span={3}>
                    {User[0].email}
                  </Descriptions.Item>
                  <Descriptions.Item label="휴대폰 번호" span={3}>
                    {User[0].phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="우편번호" span={3}>
                    {User[0].zim}
                  </Descriptions.Item>
                  <Descriptions.Item label="주소" span={3}>
                    {User[0].address}
                  </Descriptions.Item>
              </Descriptions>
              <div className = "btn">
                  <Button onClick= {handleUpdateCancel}>취소</Button>
                  <Button onClick = {showModal}>확인</Button>
                  <MyPageUpdate Visible={Visible} handleOk={handleOk} handleCancel={handleCancel}/>
              </div>
          </div>
        </Content>
    );
};

export default MyPage
