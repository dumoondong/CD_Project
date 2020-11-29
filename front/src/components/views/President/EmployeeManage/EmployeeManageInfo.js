import React from 'react'
import { Modal } from 'antd';
import EmployeeManageList from './EmployeeManageList';

function EmployeeManageInfo(props) {
    //console.log(props.UserData);
    //console.log(props.CurrentDate[0]); //ex)2020/11/28

    return (
        <Modal
            visible={props.Visible}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            width={1112}
            >
            <div>
                <EmployeeManageList UserData={props.UserData} CurrentDate={props.CurrentDate[0]} />
            </div>
        </Modal>
    )
}

export default EmployeeManageInfo