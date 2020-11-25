import React, { useState } from "react";
import 'antd/dist/antd.css'; //antd디자인 CSS
import { Layout, Button, Table } from 'antd';
import LoginedUser from '../../../../utils/LoginedUser';////utils
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarEmployee';///여기까지
import { workManageColumn } from './WorkManageColumns'; //업무 칼럼
import WorkManageSend from './WorkManageSend'; //업무지시 페이지
import WorkManageInfo from './WorkManageInfo';

//칼럼
const { Header, Content } = Layout; //Layout부분을  Header , Content ,Sider, Footer로 나눠서 사용한다.

  const data = [
     {
       key: '1',
       Date: 'YYYY/MM/DD',
       User: '홍길오',
       Title: '업무지시',
       Dsc: 'Content',
     },
     {
      key: '2',
      Date: 'YYYY/MM/DD',
      User: '홍길삼',
      Title: '업무지시',
      Dsc: 'Content',
    }
  ];
  
  function WorkManage(props) {
    const [SendShow, setSendShow] = useState(false); //스위치버튼

    //업무조회
    const handleListShow = (e) => {
      console.log(e);
      setSendShow(false);
    }
    //업무요구
    const handleSendShow = (e) => {
      console.log(e);
      setSendShow(true);
    }
    //업무 상세보기
    const handleInformation = (value) => {
      console.log(value);
    }
    
      return (
        <div>
          <Layout style={{ minHeight: '100vh' }}>
            <SideBar DefaultKey={'3'}/>
            <Layout>
              <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
                <LoginedUser />
                <LogoutUser pageChange={props}/>
              </Header>
              <Content style={{ margin: '0 auto', width: '1200px'}}>
                <Button onClick={handleListShow}>업무조회</Button>  
                <Button onClick={handleSendShow}>업무요구</Button> 
                {SendShow ? <WorkManageSend /> : <Table columns={workManageColumn} dataSource={data} pagination={false} 
                onRow={(record) => ({onClick: () => { handleInformation(record); }})} />}
              </Content>
            </Layout>
          </Layout>
        </div>
);
}

export default WorkManage