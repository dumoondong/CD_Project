import React,{ useState } from 'react';
import { Button, Table } from 'antd';
//칼럼
const columns = [
    {
      title: '일자',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '출근시간',
      dataIndex: 'onWork',
      key: 'onWork',
    },
    {
      title: '퇴근시간',
      dataIndex: 'offWork',
      key: 'offWork',
    },
    {
      title: '근무내용',
      dataIndex: 'workContent',
      key: 'workContent',
    },
    {
      title: '초과근무시간',
      dataIndex: 'overWorkTime',
      key: 'overWorkTime',
    },
    {
      title: '초과근무내용',
      dataIndex: 'overWorkContent',
      key: 'overWorkContent',
    },
];
//칼럼 안 데이터
const data = [
    {
      key: '1',
      date: 'YYYY/MM/DD',
      onWork: 'HH:MM',
      offWork: 'HH:MM',
      workContent: 'Null',
      overWorkTime: 'Null',
      overWorkContent: 'Null',
    },
];
// 불러오는 곳
function MainTable() {
    const [showResults, setShowResults] = useState(true);
    const onClick = () => {
        if(showResults === true){
            setShowResults(false);
        } else {
            setShowResults(true);
        }
    }
        return(
            <div>
                <Button type="primary" onClick={onClick}>숨기기</Button>
                { showResults ? 
                <div style={{textAlign:'center', background:'#fff'}}>
                    <span style={{fontSize:'30px', fontWeight:'bold'}}>n 주차</span>
                    <Table columns={columns} dataSource={data} pagination={false} />
                </div>
                 : null }
            </div>
        );
}

export default MainTable