import React from 'react'
import { Modal } from 'antd';

function WorkManageInfo(props) {
    console.log(props.UserData);
    return (
        <>
            <Modal
                visible={props.Visible}
                onOk={props.handleOk}
                onCancel={props.handleCancel}
                >
                    <div>
                        <p>날짜 : {props.UserData.Date}</p>
                        <p>제목 : {props.UserData.Title}</p>
                        <p>이름 : {props.UserData.User}</p>
                        <p>내용 : {props.UserData.Dsc}</p>
                    </div>
            </Modal>
        </>
    )
}

export default WorkManageInfo
