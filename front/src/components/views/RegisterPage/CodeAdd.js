import React,{ useState } from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button,Select } from 'antd';

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}

class CodeAdd extends React.Component {
  
  state = { visible: false };
  
  state = {
    id: ''
  }
  state = {
    infor: ''
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
        
        <div>대코드</div>
        <Select defaultValue="CP" style={{ width: 160 }} onChange={handleChange}>
      <Option value="CP">CP</Option>
      <Option value="SP">SP</Option>
      <Option value="DP">DP</Option>
    </Select>
        
        <div>소코드</div>
        <input 
          placeholder=""
          value={this.state.id}
          onChange={this.handleChange}
        />
        <div>코드정보</div>
        <input 
          placeholder=""
          value={this.state.infor}
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

ReactDOM.render(<CodeAdd />, document.getElementById('root'));

export default CodeAdd