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
                okText = "확인"
                cancelText = "닫기"
                width = {550}
                >
                <div id = "wrap" style = {{width: "470px", border: "solid 1px lightgray"}}>
                    <div>
                        <div className = "left" style = {{display: "inline-block", width: "25%", height: "35px", textAlign: "center", borderRight: "solid 1px lightgray", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            보낸 날짜
                        </div>
                        <div className = "right" style = {{display: "inline-block", width: "75%", height: "35px", textAlign: "center", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            보낸시간가져오기
                        </div>
                    </div>
                    <div>
                        <div className = "left" style = {{display: "inline-block", width: "25%", height: "35px", textAlign: "center", borderRight: "solid 1px lightgray", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            종료 날짜
                        </div>
                        <div className = "right" style = {{display: "inline-block", width: "75%", height: "35px", textAlign: "center", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            dsaf{props.UserData.EndDate}
                        </div>
                    </div>
                    <div>
                        <div className = "left" style = {{display: "inline-block", width: "25%", height: "35px", textAlign: "center", borderRight: "solid 1px lightgray", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            부서
                        </div>
                        <div className = "right" style = {{display: "inline-block", width: "75%", height: "35px", textAlign: "center", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            fasddasf{props.UserData.Dept}
                        </div>
                    </div>
                    <div>
                        <div className = "left" style = {{display: "inline-block", width: "25%", height: "35px", textAlign: "center", borderRight: "solid 1px lightgray", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            직급
                        </div>
                        <div className = "right" style = {{display: "inline-block", width: "75%", height: "35px", textAlign: "center", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            dasfasdf{props.UserData.Rank}
                        </div>
                    </div>
                    <div>
                        <div className = "left" style = {{display: "inline-block", width: "25%", height: "35px", textAlign: "center", borderRight: "solid 1px lightgray", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            이름
                        </div>
                        <div className = "right" style = {{display: "inline-block", width: "75%", height: "35px", textAlign: "center", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            {props.UserData.User}
                        </div>
                    </div>
                    <div>
                        <div className = "left" style = {{display: "inline-block", width: "25%", height: "35px", textAlign: "center", borderRight: "solid 1px lightgray", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            제목
                        </div>
                        <div className = "right" style = {{display: "inline-block", width: "75%", height: "35px", textAlign: "center", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            {props.UserData.Title}
                        </div>
                    </div>
                    <div>
                        <div style = {{height: "35px", textAlign: "center", borderBottom: "solid 1px lightgray", fontSize: "18px"}}>
                            내용
                        </div>
                        <div style = {{height: "150px", fontSize: "18px"}}>
                            {props.UserData.Dsc}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default WorkManageInfo