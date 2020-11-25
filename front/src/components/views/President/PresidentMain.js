import React, { useState, useEffect } from "react";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import LoginedUser from '../../../utils/LoginedUser';
import LogoutUser from '../../../utils/LogoutUser';
import SideBar from '../../../utils/SideBar';
import MainWork from '../Employee/MainPage/MainWork';

const { Header, Content } = Layout;

function PrezMain(props){

    return(
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <SideBar DefaultKey={'1'}/>
          <Layout>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
              <LoginedUser />
              <LogoutUser pageChange={props}/>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <MainWork />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
}

export default PrezMain