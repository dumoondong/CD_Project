import React, { useState } from "react";
import { Layout, Button, Table, Select, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import SideBar from '../../../../utils/SideBarPresident';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import EmployeeManageInfo from "./EmployeeManageInfo";
import moment from 'moment';

const data = [
  {
      key: '1',
      name: '이름출력',
      dept: '부서출력',
      rank: '직급출력',
      start: '근무시작',
      end: '근무종료',
      time: '근무시간'
  },
];
const deptColums = [
  {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
  },
  {
      title: '부서',
      dataIndex: 'dept',
      key: 'dept',
  },
  {
    title: '직급',
    dataIndex: 'rank',
    key: 'rank',
},
{
    title: '근무시작',
    dataIndex: 'start',
    key: 'start',
},
{
  title: '근무종료',
  dataIndex: 'end',
  key: 'end',
},
{
  title: '근무시간',
  dataIndex: 'time',
  key: 'time',
},
];

const { Header, Content } = Layout;
const { Option } = Select;

function EmployeeManage(props){

    const depts = ['영업부','경리부']

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    function onChange(date, dateString) {
      console.log(date, dateString);
    }

    const [Visible, setVisible] = useState(false);
    const [UserData, setUserData] = useState(['']);

    const handleInformation = (value) => {
      setUserData(value);
      setVisible(true);
    }

    const handleOk = () => {
      setVisible(false);
    }

    const handleCancel = () => {
      setVisible(false);
    }
    //현재 날짜
    const CurrentTime = useState(moment().format('YYYY/MM/DD')); //현재 날짜
    const [ChangeDate,setChangeDate] = useState(CurrentTime[0]);
    //날짜 변경
    const handleChangeDate = (e) => {
      //console.log(e.format('YYYY/MM/DD'));
      setChangeDate(e.format('YYYY/MM/DD'));
      console.log(ChangeDate);
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
            <Content style={{ margin: '0 auto', width: '100%'}}>
              <div>
                  <div>
                      <div style = {{display: "inline-block"}}>
                          <Button disabled style = {{backgroundColor: "orange", color: "black"}}>부서선택</Button> 
                      </div>
                      <div style = {{display: "inline-block"}}>
                          <Select name = 'dept' defaultValue="부서" onChange={handleChange} style = {{width: "88px"}}>
                              {depts.map(dept => (<Option key={dept}>{dept}</Option>))}
                          </Select>
                      </div>
                      <div style = {{display: "inline-block", marginLeft: "20%"}}>
                        <DatePicker 
                          onChange={handleChangeDate} 
                          defaultValue={moment(CurrentTime[0],'YYYY/MM/DD')}
                          format="YYYY/MM/DD"
                          style = {{width: "300px"}}/>
                      </div>
                  </div>
                  <div>
                      <Table columns={deptColums} dataSource={data} pagination={false}
                        onRow={(record) => ({onClick: () => { handleInformation(record) }})}/>
                      <EmployeeManageInfo Visible={Visible} UserData={UserData} handleOk={handleOk} handleCancel={handleCancel} />
                  </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
}

export default EmployeeManage