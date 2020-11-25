import React, {useState,useEffect} from 'react'
import { Modal, Select,Input,Button } from 'antd';
import { useDispatch } from 'react-redux';
import { LargeCodeInfo } from '../../_actions/holiday_action';
import axios from 'axios';


function MasterCodeUpdate(props){
  const dispatch = useDispatch(); //redux
  const [LargeInfo, setLargeInfo] = useState('');
  const [LargeCode, setLargeCode] = useState('');

//state 값

  const handleChangeLargeCode = (e) => {
    setLargeCode(e.currentTarget.value);
  }
  const handleChangeLargeInfo = (e) => {
    setLargeInfo(e.currentTarget.value);
  }



   function onChange(value) {
    console.log(value);
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

  //  const handleSave = () => {
  //   axios.post('/api/MasterCodeupdate', CheckTarget).then(res =>{
  //     if(res.data.success){
  //     alert('수정되었습니다.');
  //     window.location.reload();
  //      }
  //    })
  //   }
//팝업 저장(유저 생성)
  const handleOk = () => {

    let body = {
      LargeCode:LargeCode,
      LargeInfo:LargeInfo,
    }

    dispatch(LargeCodeInfo(body))
            .then(response => { 
                if(response.payload.largecodeSaveSuccess){ 
                  window.location.reload();//전체 페이지를 리로드(실제 배포할 때는 리로드할 구역을 살정해야함)
                  alert('Success!',);
                  console.log(response.payload.largecodeSaveSuccess);
                }
                else {
                  alert('Failed to sign up...');
                }
            }) 
          }

  return (
    <>
      <Modal
        title="수정"
        visible={props.Visible}
        onOk={handleOk}
        onCancel={props.handleCancel}
      >
      <div>대코드</div>
      <Input 
        placeholder=""
        value={LargeCode}
        onChange={handleChangeLargeCode}
      />

      <div>대코드정보</div>
      <Input 
        placeholder=""
        value={LargeInfo}
        onChange={handleChangeLargeInfo}
      />

      </Modal>
    </>
  );
}

export default MasterCodeUpdate