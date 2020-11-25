import React, { useState, useEffect } from "react";
import { Button, Table, Select, Layout} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {MainColumns} from './MainTable'; //칼럼

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

function MainTable(){
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
    <Content style={{ margin: '0' }}>
      <div style = {{margin: '0 auto', width: '1000px'}}>
        <div style = {{marginBottom: '20px'}}>{/* 년 월 인쇄 통합 div */}
          <div style = {{display: 'inline-block', marginLeft: '44%'}}>
            <Select name = 'year' defaultValue="년도" style={{ width: 80 }} onChange={ChangeYear} >
              {years.map(year => (
                <Option key={year}>{year}</Option>
              ))}
            </Select>
            <Select name = 'month' defaultValue="월" style={{ width: 60 }} onChange={ChangeMonth} >
              {months.map(month => (
                <Option key={month}>{month}</Option>
              ))}
            </Select>
          </div>
          <div style = {{display: 'inline-block', float: 'right'}}>
            <Button onClick = {printDiv}>인쇄</Button>
          </div>
        </div>
        <div id = "printArea">
          <div style = {{width:'1000px', margin: '0 auto'}}>
            <div style = {{display: 'inline-block', marginLeft: '40%', textAlign: 'center'}}>
                <h2>{selectedYear}년 {selectedMonth}월 근무현황</h2>
            </div>
          </div>

          <Table columns={MainColumns} dataSource={data} pagination={false} />

          <div style = {{ textAlign: 'center'}}>
            <div style = {{display: 'inline-block', width: '40%', backgroundColor: 'orange'}}>
              근무시간합계
            </div>
            <div style = {{display: 'inline-block', width: '10%', backgroundColor: 'white'}}>
              {WorkTimeSum}
            </div>
            <div style = {{display: 'inline-block', width: '40%', backgroundColor: 'orange'}}>
              초과근무시간합계
            </div>
            <div style = {{display: 'inline-block', width: '10%', backgroundColor: 'white'}}>
              초과합
            </div>
          </div>
        </div>
      </div>
    </Content>
  </>
  );
}

export default MainTable
