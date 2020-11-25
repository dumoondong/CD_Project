import React, {useState,useEffect} from 'react'
import { Select,Tag,Layout, Menu,PageHeader,Table, Button, Row, Col,Checkbox,Form,Input,
  Breadcrumb} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import LiveClock from '../../utils/LiveClock';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MasterCodeAdd from '../SystemAdd/MasterCodeAdd';
import {DeCodeColumns} from './ColumnTable'; //ColumnTable 내에 함수 사용
const { Header, Content, Sider, Footer } = Layout;

function MasterCode(props) {
  const [data, setData] = useState([]);//칼럼 안 데이터
  const options = [{ value: 'CP' }, { value: 'SP' },{value: 'DP'}];
  //체크박스
  const [CheckTarget, setCheckTarget] = useState([]); //체크 박스 한 대상

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setCheckTarget(selectedRows);
    }
  };
      //확인용
  const handleSave = () => {
      console.log('CheckTarget : ',CheckTarget);
    }
      //delete -> 한개씩만 삭제됨
  const handleDelete = () => {
    axios.post('/api/MasterCodedelete', CheckTarget).then(res =>{
     if(res.data.success){
     alert('삭제되었습니다.');
     window.location.reload();
      }
    })
  }
   
  //공통 코드 데이터 조회
  useEffect(() => {
    axios.get('/api/masterCode').then(response => {
      setData(response.data);
    });
}, []);

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
          <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline">
            <Menu.Item key="1">
              <span>휴일설정</span>
              <Link to="/holiday" />
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
          <Link  to="/">
            <Button style={{marginRight:'1%'}}>로그아웃</Button>
            </Link>
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
                <Link  to="/mastercode">
            <Button style={{marginRight:'1%'}}>대코드</Button>
            </Link>
            <Link  to="/code">
            <Button style={{marginRight:'1%'}}>소코드</Button>
            </Link>
              </Breadcrumb.Item>
            </Breadcrumb>        
              <div style = {{background: '#fff', minHeight: 20,textAlign:'end'}} >        
                <MasterCodeAdd></MasterCodeAdd>
                <Button onClick={handleDelete}>삭제</Button>
                <button>수정</button>
                <button>저장</button>
              </div>
            <Table style = {{background: '#fff'}} columns={DeCodeColumns} dataSource={data} rowSelection={rowSelection} />
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default MasterCode