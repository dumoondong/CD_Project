import React from 'react'
import { Modal } from 'antd';

function WorkManageInfo(props) {
    return (
        <>
            <Modal
                visible={props.Visible}
                onOk={props.handleOk}
                onCancel={props.handleCancel}
                >
                    <span>모달창</span>
            </Modal>
        </>
    )
}

export default WorkManageInfo
