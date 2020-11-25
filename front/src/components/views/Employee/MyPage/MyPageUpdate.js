import React from 'react'
import { Modal } from 'antd';

function MyPageUpdate(props) {
    return (
        <>
            <Modal
                visible={props.Visible}
                onOk={props.handleOk}
                onCancel={props.handleCancel}
                >
                변경하시겠습니까?
            </Modal>
        </>
    )
}

export default MyPageUpdate
