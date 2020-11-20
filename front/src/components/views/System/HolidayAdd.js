import React,{useState} from 'react'
import { Modal } from 'antd';

function HolidayAdd(props) {
    const [Visible, setVisible] = useState(false);
    
    // useEffect(() => {
    //     //setVisible(props);
    // }, [])

    console.log(props);
    const handleOk = () => {
        setVisible(false);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    return (
        <>
            <Modal
          title="Basic Modal"
          visible={Visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        </>
    )
}

export default HolidayAdd


