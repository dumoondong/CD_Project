import React, {useState,useEffect} from 'react'
import { Select, Modal, Alert, Input} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { holidayInfo } from '../../_actions/holiday_action';
import moment from 'moment'

const { Option } = Select;
const { TextArea } = Input;

function HolidayAdd(props) {
  const dispatch = useDispatch(); //redux
  //휴일종류 선택
  const [SaveCode,setSaveCode] = useState(''); //소코드
  //주석 필요
  const onChange = (value) => {
        for(var i=0; i< data.length; i++) {
          if(data[i].SmallInfo === value)  {  
            setSaveCode(data[i].SmallCode);       
          }
        }
  }
  //주석 필요
  const onBlur = () => {
    console.log('blur');
  }
  //주석 필요
  const onFocus = () => {
    console.log('focus');
  }
  //주석 필요
  const onSearch = (val) => {
    console.log('search:', val);
  }
    //휴일 종류 설정
  const [data, setData] = useState([]);//스몰코드,스몰코드 정보 리스트
  const [Opt, setOpt] = useState([]);//스몰코드 정보 리스트

  useEffect(() => {         
    axios.get('/api/smallcode').then(response => {
      var temp = {};
      for(var i=0; i< response.data.length; i++) {
        temp = {
          SmallCode: response.data[i].SmallCode,
          SmallInfo: response.data[i].SmallInfo
        };
        setData(data => [...data, temp]);// 이전값에 temp값 합쳐서 저장
        setOpt(Opt => [...Opt,response.data[i].SmallInfo]);//스몰코드 정보 저장
      }
    });
  }, []);
    //비고 변수 초기화
    const [HoliContent,setHoliContent] =useState(); 
    //비고 설정
    const handleChangeHoliContent = (e) => { 
      setHoliContent(e.currentTarget.value);
    }
    //modal OK 버튼 기능(휴일 생성)
    const handleOk = () => {
      props.handleOk();
  
      let body = {
        StartDate:props.StartDate, //날짜
        SaveCode:SaveCode, //소코드
        HoliContent:HoliContent, //비고
      }
      dispatch(holidayInfo(body))
              .then(response => { 
                  if(response.payload.holidaySaveSuccess){ 
                    alert('Success!',);
                    console.log(response.payload.holidaySaveSuccess);
                    window.location.reload();//전체 페이지를 리로드(실제 배포할 때는 리로드할 구역을 살정해야함)
                  }
                  else {
                    alert('Failed to sign up...');
                  }
              }) 
      }
    return (
        <>
        <Modal
          title="휴일설정"
          visible={props.Visible}
          onOk={handleOk}
          onCancel={props.handleCancel}
        >
          <div style = {{fontSize: 15,background: '#fff'}}>날짜
          <Alert style={{ background: '#fff'}} message={moment(props.StartDate).format('YYYY/MM/DD')}/>
          </div>
          <div style = {{fontSize: 15,background: '#fff'}}>휴일종류</div>
         
          <Select showSearch style={{ width: 472 }} placeholder="휴일 지정"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
          option.toLowerCase().indexOf(input.toLowerCase()) >= 0
           }
           >
         {Opt.map(SmallInfo => (
          <Option key={SmallInfo}>{SmallInfo}</Option>
        ))}
         </Select>
         <div style = {{fontSize: 15,background: '#fff'}}>비고</div>
          <TextArea  
          rows={8} 
          value={HoliContent}
          onChange={handleChangeHoliContent}
          />
        </Modal>
        </>
    );
}

export default HolidayAdd

