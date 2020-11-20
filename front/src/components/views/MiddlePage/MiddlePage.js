import React, { useState } from "react";
import 'antd/dist/antd.css';
import { DatePicker, message, Alert, Layout, Menu, Breadcrumb, Button, Row, Col, Switch, Table, Select} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LiveClock from '../MainPage/LiveClock';
import LoginedUser from '../../../utils/LoginedUser';
import LogoutUser from '../../../utils/LogoutUser';
import ReactDOM from 'react-dom'
//칼럼
const columns = [
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '요일',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: '출퇴근시간',
      dataIndex: 'work',
      key: 'work',
    },
    {
      title: '근무시간',
      dataIndex: 'workTime',
      key: 'workTime',
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
      day: 'Mon',
      work: 'HH:MM ~ HH:MM',
      workTime: 'onWork-offWork',
      workContent: 'Null',
      overWorkTime: 'Null',
      overWorkContent: 'Null',
    },
];
// 불러오는 곳

const { Header, Content, Sider, Footer } = Layout;
const { Option } = Select;


function MiddlePage(props) {

  const [selectedOption, setSelectedOption] = useState(null);
  console.log(setSelectedOption);

  const printDiv = () => {
    var printContents = ReactDOM.findDOMNode("printArea").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

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
          <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline">
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
            <LoginedUser />
            <LogoutUser pageChange={props}/>
          </Header>
              
          <Content style={{ margin: '0' }}>
            <div style = {{margin: '0 auto', width: '1000px'}}>
              <div style = {{marginBottom: '20px'}}>{/* 년 월 인쇄 통합 div */}
                <div style = {{display: 'inline-block', marginLeft: '44%'}}>
                  <Select name = 'year' defaultValue="년도" style={{ width: 80 }}>
                    <Option value="2020">2020</Option>
                    <Option value="2019">2019</Option>
                    <Option value="2018">2018</Option>
                    <Option value="2017">2017</Option>
                    <Option value="2016">2016</Option>
                  </Select>
                  <Select name = 'month' defaultValue="월" style={{ width: 60 }}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    <Option value="10">10</Option>
                    <Option value="11">11</Option>
                    <Option value="12">12</Option>
                  </Select>
                </div>
                <div style = {{display: 'inline-block', float: 'right'}}>
                  <Button onClick = {printDiv}>인쇄</Button>
                </div>
              </div>
              <div id = "printArea">
                {/* 이름칸 div
                <div style = {{display: 'inline-block', borderTop: 'solid 1px', borderLeft: 'solid 1px', borderBottom: 'solid 1px'}}>
                      <h1>이름</h1>
                    </div>
                    <div style = {{display: 'inline-block', border: 'solid 1px'}}>
                      <h1><LoginedUser /></h1>
                    </div>
                     */}
                <div style = {{width:'1000px', margin: '0 auto'}}>
                  <div style = {{display: 'inline-block', marginLeft: '40%', textAlign: 'center'}}>
                      <h2>yyyy년 MM월 근무현황</h2>
                  </div>
                  <div style = {{display: 'inline-block', float: 'right'}}>
                    <h1><LoginedUser/></h1>
                  </div>
                </div>

                <Table columns={columns} dataSource={data} pagination={false} />
    
                {/* 근무시간합계, 초과근무합계 div */}
                <div style = {{backgroundColor: 'blue', textAlign: 'center'}}>
                  <div style = {{display: 'inline-block', width: '40%', backgroundColor: 'orange'}}>
                    근무시간합계
                  </div>
                  <div style = {{display: 'inline-block', width: '10%', backgroundColor: 'yellow'}}>
                    근무합
                  </div>
                  <div style = {{display: 'inline-block', width: '40%', backgroundColor: 'orange'}}>
                    초과근무시간합계
                  </div>
                  <div style = {{display: 'inline-block', width: '10%', backgroundColor: 'yellow'}}>
                    초과합
                  </div>
                </div>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
    
    );
};

export default MiddlePage
