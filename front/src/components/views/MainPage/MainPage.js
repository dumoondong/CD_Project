import React from 'react'; //리액트
import { Layout } from 'antd'; //antd디자인
import 'antd/dist/antd.css'; //antd디자인 CSS
import LoginedUser from '../../../utils/LoginedUser'; ///utils 폴더
import LogoutUser from '../../../utils/LogoutUser';
import SideBar from '../../../utils/SideBar';///여기까지
import MainTable from './MainTable'; //주차 테이블

const { Header, Content } = Layout;

function MainPage(props) {
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar DefaultKey={'1'}/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
            <LoginedUser />
            <LogoutUser pageChange={props}/>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <MainTable />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainPage
