import React from 'react'
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import {onWorkUser} from '../_actions/user_action';

function OnWork(props) {
    const dispatch = useDispatch(); //redux
    //확인 창
    const handleOk = () => {
        props.handleOk();
    }
    //체크 시 출근
    const handleCheck = () =>{
        let body ={ //보낼 값
            date:props.Date,
            time:props.Time
        }
        dispatch(onWorkUser(body))
                .then(response => { 
                    console.log(response);
                    if(response.payload.success){ 
                        console.log(response.payload);
                    }
                    else {
                        alert('Failed...');
                    }
                }) 
    }
    //modal
    return (
        <>
        <Modal
          visible={props.Visible}
          onOk={handleOk}
          afterClose={handleCheck}
          closable={false}
          cancelButtonProps={{disabled: true}}
          width={250}
          style={{textAlign:'center'}}
        >
          출근되었습니다
        </Modal>
        </>
    )
}

export default OnWork
