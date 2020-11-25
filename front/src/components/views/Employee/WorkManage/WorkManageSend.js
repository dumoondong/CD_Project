import React, { useState, useEffect } from "react";
import { Layout, Button, Table, Select, Input, Modal } from 'antd';
// import LoginedUser from '../../../../utils/LoginedUser';////utils
// import LogoutUser from '../../../../utils/LogoutUser';
// import SideBar from '../../../../utils/SideBar';///여기까지
import { workManageColumn } from './WorkManageColumns';

const { Content } = Layout; //Layout부분을  Header , Content ,Sider, Footer로 나눠서 사용한다.
const { Option } = Select;
const { TextArea } = Input;

const data = [
    {
        key: '1',
        id: '12345',
        name: '이름임'
    },
];
const deptColums = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '직원',
        dataIndex: 'name',
        key: 'name',
    },
    
];

function WorkManageSend() {
    const [CheckTarget, setCheckTarget] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setCheckTarget(selectedRows);
        }
    };

    const depts = ['영업부','경리부']

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const [Visible, setVisible] = useState(false);

    const showModal = () => {
      setVisible(true);
    };
    const handleCancel = () => {
      setVisible(false);
     };
    const handleOk = () => {
      setVisible(false);
    }

    return (
        <div>
            <Content style={{ margin: '0 auto', width: '1200px'}}>
                <div id = "wrap">
                    <div id = "left" style = {{float: "left", width: "25%"}}>
                        <div style = {{height: "32px"}}>
                            <div style = {{display: "inline-block"}}>
                                <Button disabled style = {{backgroundColor: "orange", color: "black"}}>부서선택</Button> 
                            </div>
                            <div style = {{display: "inline-block"}}>
                                <Select name = 'dept' defaultValue="부서" onChange={handleChange} style = {{width: "88px"}}>
                                    {depts.map(dept => (<Option key={dept}>{dept}</Option>))}
                                </Select>
                            </div>
                        </div>
                        <div style = {{marginTop: "11%"}}>
                            <div style = {{fontSize: "160%", textAlign: "center", backgroundColor: "orange"}}>
                                직원리스트
                            </div>
                            <Table columns={deptColums} dataSource={data} rowSelection={rowSelection} pagination={false} />
                        </div>
                    </div>
                    <div id = "right" style = {{float: "left", width: "74%", marginLeft: "12px"}}>
                        <div style = {{ display: "inline-block", width: "100%", height: "50%", marginTop: "7%"}}>
                            <div>
                                <div style = {{display: "inline-block", width: "10%", fontSize: "160%", textAlign: "center", backgroundColor: "orange"}}>
                                    날짜
                                </div>
                                <div style = {{display: "inline-block", width: "90%"}}>
                                    <Input style = {{fontSize: "140%"}}></Input>
                                </div>
                            </div>
                            <div>
                                <div style = {{display: "inline-block", width: "10%", fontSize: "160%", textAlign: "center", backgroundColor: "orange"}}>
                                    제목
                                </div>
                                <div style = {{display: "inline-block", width: "90%" }}>
                                    <Input style = {{fontSize: "140%"}}></Input>
                                </div>
                            </div>
                            <div>
                                <div style = {{display: "inline-block", width: "10%", fontSize: "160%", textAlign: "center", backgroundColor: "orange"}}>
                                    내용
                                </div>
                                <div>
                                    <TextArea rows={10} />
                                    <Button style = {{float: "right"}} onClick = {showModal}>보내기</Button>
                                    <Modal
                                        visible={Visible}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                    >
                                        보내시겠습니까?
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </div>
    )
}

export default WorkManageSend