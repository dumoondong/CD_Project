import React, {useState} from 'react'

function Employee() {
    const [workInquiry, setWorkInquiry] = useState("")
    const [workOrder, setWorkOrder] = useState("")

    const setworkInquiryHandler = (event) => {
        setWorkInquiry(event.currentTarget.value);
    }

    const setworkOrderHandler = (event) => {
        setWorkOrder(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); 
     
        
        let body = {
            workInquiry: workInquiry,
            workOrder: workOrder
        }
    }

return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '70%', height: '200vh'
    }}>
        <form style={{ display: 'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}>
            <input type="text" value={workInquiry} onChange={setworkInquiryHandler} />
            <input type="text" value={workOrder} onChange={setworkOrderHandler} />
            <br />
            <button>
                업무조회
            </button>
            <button>
                업무지시
            </button>
            <button>
                로그아웃
            </button>
        </form>        
    </div>
);
}
export default Employee