import React, {useState,useEffect} from 'react'
import { Modal, Select,Input,Button } from 'antd';
import { useDispatch } from 'react-redux';
import { SmallCodeInfo } from '../../../_actions/holiday_action';
import axios from 'axios';

const { Option } = Select;

function CodeAdd(props){
  const dispatch = useDispatch(); //redux
  const [Visible, setVisible] = useState(false); //팝업
  const [LargeCode, setLargeCode] = useState('')
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Dept, setDept] = useState('');

//팝업 활성
  const showModal = () => {
    setVisible(true);
  };
//state 값
  const handleChangeLargeCode = (e) => {
    setLargeCode(e.currentTarget.value);
  }
  const handleChangeName = (e) => {
    setName(e.currentTarget.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  }
  const handleChangeEmail= (e) => {
    setEmail(e.currentTarget.value);
  }
  const handleDept = (value) => {
    console.log('부서 : ',value);
    setDept(value);
  }
   //대코드 종류 선택
   function onChange(value) {
    console.log(`selected ${value}`);
  }
   function onBlur() {
     console.log('blur');
   }
   
   function onFocus() {
     console.log('focus');
   }
   
   function onSearch(val) {
     console.log('search:', val);
   }
  //대코드 종류 설정
  const [data, setData] = useState([]);

  useEffect(() => {         
    axios.get('/api/mastercode').then(response => {
      var temp = {};
      for(var i=0; i< response.data.length; i++) {
        temp = {
          MasterCode: response.data[i].MasterCode,
        };
        setData(data => [...data, temp]);     // 이전값에 temp값 합쳐서 저장
       
      }
    });
}, []);

//팝업 취소
  const handleCancel = () => {
    setVisible(false);
  };
//팝업 저장(유저 생성)
  const handleOk = () => {
    setVisible(false);

    let body = {
      LargeCode:LargeCode,
      name:Name,
      password:Password,
      email:Email,
      dept:Dept,
    }

    dispatch(SmallCodeInfo(body))
            .then(response => { 
                if(response.payload.smallcodeSaveSuccess){ 
                  window.location.reload();//전체 페이지를 리로드(실제 배포할 때는 리로드할 구역을 살정해야함)
                  alert('Success!',);
                  console.log(response.payload.smallcodeSaveSuccess);
                }
                else {
                  alert('Failed to sign up...');
                }
            }) 
          }

  return (
    <>
      <Button type="primary" onClick={showModal}>추가</Button>
      <Modal
        title="추가"
        visible={Visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      <div>대코드</div>
      <Select showSearch style={{ width: 472 }} placeholder="마스터코드 지정"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
           }
           >
         {data.map(MasterCode => (
          <Option key={MasterCode}>{MasterCode}</Option>
        ))}
         </Select>
      

      <div>대코드</div>
      <Input 
        placeholder=""
        value={LargeCode}
        onChange={handleChangeLargeCode}
      />
      <div>소코드</div>
      <Input 
        placeholder=""
        value={Name}
        onChange={handleChangeName}
      />

      <div>코드정보</div>
      <Input 
        placeholder=""
        value={Password}
        onChange={handleChangePassword}
      />

      <div>비고</div>
      <Input 
        placeholder=""
        value={Email}
        onChange={handleChangeEmail}
      />

      </Modal>
    </>
  );
}

export default CodeAdd