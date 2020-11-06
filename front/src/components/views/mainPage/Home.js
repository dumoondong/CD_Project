import React, {useState} from 'react'
import { DatePicker, message, Alert, Layout, Menu, Breadcrumb, Button, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import MainTable from './MainTable'

function Home() {
      //state
  const [date, setDate] = useState('');
  //state 값을 조건에 따라 변경하는 함수
  const handleChange = value => {
      message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
      setDate(value);
  };
    return(
        <div>
            <Breadcrumb style={{ margin: '16px 0', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Breadcrumb.Item>
                <DatePicker onChange={handleChange} />
              </Breadcrumb.Item>
            </Breadcrumb>
            <MainTable></MainTable>
            <MainTable></MainTable>
        </div>
    );
}

export default Home