import React, { useState, useEffect } from "react";
import { Layout, Table, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarPresident';
import { prezHoliColumns }from './PrezHoliColumns';

    const { Header, Content } = Layout;

    const data = [
    {
        key: '1',
        name: '이름',
        type: '연차',
        start: '시작일',
        end: '종료일',
        nday: 'n',
        type: '연차',
        content: 'Null',
        confirm: 'Null',
    },
    ];

function PrezHoliConfirm(props) {


    const [CheckTarget, setCheckTarget] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setCheckTarget(selectedRows);
        }
    };

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
                <div>
                    <Table columns={prezHoliColumns} dataSource={data} rowSelection={rowSelection} pagination={false} />
                </div>
                <div>
                    <Button style = {{float: 'right'}} href = '/prezholi'>취소</Button>
                    <Button style = {{float: 'right'}} onClick = {showModal}>승인</Button>
                      <Modal
                        visible={Visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                      승인하시겠습니까?
                      </Modal>
                </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
}

export default PrezHoliConfirm