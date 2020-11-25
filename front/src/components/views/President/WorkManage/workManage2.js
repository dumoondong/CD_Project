import React, { useState} from "react";
import 'antd/dist/antd.css'; //antd디자인 CSS
import {Layout, Button, Table, Select} from 'antd';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarPresident';///여기까지


//칼럼
const { Header, Content, Footer } = Layout; //Layout부분을  Header , Content ,Sider, Footer로 나눠서 사용한다.
const { Option } = Select;
const yearData = ['2020', '2019', '2018', '2017'];
const monthData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const option = [
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
];


const columns = [
  {
    title: '보낸날짜 및 시간',
    dataIndex: 'Date',
    key: 'Date',
  },
  {
      title: '보낸 이',
      dataIndex: 'User',
      key: 'User',
    },
    {
      title: '제목',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: '내용',
      dataIndex: 'Dsc',
      key: 'Dsc',
    },
    {
      title: '확인',
      dataIndex: 'Check',
      key: 'Check',
    },
  ];
  const data = [
     {
       key: '1',
       Date: 'YYYY/MM/DD',
       User: 'Name',
       Title: 'Title',
      Dsc: 'Content',
       Check: 'Check',
     },
  ];
  function PrezWorkManage(props) {
    const [selectedOption, setSelectedOption] = useState(null);
    console.log(setSelectedOption); 
      return (
        <div>
       <Layout style={{ minHeight: '100vh' }}>
            <SideBar DefaultKey={'3'}/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
            {/* <Button style={{marginRight:'1%'}}>메시지조회</Button> */}
            {/* <Button style={{marginRight:'1%'}}>업무삭제</Button> */}
            {/* 로그인 시 유저 이름 및 로그아웃 */}
            <LoginedUser />
            <LogoutUser pageChange={props}/>
          </Header>
          <Content style={{ margin: '0 20px' }}>
          <Button style = {{float: 'left'}}>업무요구</Button>
          <Button style = {{textAlign: 'left'}}>업무조회</Button>  
            <div style = {{display: 'flex'}}>
              <div style = {{display: 'inline-block', margin: '0px auto'}}>
                  <Select name = 'year' defaultValue="년도" style={{ width: 80 }} >
                    <Option value="2020">2020</Option>
                    <Option value="2019">2019</Option>
                    <Option value="2018">2018</Option>
                    <Option value="2017">2017</Option>
                    <Option value="2016">2016</Option>
                  </Select>
                  <Select name = 'month' defaultValue="월" style={{ width: 60 }} >
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
              <Button style = {{float: 'right'}}>인쇄</Button>
              {/* <Button onClick={addRow}>추가</Button> */}
            </div>  
            <Table columns={columns} dataSource={data} pagination={false} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          </Footer>
        </Layout>
      </Layout>
    </div>
);
}

export default PrezWorkManage