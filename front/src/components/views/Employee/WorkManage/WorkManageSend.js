import React from 'react'
import { Layout, Button, Table, Select } from 'antd';
// import LoginedUser from '../../../../utils/LoginedUser';////utils
// import LogoutUser from '../../../../utils/LogoutUser';
// import SideBar from '../../../../utils/SideBar';///여기까지
import { workManageColumn } from './WorkManageColumns';

const { Content } = Layout; //Layout부분을  Header , Content ,Sider, Footer로 나눠서 사용한다.
const { Option } = Select;

const data = [
    {
      key: '1',
      Date: 'YYYY/MM/DD',
      User: '홍길이',
      Title: '업무요구',
     Dsc: 'Content',
      Check: 'Check',
    },
 ];

function WorkManageSend(props) {
    return (
        <div>
            <Content style={{ margin: '0 auto', width: '1200px'}}>
            <Table columns={workManageColumn} dataSource={data} pagination={false} />
            </Content>
        </div>
    )
}

export default WorkManageSend
