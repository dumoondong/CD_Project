import React, { useState, useEffect } from "react";
import { Button, Table, Layout} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarPresident';
import { workManageColumn } from '../../Employee/WorkManage/WorkManageColumns'; //업무 칼럼
import WorkManageSend from '../../Employee/WorkManage/WorkManageSend'; //업무지시 페이지
import WorkManageInfo from '../../Employee/WorkManage/WorkManageInfo';

const { Header, Content } = Layout; //Layout부분을  Header , Content ,Sider, Footer로 나눠서 사용한다.

function PrezWorkManage(props){
  const [SendShow, setSendShow] = useState(false); //스위치버튼

    //업무조회 페이지로
    const handleListShow = (e) => {
      //console.log(e);
      setSendShow(false);
    }
    //업무지시 페이지로
    const handleSendShow = (e) => {
      console.log(e);
      setSendShow(true);
    }
    //업무 상세보기
    const [Visible, setVisible] = useState(false);
    const [UserData, setUserData] = useState(['']);

    const handleInformation = (value) => {
      //console.log(value);
      setUserData(value);
      setVisible(true);
    }

    const handleOk = () => {
      setVisible(false);
    }

    const handleCancel = () => {
      setVisible(false);
    }
    //업무 조회 데이터 가져오기
    const [Data, setData] = useState(['']);

    useEffect(() => {
      axios.get('/api/workmanageread').then(response => {
        console.log(response.data);
        setData(response.data);
      }); 
    }, []);

    return(
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <SideBar DefaultKey={'4'}/>
          <Layout>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
              <LoginedUser />
              <LogoutUser pageChange={props}/>
            </Header>
            <Content style={{ margin: '0 auto', width: '100%'}}>
                <Button onClick={handleListShow}>업무조회</Button>  
                <Button onClick={handleSendShow}>업무지시</Button> 
                {SendShow ? <WorkManageSend /> : <Table columns={workManageColumn} dataSource={Data} pagination={false} 
                onRow={(record) => ({onClick: () => { handleInformation(record); }})} />}
                <WorkManageInfo Visible={Visible} UserData={UserData} handleOk={handleOk} handleCancel={handleCancel} />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
}

export default PrezWorkManage