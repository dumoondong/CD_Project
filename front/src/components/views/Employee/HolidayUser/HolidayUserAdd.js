import React from 'react'
import { Modal, Descriptions, Input, Select, DatePicker} from 'antd';

const { Option } = Select; //선택한 옵션 기능
const { RangePicker } = DatePicker; //날짜 시작 - 날짜 종료 기능

function HolidayUserAdd(props) {
    //선택한 연가 값
    const handleChange = (value) => {
        console.log(value);
      }
    return (
        <>
           <Modal
            title="휴일설정"
            visible={props.Visible}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            width={750}
            >
                <div>
                    <Descriptions bordered style = {{width: 700}}>
                    <Descriptions.Item label="날짜" span={3} style = {{textAlign: "center"}}><RangePicker /></Descriptions.Item>
                    <Descriptions.Item label="연가종류" span={3} style = {{textAlign: "center"}}>
                        <Select defaultValue="연가선택" style={{ width: 450 }} onChange={handleChange}>
                        <Option value="연가">연가</Option>
                        <Option value="병가">병가</Option>
                        <Option value="공가">공가</Option>
                        <Option value="특별휴가">특별휴가</Option>
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="연가내용" span={3} style = {{textAlign: "center"}}><Input style={{ width: 450 }}/></Descriptions.Item>
                    </Descriptions>
                </div>
            </Modal> 
        </>
    )
}

export default HolidayUserAdd
