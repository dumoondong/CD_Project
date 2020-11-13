import React,{ useState } from 'react';
import { Modal, Select,Input,Button } from 'antd';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

const { Option } = Select;

function ManageAdd(props){
  const dispatch = useDispatch(); //redux
  const [Visible, setVisible] = useState(false);
  const [Id, setId] = useState('')
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Zim, setZim] = useState('');
  const [Address, setAddress] = useState('');
  const [Des, setDes] = useState('');
  const [Dept, setDept] = useState('');
  const [Rank, setRank] = useState('');
//팝업 활성
  const showModal = () => {
    setVisible(true);
  };
//state 값
  const handleChangeId = (e) => {
    setId(e.currentTarget.value);
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
  const handleChangePhone = (e) => {
    setPhone(e.currentTarget.value);
  }
  const handleChangeZim = (e) => {
    setZim(e.currentTarget.value);
  }
  const handleChangeAddress = (e) => {
    setAddress(e.currentTarget.value);
  }
  const handleChangeDes = (e) => {
    setDes(e.currentTarget.value);
  }
  const handleDept = (value) => {
    console.log('부서 : ',value);
    setDept(value);
  }
  const handleRank = (value) => {
    console.log('직급 : ',value);
    setRank(value);
  }
//팝업 취소
  const handleCancel = () => {
    setVisible(false);
  };
//팝업 저장(유저 생성)
  const handleOk = () => {
    setVisible(false);

    let body = {
      id:Id,
      name:Name,
      password:Password,
      email:Email,
      phone:Phone,
      zim:Zim,
      address:Address,
      des:Des,
      dept:Dept,
      rank:Rank
    }

    dispatch(registerUser(body))
            .then(response => { 
                if(response.payload.registerSuccess){ 
                  window.location.reload();//전체 페이지를 리로드(실제 배포할 때는 리로드할 구역을 살정해야함)
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
      <div>부서</div>
      <Select defaultValue="(선택)" style={{ width: 160 }} onChange={handleDept}>
        <Option value="영업부">영업부</Option>
        <Option value="총리부">총리부</Option>
        <Option value="관리부">관리부</Option>
      </Select>
      <div>직급</div>
      <Select defaultValue="(선택)" style={{ width: 160 }} onChange={handleRank}>
        <Option value="과장">과장</Option>
        <Option value="사원">사원</Option>
        <Option value="사장">사장</Option>
      </Select>

      <div>사원번호</div>
      <Input 
        placeholder=""
        value={Id}
        onChange={handleChangeId}
      />
      <div>사원이름</div>
      <Input 
        placeholder=""
        value={Name}
        onChange={handleChangeName}
      />

      <div>비밀번호</div>
      <Input 
        placeholder=""
        value={Password}
        onChange={handleChangePassword}
      />

      <div>이메일</div>
      <Input 
        placeholder=""
        value={Email}
        onChange={handleChangeEmail}
      />

      <div>핸드폰번호</div>
      <Input 
        placeholder=""
        value={Phone}
        onChange={handleChangePhone}
      />

      <div>우편번호</div>
      <Input 
        placeholder=""
        value={Zim}
        onChange={handleChangeZim}
      />

      <div>주소</div>
      <Input 
        placeholder=""
        value={Address}
        onChange={handleChangeAddress}
      />

      <div>비고</div>
      <Input 
        placeholder="*NULL 가능"
        value={Des}
        onChange={handleChangeDes}
      />
      </Modal>
    </>
  );
}

export default ManageAdd