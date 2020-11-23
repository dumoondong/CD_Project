import React, {useState} from 'react'
import { Layout, Button, Table, Calendar, Modal, Descriptions, Input, Select, DatePicker} from 'antd';
import 'antd/dist/antd.css';
import LoginedUser from '../../../utils/LoginedUser';///utils 폴더
import LogoutUser from '../../../utils/LogoutUser';
import SideBar from '../../../utils/SideBar';///여기까지

const columns = [
  {
    title: '날짜',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '일수',
    dataIndex: 'day',
    key: 'day',
  },
  {
    title: '연가종류',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '연가내용',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '승인여부',
    dataIndex: 'confirm',
    key: 'confirm',
  },
];
//칼럼 안 데이터
const data = [
  {
    key: '1',
    date: 'YYYY/MM/DD',
    day: 'n',
    type: '연차',
    content: 'Null',
    confirm: 'Null',
  },
];

const { Header, Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

function OutWork(props) {
  const [Date, setDate] = useState('');

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const setOnSelect = (value) => {
    setDate(...Date, value.format('YYYY-MM-DD'));
    console.log(Date);
  }

  //팝업
  const [Visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    setVisible(false);
  }

    return(
        <div>
          <Layout style={{ minHeight: '100vh' }}>
            <SideBar DefaultKey={'2'}/>
            <Layout>
              <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
                <LoginedUser />
                <LogoutUser pageChange={props}/>
              </Header>
              <Content style={{ margin: '0 16px' }}>
                <Calendar/>
                <div>
                  <Button style = {{float: 'right'}} onClick = {showModal}>연가신청</Button>
                  <Modal
                    title="휴일설정"
                    visible={Visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={750}
                  >
                    <div>
                      <Descriptions bordered style = {{width: 700}}>
                        <Descriptions.Item label="날짜" span={3} style = {{textAlign: "center"}}><RangePicker /></Descriptions.Item>
                        <Descriptions.Item label="연가종류" span={3} style = {{textAlign: "center"}}>
                          <Select defaultValue="연가선택" style={{ width: 450 }} onChange={handleChange}>
                            <Option value="연가">연가</Option>
                            <Option value="병가">병가</Option>
                            <Option value="공가">공가</Option>
                            <Option value="특별휴가">특별휴가</Option>
                          </Select>
                        </Descriptions.Item>
                        <Descriptions.Item label="연가내용" span={3} style = {{textAlign: "center"}}><Input style={{ width: 450 }}/></Descriptions.Item>
                      </Descriptions>
                    </div>
                  </Modal>
                </div>
                <div>
                  <Table columns={columns} dataSource={data} pagination={false} />
                </div>
              </Content>
            </Layout>
          </Layout>
        </div>
    );
}

export default OutWork
