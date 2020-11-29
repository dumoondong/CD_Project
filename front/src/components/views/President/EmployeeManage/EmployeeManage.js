import React, { useState,useEffect } from "react";
import { Layout, Button, Table, Select, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import SideBar from '../../../../utils/SideBarPresident';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import EmployeeManageInfo from "./EmployeeManageInfo";
import {EmployeeManageColum} from './EmployeeManageColums';
import moment from 'moment';
import axios from 'axios';

const { Header, Content } = Layout;
const { Option } = Select;

function EmployeeManage(props){
    const depts = ['영업부','경리부'] //검색창 부서선택 임시 값
    //검색창 선택한 부서 값
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    const [Visible, setVisible] = useState(false); //팝업 창 변수
    //클릭 시 월별 근무 조회
    const [UserData, setUserData] = useState('');
    const handleWorkInformation = (value) => {
      setUserData(value);
      setVisible(true);
    }
    //팝업 OFF
    const handleOk = () => {
      setVisible(false);
    }
    //팝업 OFF
    const handleCancel = () => {
      setVisible(false);
    }
    //직원근무조회
    const CurrentDate = useState(moment().format('YYYY/MM/DD')); //현재 날짜
    const [UserList, setUserList] = useState(['']);//직원근무조회 유저 데이터 변수
    const [SendDate, setSendDate] = useState(CurrentDate); //보낼 데이터
    //직원근무조회 유저 데이터 GET
    useEffect(() => {
      axios.post('/api/employeemanageuserlist',CurrentDate).then(response => {
        setUserList(response.data);
      });
    }, []);
    //데이터 피커 창에서 날짜 선택 시
    const handleChangeDate = (e) => {
      if(e != null){
        const SelectedDate = [e.format('YYYY/MM/DD')]; //선택한 날짜
        setSendDate(SelectedDate); //직원 리스트에서 직원 선택 시 보여줄 월
        axios.post('/api/employeemanageuserlist',SelectedDate).then(response => {
          setUserList(response.data);
        });
      }
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
                          defaultValue={moment(CurrentDate[0],'YYYY/MM/DD')}
                          format="YYYY/MM/DD"
                          style = {{width: "300px"}}/>
                      </div>
                  </div>
                  <div>
                      <Table columns={EmployeeManageColum} dataSource={UserList} pagination={false}
                        onRow={(record) => ({onClick: () => { handleWorkInformation(record) }})}/>
                      <EmployeeManageInfo Visible={Visible} UserData={UserData} handleOk={handleOk} handleCancel={handleCancel} CurrentDate={SendDate}/>
                  </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
}

export default EmployeeManage