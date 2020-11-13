import React, {useState,useEffect} from 'react'
import { Select,Tag,Layout, Menu,PageHeader,Table, Button, Row, Col,Checkbox,Form,Input,
  Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import LiveClock from '../MainPage/LiveClock';
import ManageAdd from '../RegisterPage/ManageAdd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Content, Sider, Footer } = Layout;

function Manage(props) {
  //선택 체크박스
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  //근무부서 선택
  const options = [{ value: '영업부' }, { value: '총무부' },{value: '관리부'}];
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
      title: '부서',
      dataIndex: '부서',
      key: '부서',
    },
    {
      title: '직급',
      dataIndex: '직급',
      key: '직급',
    },
    {
      title: '사원번호',
      dataIndex: '사원번호',
      key: '사원번호',
    },
    {
      title: '사원이름',
      dataIndex: '사원이름',
      key: '사원이름',
    },
    {
      title: '비밀번호',
      dataIndex: '비밀번호',
      key: '비밀번호',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '핸드폰번호',
      dataIndex: '핸드폰번호',
      key: '핸드폰번호',
    },
    {
      title: '우편번호',
      dataIndex: '우편번호',
      key: '우편번호',
    },
    {
      title: '주소',
      dataIndex: '주소',
      key: '주소',
    },
    {
      title: '비고',
      dataIndex: '비고',
      key: '비고',
    }
  ];
  
    //칼럼 안 데이터
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('/api/manage').then(response => {
        var temp = {};
        for(var i=0; i< response.data.length; i++) {
          temp = {
            key: String(i+1),
            선택: <Checkbox onChange={onChange}></Checkbox>,
            부서: response.data[i].dept,
            직급: response.data[i].rank,
            사원번호: response.data[i].id,
            사원이름: response.data[i].name,
            비밀번호: response.data[i].password,
            email: response.data[i].email,
            핸드폰번호: response.data[i].phone,
            우편번호: response.data[i].zim,
            주소: response.data[i].address,
            비고: response.data[i].des
          };
          setData(data => [...data, temp]); //이전 값과 새로운 값을 더하여 새로운 값으로 반환
        }
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
                <ManageAdd></ManageAdd>
                <Button>삭제</Button>
                <Button>수정</Button>
                <Button>저장</Button>
              </div>
            <Table style = {{background: '#fff'}} columns={columns} dataSource={data} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
      </Layout>
    </Layout>
    </div>
  );
};

export default Manage