import React from 'react';
import { Table } from 'antd';
//칼럼
const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'On work/Off work',
      dataIndex: 'work',
      key: 'work',
    }
];
//칼럼 안 데이터
const data = [
    {
      key: '1',
      date: 'YYYY/MM/DD',
      day: 'Mon',
      work: 'HH:MM / HH:MM',
    },
];
// 불러오는 곳
function MiddlePage() {
        return(
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        );
}

export default MiddlePage