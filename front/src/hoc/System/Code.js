import React, {useState,useEffect} from 'react'
import { Select,Tag,Layout, Menu,PageHeader,Table, Button, Row, Col,Checkbox,Form,Input,Tabs,
  Breadcrumb} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import LiveClock from '../../utils/LiveClock';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CodeAdd from '../SystemAdd/CodeAdd';
import CodeUpdate from '../SystemUpdate/CodeUpdate';
import {CodeColumns} from './ColumnTable'; //ColumnTable 내에 함수 사용
const { Header, Content, Sider, Footer } = Layout;

function Code(props) {
  const [data, setData] = useState([]);//칼럼 안 데이터
  const [Masterdata, setMasterData] = useState([]);//칼럼 안 데이터
  const { Option } = Select;
  const [Visible, setVisible] = useState(false); //modal 관리
  const [CheckTarget, setCheckTarget] = useState([]); //체크 박스 한 대상
  //체크박스
 const rowSelection = {
   onChange: (selectedRowKeys, selectedRows) => {
     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
     setCheckTarget(selectedRows);
   }
 };
 //수정
 const handleSave = () =>{

 }
  //delete
 const handleDelete = () => {
   axios.post('/api/SmallCodedelete', CheckTarget).then(res =>{
    if(res.data.success){
    alert('삭제되었습니다.');
    window.location.reload();
     }
   })
 }
  //mastercodeadd 분리
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
  //대코드 종류선택
  function onChange(value) {
    if(value == 'All'){
      axios.get('/api/smallcode').then(response => {  
        setData(response.data);
      });
    }
     else{
      let body = {
      LargeCode : value
       }
     axios.post('/api/mastercodelist',body).then(response => {
     console.log(response.data);
     setData(response.data);
      });
     }
  }
  //선택창 off
  function onBlur() {
    console.log('blur');
  }
  //선택창 on
  function onFocus() {
    console.log('focus');
  }
  
  // function onSearch(val) {
  //   console.log('search:', val);

  // }
  //공통 코드 데이터 조회
  useEffect(() => {
    axios.get('/api/smallcode').then(response => {  
      setData(response.data);
    });
    axios.get('/api/mastercode').then(response => {
      setMasterData(response.data);
    });
}, []);
const { TabPane } = Tabs;
  function callback(key) {
   console.log(key);
  }
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

            <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="대코드" key="1">
              Content of Tab Pane 1
              <Link  to="/mastercode" />
            </TabPane>
            <TabPane tab="소코드" key="2">
              Content of Tab Pane 2
              <Link  to="/code" />
           </TabPane>
          </Tabs>

              </Breadcrumb.Item>
            </Breadcrumb>
            {/* 선택창 */}
            <div style = {{fontSize: 20,background: '#fff', minHeight: 2}}>
            <Select showSearch style={{ width: 200 }} placeholder="대코드 검색"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
           }
           >
          <Option key={'All'}>All</Option>
         {Masterdata.map(code => (
          <Option key={code.LargeCode}>{code.LargeInfo}</Option>
        ))}
         </Select>
              <div style = {{background: '#fff', minHeight: 20,textAlign:'end'}} >  
                <Button onClick={showModal}>추가</Button>         
                <CodeAdd Visible={Visible} handleCancel={handleCancel} handleOk={handleOk} />
                <Button onClick={handleDelete}>삭제</Button>
                <Button onClick={showModal}>수정</Button>         
                <CodeUpdate Visible={Visible} handleCancel={handleCancel} handleOk={handleOk} />
              </div>
            <Table style = {{background: '#fff'}} columns={CodeColumns} dataSource={data} rowSelection={rowSelection} />
            </div>   
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Code