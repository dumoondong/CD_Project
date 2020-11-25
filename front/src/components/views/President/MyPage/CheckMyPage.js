import React from "react";
import {Layout, Menu, Breadcrumb, PageHeader,Button, Row, Col} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import { Link } from 'react-router-dom';
import SideBar from '../../../../utils/SideBarPresident';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';

const { Header, Content, Sider, Footer } = Layout;

function PrezCheckMyPage(props) {
   
    return (
        <div>
        <Layout style={{ minHeight: '100vh' }}>
        <SideBar DefaultKey={'4'}/>
        <Layout>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
                {/* 로그인 시 유저 이름 및 로그아웃 */}
                <LoginedUser />
                <LogoutUser pageChange={props}/>
            </Header>
              
            <Content style={{ margin: '0', backgroundColor: 'white'}}>
                <Breadcrumb style = {{background: '#fff', minHeight: 100}}>
                    <Breadcrumb.Item>
                        <PageHeader
                            title="개인정보변경">   
                        </PageHeader>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <div style={{width: '380px', height: '400px', margin: '0 auto'}}>
                    <div style = {{marginBottom: '20px'}}>
                        <h2 style = {{textAlign: "center"}}>본인확인</h2>
                    </div>
                    <div style = {{display: 'inline-block'}}>
                        현재 비밀번호 : 
                    </div>
                    <div style = {{display: 'inline-block', margin: '0 10px'}}>
                        <input type = "password" style={{ width:"200px" }}/>
                    </div>
                    <div style = {{display: 'inline-block'}}>
                        <Button href = '/mypage'>확인</Button>
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
}

export default PrezCheckMyPage