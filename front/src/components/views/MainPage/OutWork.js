import React, {useState} from 'react'
import { Layout, Menu, Breadcrumb, Button, Row, Col, Table, Calendar, Modal, Descriptions, Input, Select} from 'antd';
import 'antd/dist/antd.css';
import LiveClock from './LiveClock';
import MiddlePage from '../MiddlePage/MiddlePage';
import MyPage from '../MyPage/MyPage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

const { Header, Content, Sider, Footer } = Layout;
const { Option } = Select;

function OutWork() {
  const [Date, setDate] = useState('');

  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const setOnSelect = (value) => {
    //console.log(value.format('YYYY-MM-DD'));
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
        <Sider style={{background:'dark'}}>
        <div>
          <LiveClock></LiveClock>
        </div>
        {/* grid */}
        <Row>
          <Col span={12}><Button block>출근</Button></Col>
          <Col span={12}><Button block>퇴근</Button></Col>
        </Row>
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
            <Menu.Item key="1">
              <span>홈 바로가기</span>
              <Link to="/main" />
            </Menu.Item>
            <Menu.Item key="2">
              <span>연가</span>
              <Link to="/outWork" />
            </Menu.Item>
            <Menu.Item key="3">
              <span>근무조회</span>
              <Link to="/middle" />
            </Menu.Item>
            <Menu.Item key="4">
              <span>업무지시 및 조회</span>
              <Link to="/employee" />
            </Menu.Item>
            <Menu.Item key="5">
              <span>마이 페이지</span>
              <Link to="/ckmypage" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
            <Button style={{marginRight:'1%'}}>로그아웃</Button>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Calendar onPanelChange={onPanelChange} onSelect={setOnSelect}/>
            <div>
              <Button style = {{float: 'right'}} OnClick = {{showModal}}>연가신청</Button>
              <Modal
                title="휴일설정"
                visible={Visible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={750}
              >
                <div>
                  <Descriptions bordered style = {{width: 700}}>
                    <Descriptions.Item label="날짜" span={3} style = {{textAlign: "center"}}>xxxxxx ~ yyyyyy</Descriptions.Item>
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
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
    );
}

export default OutWork
