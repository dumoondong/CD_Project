import React,{ useState } from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button,Select } from 'antd';

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
class ManageAdd extends React.Component {
  
  state = { visible: false };
  state = {
    id: ''
  }
  state = {
    name: ''
  }
  state = {
    password: ''
  }
  state = {
    email: ''
  }
  state = {
    phone: ''
  }
  state = {
    zim: ''
  }
  state = {
    address: ''
  }
  state = {
    des: ''
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          추가
        </Button>
        
        <Modal

          title="추가"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        
        <div>부서</div>
        <Select defaultValue="총리부" style={{ width: 160 }} onChange={handleChange}>
      <Option value="영업부">영업부</Option>
      <Option value="총리부">총리부</Option>
      <Option value="관리부">관리부</Option>
    </Select>
        <div>직급</div>
        <Select defaultValue="사원" style={{ width: 160 }} onChange={handleChange}>
      <Option value="과장">과장</Option>
      <Option value="사원">사원</Option>
      <Option value="사장">사장</Option>
    </Select>

        <div>사원번호</div>
        <input 
          placeholder=""
          value={this.state.id}
          onChange={this.handleChange}
        />
        <div>사원이름</div>
        <input 
          placeholder=""
          value={this.state.id}
          onChange={this.handleChange}
        />

        <div>비밀번호</div>
        <input 
          placeholder=""
          value={this.state.password}
          onChange={this.handleChange}
        />

        <div>이메일</div>
        <input 
          placeholder=""
          value={this.state.email}
          onChange={this.handleChange}
        />

        <div>핸드폰번호</div>
        <input 
          placeholder=""
          value={this.state.phone}
          onChange={this.handleChange}
        />

        <div>우편번호</div>
        <input 
          placeholder=""
          value={this.state.zim}
          onChange={this.handleChange}
        />

        <div>주소</div>
        <input 
          placeholder=""
          value={this.state.address}
          onChange={this.handleChange}
        />

        <div>비고</div>
        <input 
          placeholder="*NULL 가능"
          value={this.state.des}
          onChange={this.handleChange}
        />

        </Modal>
      </>
    );
  }
}

ReactDOM.render(<ManageAdd />, document.getElementById('root'));

export default ManageAdd