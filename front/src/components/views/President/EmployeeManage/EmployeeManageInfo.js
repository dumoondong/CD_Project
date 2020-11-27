import React from 'react'
import { Modal } from 'antd';
import EmployeeManageList from './EmployeeManageList';

function EmployeeManageInfo(props) {
    console.log(props.UserData);
    return (
        <Modal
            visible={props.Visible}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            width={1112}
            >
            <div>
                <EmployeeManageList />
            </div>
        </Modal>
    )
}

export default EmployeeManageInfo