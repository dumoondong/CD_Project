import React, { useState, useEffect } from "react";
import { Button, Table, Select, Layout} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {MainColumn} from './MainColumns'; //칼럼
import './MainPage.css';

const { Option } = Select;
const { Content } = Layout;
//인쇄 기능
const printDiv = () => {
  var initBody = document.body.innerHTML;

  window.onbeforeprint = function(){
    //document.title = LoginedUser;
    document.body.innerHTML = document.getElementById('printArea').innerHTML;
  }
  window.onafterprint = function(){
    document.body.innerHTML = initBody;
    window.location.reload();
  }
  window.print();
}

function MainWork(){
  const [data, setData] = useState([]); //근무 데이터
  const [WorkTimeSum, setWorkTimeSum] = useState(0);
  //나중엔 서버에서 작업해서 넘겨주는 방식으로 구현
  const years = ['2020','2019','2018','2017','2016'];
  const months = ['1','2','3','4','5','6','7','8','9','10','11','12']
  //근무 조회
  useEffect(() => {
    axios.get('/api/worklist').then(response => {
      //console.log(response.data);
      setData(response.data.workList);
      setWorkTimeSum(response.data.workTimeSum);
    });
  }, []);
  //선택한 년도,월로 데이터 바꾸기
  //변수
  const [selectedYear, setselectedYear] = useState('2020'); //년도
  const [selectedMonth, setselectedMonth] = useState('1'); //월
  //기능
  const ChangeYear = (value) => {
    //console.log(value);
    setselectedYear(value);
  }
  const ChangeMonth = (value) => {
    //console.log(value);
    setselectedMonth(value);
  }
  
  return(
  <>
    <Content>
      <div className = "wrap">
        <div className = "header">{/* 년 월 인쇄 통합 div */}
          <div className = "dateheader">
            <Select name = 'year' defaultValue="년도" onChange={ChangeYear} className = "selecty">
              {years.map(year => (
                <Option key={year}>{year}</Option>
              ))}
            </Select>
            <Select name = 'month' defaultValue="월" onChange={ChangeMonth} className = "selectm">
              {months.map(month => (
                <Option key={month}>{month}</Option>
              ))}
            </Select>
          </div>
          <div className = "printheader">
            <Button onClick = {printDiv}>인쇄</Button>
          </div>
        </div>
        <div id = "printArea" className = "print">
          <div className = "printtitle">
            <h2>{selectedYear}년 {selectedMonth}월 근무현황</h2>
          </div>

          <Table columns={MainColumn} dataSource={data} pagination={false} />

          <div className = "worktimeleft">
            근무시간합계
          </div>
          <div className = "worktimeright">
            {WorkTimeSum}
          </div>
          <div className = "worktimeleft">
            초과근무시간합계
          </div>
          <div className = "worktimeright">
            초과합
          </div>
        </div>
      </div>
    </Content>
  </>
  );
}

export default MainWork
