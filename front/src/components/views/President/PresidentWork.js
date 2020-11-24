import React, { useState, useEffect } from "react";
import { Button, Table, Select, Layout} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import LoginedUser from '../../../utils/LoginedUser';
import LogoutUser from '../../../utils/LogoutUser';
import SideBar from '../../../utils/SideBar';

const { Option } = Select;
const { Header, Content, Sider, Footer } = Layout;
const deptName = ['영업부', '경리부'];

function PrezWork(props){
    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return(
        <div>
          <Layout style={{ minHeight: '100vh' }}>
            <SideBar DefaultKey={'3'}/>
            <Layout>
              <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
                <LoginedUser />
                <LogoutUser pageChange={props}/>
              </Header>
              <Content style={{ margin: '0 16px' }}>
                <div id = 'wrap'>
                    <div id = 'header'>
                        <div id = 'category'>
                            <div id = 'deptbox'>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={handleChange}
                                >
                                    <Option value = {deptName}></Option>
                                </Select>
                            </div>

                        </div>
                    </div>

                </div>
              </Content>
            </Layout>
          </Layout>
        </div>
    );
}

export default PrezWork