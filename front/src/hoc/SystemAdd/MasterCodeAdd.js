import React, {useState,useEffect} from 'react'
import { Modal, Select,Input,Button } from 'antd';
import { useDispatch } from 'react-redux';
import { LargeCodeInfo } from '../../_actions/holiday_action';
import axios from 'axios';

const { Option } = Select;

function MasterCodeAdd(props){
  const dispatch = useDispatch(); //redux
  const [Visible, setVisible] = useState(false); //팝업
  const [LargeInfo, setLargeInfo] = useState('');
  const [LargeCode, setLargeCode] = useState('');
//팝업 활성
  const showModal = () => {
    setVisible(true);
  };
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
  //대코드 종류 설정
  const [data, setData] = useState([]);
  useEffect(() => {         
    axios.get('/api/mastercode').then(response => {
      setData(response.data);
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
      <Button type="primary" onClick={showModal}>추가</Button>
      <Modal
        title="추가"
        visible={Visible}
        onOk={handleOk}
        onCancel={handleCancel}
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

export default MasterCodeAdd