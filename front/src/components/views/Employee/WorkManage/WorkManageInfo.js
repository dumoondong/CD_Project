import React from 'react'
import { Modal } from 'antd';

function WorkManageInfo(props) {
    //console.log(props.UserData);
    return (
        <>
            <Modal
                visible={props.Visible}
                onOk={props.handleOk}
                onCancel={props.handleCancel}
                >
                    <div>
                        <p>보낸 날짜 : {props.UserData.Date}</p>
                        <p>종료 날짜 : {props.UserData.EndDate}</p>
                        <p>부서 : {props.UserData.Dept}</p>
                        <p>직급 : {props.UserData.Rank}</p>
                        <p>이름 : {props.UserData.User}</p>
                        <p>제목 : {props.UserData.Title}</p>
                        <p>내용 : {props.UserData.Dsc}</p>
                    </div>
            </Modal>
        </>
    )
}

export default WorkManageInfo
