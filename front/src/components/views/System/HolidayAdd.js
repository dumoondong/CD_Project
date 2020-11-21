import { Modal } from 'antd';

function HolidayAdd(props) {
    
    const handleCancel = () => {
        props.showCancel();
      };
    //팝업 저장(유저 생성)
    const handleOk = () => {
        props.showOk()
    }
    return (
        <>
        <Modal
          title="Basic Modal"
          visible={props.showModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        </>
    );
}

export default HolidayAdd

