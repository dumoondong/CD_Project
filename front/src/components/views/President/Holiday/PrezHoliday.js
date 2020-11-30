import React, { useState, useEffect } from "react";
import { Layout, Button, Table} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarPresident';
import HolidayUserAdd from '../../Employee/HolidayUser/HolidayUserAdd';
import { HolidayColums } from '../../Employee/HolidayUser/HolidayUserColums';
import PrezHoliConfirm from './PrezHoliConfim';
import { Calendar, momentLocalizer } from 'react-big-calendar' //캘린더============
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import './Calendar.scss' //scss 재정의=============================================

const { Header, Content } = Layout;
const localizer = momentLocalizer(moment)

function PrezHoli(props){

  const [LeaveData, setLeaveData] = useState(''); //날짜 정보
  const [ListData, setListData] = useState([]); //휴일 정보

  useEffect(() => {         
    //휴일 데이터를 가져옴
    axios.get('/api/holidaydataread').then(response => {
      //console.log(response.data);
      setListData(response.data);
    });
    axios.get('/api/leavelist').then(response => {
      setLeaveData(response.data);
    });
}, []);
  
    const [Visible, setVisible] = useState(false);
    const [ConfirmVisible, ConfirmsetVisible] = useState(false);//confirm modal창 state
    //팝업 ON
    const showModal = () => {
        setVisible(true);
    };
    const showConfirm = () => {
      ConfirmsetVisible(true);
    };
    //팝업 OFF
    const handleCancel = () => {
        setVisible(false);
        ConfirmsetVisible(false);
    };
    //팝업 OFF 및 데이터 보내기
    const handleOk = () => {
        setVisible(false);
        ConfirmsetVisible(false);
    }
    //커스텀 툴바
    const CustomToolbar = (toolbar) => {
      //이전 달 버튼 이벤트
      const goToBack = () => {
        toolbar.date.setMonth(toolbar.date.getMonth() - 1);
        toolbar.onNavigate('prev');
      };
      //다음 달 버튼 이벤트
      const goToNext = () => {
        toolbar.date.setMonth(toolbar.date.getMonth() + 1);
        toolbar.onNavigate('next');
      };
      // Today버튼 이벤트
      const goToCurrent = () => {
        const now = new Date();
        toolbar.date.setMonth(now.getMonth());
        toolbar.date.setYear(now.getFullYear());
        toolbar.onNavigate('current');
      };
      //label ex)11 2020
      const label = () => {
        const date = moment(toolbar.date);
        return (
          <span><b>{date.format('MM')}</b><span style={{fontSize:'20px'}}> {date.format('YYYY')}</span></span>
        );
      };
    
      return (
        <div className={Calendar['toolbar-container']}>
          <label className={Calendar['label-date']} style={{fontSize:'30px'}}>{label()}</label>
    
          <div className={Calendar['back-next-buttons']}>
            <Button className={Calendar['btn-back']} onClick={goToBack}>&#8249;</Button>
            <Button className={Calendar['btn-current']} onClick={goToCurrent}>Today</Button>
            <Button className={Calendar['btn-next']} onClick={goToNext}>&#8250;</Button>
          </div>
        </div >
      );
    };
  //===========================================================================================================
    return(
        <div>
        <Layout style={{ minHeight: '100vh' }}>
          <SideBar DefaultKey={'2'}/>
          <Layout>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
              <LoginedUser />
              <LogoutUser pageChange={props}/>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              {/* 캘린더 */}
              <Calendar
                  localizer={localizer}
                  events={ListData}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 800,fontSize:'20px'}}
                  views={{month: true}}
                  components={{
                    toolbar: CustomToolbar,
                  }}
                />
              <Button style = {{float: 'right'}} onClick = {showModal}>연가신청</Button>
              <HolidayUserAdd Visible={Visible} handleCancel={handleCancel} handleOk={handleOk} />
              <Button style = {{float: 'right'}} onClick = {showConfirm}>연가승인</Button>
              <PrezHoliConfirm Visible={ConfirmVisible} handleCancel={handleCancel} handleOk={handleOk} />
              <div>
                <Table columns={HolidayColums} dataSource={LeaveData} pagination={false} />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
}

export default PrezHoli