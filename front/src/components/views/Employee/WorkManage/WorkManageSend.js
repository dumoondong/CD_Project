import React, { useState, useEffect } from "react";
import { Layout, Button, Table, Select, Input, Modal,DatePicker } from 'antd';
import { deptColums } from './WorkManageColumns';
import axios from 'axios';

const { Content } = Layout; //Layout부분을  Header , Content ,Sider, Footer로 나눠서 사용한다.
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const data = [
    {
        key: '1',
        id: '1111',
        name: '대표임'
    },{
        key: '2',
        id: '1113',
        name: '직원삼'
    }
];

function WorkManageSend() {
    const [CheckTarget, setCheckTarget] = useState(['']); //선택한 유저 값
    //선택 박스

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setCheckTarget(selectedRows);
        }
    };
    //검색에 들어가는 값
    const depts = ['영업부','경리부']
    //선택한 값
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    //모달창 변수
    const [Visible, setVisible] = useState(false);
    //팝업 ON
    const showModal = () => {
      setVisible(true);
    };
    //팝업 OFF
    const handleCancel = () => {
      setVisible(false);
     };
    //팝업 OFF, 데이터 보내기
    const handleOk = () => {
      setVisible(false);
      console.log('선택한 유저 :',CheckTarget);
      console.log('날짜 :',StartDate,EndDate);
      console.log('제목 :',Title);
      console.log('내용 :',Des);
      let body = {
          checkUsers : CheckTarget,
          StartDate,
          EndDate,
          Title,
          Des
      }
      //이제 보내서 저장하고 해당 유저는 있으면 보여줌.
      axios.post('/api/workmanagesave',body).then(response => {
          console.log(response.data);
          if(response.data === 'success'){
            alert('성공적으로 보냈습니다.');
            window.location.reload();
          } else {
            alert('Error');
          }
      });
    }
    //날짜 데이터 가져오기
    const [StartDate, setStartDate] = useState(''); //시작 날짜
    const [EndDate, setEndDate] = useState(''); //종료 날짜

    const handleDateChange = (value) => {
        //console.log(value[0].format('YYYY/MM/DD'));
        //console.log(value[1].format('YYYY/MM/DD'));
        setStartDate(value[0].format('YYYY/MM/DD'));
        setEndDate(value[1].format('YYYY/MM/DD'));
    }
    //제목 데이터 가져오기
    const [Title, setTitle] = useState('');

    const handleChangeTitle = (e) => {
        setTitle(e.currentTarget.value);
      }
    //내용 데이터 가져오기
    const [Des, setDes] = useState('');

    const handleChangeDes = (e) => {
        setDes(e.currentTarget.value);
    }
    return (
        <div>
            <Content style={{ margin: '0 auto', width: '1200px'}}>
                <div id = "wrap">
                    <div id = "left" style = {{float: "left", width: "25%"}}>
                        <div>
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
                    <div id = "right" style = {{float: "left", width: "64%", marginLeft: "12px"}}>
                        <div style = {{ display: "inline-block", width: "100%", height: "50%", marginTop: "7%"}}>
                            <div>
                                <div style = {{display: "inline-block", width: "10%", fontSize: "160%", textAlign: "center", backgroundColor: "orange"}}>
                                    날짜
                                </div>
                                <div style = {{display: "inline-block", width: "90%", textAlignLast:'center'}}>
                                    <RangePicker 
                                    size={'large'}
                                    style = {{width:'100%'}}
                                    onChange={handleDateChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <div style = {{display: "inline-block", width: "10%", fontSize: "160%", textAlign: "center", backgroundColor: "orange"}}>
                                    제목
                                </div>
                                <div style = {{display: "inline-block", width: "90%" }}>
                                    <Input style = {{fontSize: "140%"}} onChange={handleChangeTitle} />
                                </div>
                            </div>
                            <div>
                                <div style = {{display: "inline-block", width: "10%", fontSize: "160%", textAlign: "center", backgroundColor: "orange"}}>
                                    내용
                                </div>
                                <div>
                                    <TextArea rows={10}  onChange={handleChangeDes}/>
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