import React, {useState,useEffect} from 'react'
import { Select,Tag,Layout, Menu,PageHeader,Table, Button, Row, Col,Checkbox,Form,Input,
  Breadcrumb} from 'antd';
  import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import LiveClock from '../../utils/LiveClock';
import ManageAdd from '../SystemAdd/ManageAdd';
import { Link } from "react-router-dom";
import {ManageColumns} from './ColumnTable'; //ColumnTable 내에 함수 사용

const { Header, Content, Sider, Footer } = Layout;

function Manage(props) {
  const [data, setData] = useState([]);//칼럼 안 데이터
  const options = [{ value: '영업부' }, { value: '총무부' },{value: '관리부'}];//근무 부서
  const [Visible, setVisible] = useState(false); //modal 관리

  //dispatch로 가져오도록 바꿀 예정====================================
  //직원 데이터 조회
  useEffect(() => {
    axios.get('/api//users/read').then(response => {
      setData(response.data);
    });
}, []);
  //직원 데이터 삭제
  const handleDelete = () => {
    axios.post('/api/users/delete', CheckTarget).then(res =>{
      if(res.data.success){
        alert('삭제되었습니다.');
        window.location.reload();
      }
    })
  }
  //=================================================================
  //체크박스
  const [CheckTarget, setCheckTarget] = useState([]); //체크 박스 한 대상

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setCheckTarget(selectedRows);
    }
  };
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
  ///////////////////////////////////////////
  
  //근무부서 선택
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    return (
      <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
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
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
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
                  title="직원관리"
                  subTitle="직원관리 페이지">   
                </PageHeader>
              </Breadcrumb.Item>
            </Breadcrumb>
            {/* 부서선택 */}
              <div style = {{fontSize: 20,background: '#fff', minHeight: 150}}>근무부서
                <Select mode="multiple"
                  showArrowtagRender={tagRender}
                  defaultValue={['영업부']}style={{ width: '30%' }}
                options={options}
                />
              </div>
              <div style = {{background: '#fff', minHeight: 20,textAlign:'end'}} >
                <Button type="primary" onClick={showModal}>추가</Button>
                <ManageAdd Visible={Visible} handleCancel={handleCancel} handleOk={handleOk} />
                <Button onClick={handleDelete}>삭제</Button>
                <Button>수정</Button>
              </div>
            <Table style = {{background: '#fff'}} columns={ManageColumns} dataSource={data} rowSelection={rowSelection} />
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Manage