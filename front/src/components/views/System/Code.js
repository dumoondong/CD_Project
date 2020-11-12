import React, {useState,useEffect} from 'react'
import { Select,Tag,Layout, Menu,PageHeader,Table, Button, Row, Col,Checkbox,Form,Input,
  Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import LiveClock from '../MainPage/LiveClock';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CodeAdd from './CodeAdd';
const { Header, Content, Sider, Footer } = Layout;

function Code(props) {
  
  //선택 체크박스
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  //선택창
  const options = [{ value: 'CP' }, { value: 'SP' },{value: 'DP'}];
  function tagRender(props) {
    const { label, value, closable, onClose } = props;
    return (
      <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }
  const columns = [
    {
      title: <Checkbox onChange={onChange}></Checkbox>,
      dataIndex: '선택',
      key: '선택',
    },
    {
        title: '대코드',
        dataIndex: '대코드',
        key: '대코드',
    },
    {
      title: '소코드',
      dataIndex: '소코드',
      key: '소코드',
    },
    {
      title: '코드정보',
      dataIndex: '코드정보',
      key: '코드정보',
    },
    {
      title: '비고',
      dataIndex: '비고',
      key: '비고',
    }
  ];

    //칼럼 안 데이터
    const [data, setData] = useState([
      {
        key: '1',
        선택: <Checkbox onChange={onChange}></Checkbox>,
        대코드: 'CP',
        소코드: '01',
        코드정보:'공휴일설정',
        비고: '-'
      },
      {
        key: '2',
        선택: <Checkbox onChange={onChange}></Checkbox>,
        대코드: 'CP',
        소코드: '02',
        코드정보:'회사창립일',
        비고: '-'
      },
    ]);

    
    //main
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
        <div>
        <LiveClock></LiveClock>
        </div>
        {/* grid */}
        <Row>
            <Col span={12}><Button block>출근</Button></Col>
            <Col span={12}><Button block>퇴근</Button></Col>
        </Row>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <span>휴일설정</span>
            </Menu.Item>
            <Menu.Item key="2">
              <span>직원 관리</span>
              <Link to="/manage" />
            </Menu.Item>
            <Menu.Item key="3">
              <span>공통 코드</span>
              <Link to="/code" />
            </Menu.Item>           
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
            <Button style={{marginRight:'1%'}}>로그아웃</Button>
          </Header>
          <Content>
          <Breadcrumb style = {{background: '#fff', minHeight: 100}}>
              <Breadcrumb.Item>
                <PageHeader
                  className="site-page-header"
                  onBack={() => null}
                  title="공통코드"
                  subTitle="공통코드 페이지">   
                </PageHeader>
              </Breadcrumb.Item>
            </Breadcrumb>
            {/* 선택창 */}
            <div style = {{fontSize: 20,background: '#fff', minHeight: 150}}>대코드
                <Select mode="multiple"
                  showArrowtagRender={tagRender}
                  defaultValue={['CP']}style={{ width: '30%' }}
                options={options}
                />
              </div>
              <div style = {{background: '#fff', minHeight: 20,textAlign:'end'}} >
               
                <CodeAdd></CodeAdd>
                <button>삭제</button>
                <button>수정</button>
                <button>저장</button>
              </div>
            <Table style = {{background: '#fff'}} columns={columns} dataSource={data} />
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Code