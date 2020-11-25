import React from 'react'; //리액트
import { Layout } from 'antd'; //antd디자인
import 'antd/dist/antd.css'; //antd디자인 CSS
import SideBar from '../../../../utils/SideBarPresident';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';

const { Header, Content } = Layout;

function EmployeeManage(props){
    return(
        <div>
        <Layout style={{ minHeight: '100vh' }}>
          <SideBar DefaultKey={'3'}/>
          <Layout>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
              <LoginedUser />
              <LogoutUser pageChange={props}/>
            </Header>
            <Content style={{ margin: '0 auto', width: '1200px'}}>
              직원근무조회 페이지 구성
            </Content>
          </Layout>
        </Layout>
      </div>
    );
}

export default EmployeeManage