import React, { useState } from "react";
import { Table, Modal } from 'antd';
import 'antd/dist/antd.css';

import { prezHoliColumns }from './PrezHoliColumns';
    const data = [
    {
        key: '1',
        name: '이름',
        type: '연차',
        start: '시작일',
        end: '종료일',
        nday: 'n',
        content: 'Null',
        confirm: 'Null',
    },
    ];

function PrezHoliConfirm(props) {
    const [CheckTarget, setCheckTarget] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setCheckTarget(selectedRows);
        }
    };
    return (
      <Modal
          title="연가승인"
          visible={props.Visible}
          onOk={props.handleOk}
          okText = "승인"
          onCancel={props.handleCancel}
          width={750}
      >
          <div style = {{marginBottom: "20px"}}>
              <Table columns={prezHoliColumns} dataSource={data} rowSelection={rowSelection} pagination={false} />
          </div>
      </Modal> 
    )
}

export default PrezHoliConfirm