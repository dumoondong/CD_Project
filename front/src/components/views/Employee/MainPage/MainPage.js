import React from 'react'; //리액트
import { Layout } from 'antd'; //antd디자인
import 'antd/dist/antd.css'; //antd디자인 CSS
import LoginedUser from '../../../../utils/LoginedUser'; ///utils 폴더
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarEmployee';///여기까지
import MainWork from './MainWork'; //근무조회

const { Header, Content } = Layout;

function MainPage(props) {
  return (
    <div>
      <Layout>
        <SideBar DefaultKey={'1'}/>
        <Layout>
          <Header>
            <LoginedUser />
            <LogoutUser pageChange={props}/>
          </Header>
          <Content>
            <MainWork />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainPage
