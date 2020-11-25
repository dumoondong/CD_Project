import React, {useState,useEffect} from 'react'
import { Select,Tag,Layout, Menu,PageHeader,Table, Button, Row, Col,Checkbox,Form,Input,
  Breadcrumb} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import LiveClock from '../../utils/LiveClock';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MasterCodeAdd from '../SystemAdd/MasterCodeAdd';
import MasterCodeUpdate from '../SystemUpdate/MasterCodeUpdate';
import {DeCodeColumns} from './ColumnTable'; //ColumnTable 내에 함수 사용
const { Header, Content, Sider, Footer } = Layout;

function MasterCode(props) {
  const [data, setData] = useState([]);//칼럼 안 데이터
  const [Visible, setVisible] = useState(false); //modal 관리
  const options = [{ value: 'CP' }, { value: 'SP' },{value: 'DP'}];
  const [CheckTarget, setCheckTarget] = useState([]); //체크 박스 한 대상
  //체크박스
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setCheckTarget(selectedRows);
    }
  };
  
  //delete
  const handleDelete = () => {
    axios.post('/api/MasterCodedelete', CheckTarget).then(res =>{
     if(res.data.success){
     alert('삭제되었습니다.');
     window.location.reload();
      }
    })
  }
    ///ManageAdd 분리//////////////////////////
  //팝업 창 ON
  const showModal = () => {
    setVisible(true);
  }
  //팝업 창 OFF
  const handleCancel = () =>{
    setVisible(false);
  }
  //팝업 창 OFF
  const handleOk = () =>{
    setVisible(false);
  }
  //공통 코드 데이터 조회
  useEffect(() => {
    axios.get('/api/MasterCode').then(response => {
      setData(response.data);
      console.log(response.data);
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
              <div style = {{background: '#fff',minHeight: 36}}></div> 
              <div style = {{background: '#fff', minHeight: 20,textAlign:'end'}} >     
                <Button type="primary" onClick={showModal}>추가</Button>   
                <MasterCodeAdd Visible={Visible} handleCancel={handleCancel} handleOk={handleOk} />
                <Button onClick={handleDelete}>삭제</Button>
                <Button type="primary" onClick={showModal}>수정</Button>   
                <MasterCodeUpdate Visible={Visible} handleCancel={handleCancel} handleOk={handleOk} />
              </div>
            <Table style = {{background: '#fff'}} columns={DeCodeColumns} dataSource={data} rowSelection={rowSelection} />
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default MasterCode