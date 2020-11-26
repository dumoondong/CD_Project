import React from 'react'
import { Modal } from 'antd';
import MainWork from '../../Employee/MainPage/MainWork';

function EmployeeManageInfo(props) {

    return (
        <>
            <Modal
                visible={props.Visible}
                onOk={props.handleOk}
                onCancel={props.handleCancel}
                width={1500}
                >
                <div>
                    <MainWork />
                </div>
            </Modal>
        </>
    )
}

export default EmployeeManageInfo