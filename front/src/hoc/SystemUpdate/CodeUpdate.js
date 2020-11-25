import React, {useState,useEffect} from 'react'
import { Modal, Select,Input,Button } from 'antd';
import { useDispatch } from 'react-redux';
import { SmallCodeInfo } from '../../_actions/holiday_action';
import axios from 'axios';

const { Option } = Select;

function CodeUpdate(props){
  const dispatch = useDispatch(); //redux
  const [SmallCode, setSmallCode] = useState('');
  const [SmallInfo, setSmallInfo] = useState('');
  const [SmallContent, setSmallContent] = useState('');

//state 값
  const handleChangeSmallCode = (e) => {
    setSmallCode(e.currentTarget.value);
  }
  const handleChangeSmallInfo = (e) => {
    setSmallInfo(e.currentTarget.value);
  }
  const handleChangeSmallContent= (e) => {
    setSmallContent(e.currentTarget.value);
  }

  const [SaveCode,setSaveCode] = useState(''); //대코드

   function onChange(value) {
    console.log(value);
    setSaveCode(value); //대코드
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
      setData(response.data);
    });
    }, []);

  
//팝업 저장(유저 생성)
  const handleOk = () => {
    props.handleOk();

    let body = {
      LargeCode:SaveCode,
      SmallCode:SmallCode,
      SmallInfo:SmallInfo,
      SmallContent:SmallContent,
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
       <Modal
        title="추가"
        visible={props.Visible}
        onOk={handleOk}
        onCancel={props.handleCancel}
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
         {data.map(code => (
          <Option key={code.LargeCode}>{code.LargeInfo}</Option>
        ))}
         </Select>
      

      <div>소코드</div>
      <Input 
        placeholder=""
        value={SmallCode}
        onChange={handleChangeSmallCode}
      />

      <div>코드정보</div>
      <Input 
        placeholder=""
        value={SmallInfo}
        onChange={handleChangeSmallInfo}
      />

      <div>비고</div>
      <Input 
        placeholder="NULL가능"
        value={SmallContent}
        onChange={handleChangeSmallContent}
      />

      </Modal>
    </>
  );
}

export default CodeUpdate