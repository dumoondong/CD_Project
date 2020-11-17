import React, { useState } from "react";
import 'antd/dist/antd.css';
import { DatePicker, message, Alert, Layout, Menu, Breadcrumb, Button, Row, Col, Switch, Table, Select} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LiveClock from '../MainPage/LiveClock';

//칼럼
const { Header, Content, Sider, Footer } = Layout; //Layout부분을  Header , Content ,Sider, Footer로 나눠서 사용한다.
const { Option } = Select;
const yearData = ['2020', '2019', '2018', '2017'];
const monthData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const options = [
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



function Employee(value) {

  const [selectedOption, setSelectedOption] = useState(null);
  console.log(setSelectedOption);

    //     const [data, setData] = useState([{
         
    //        key: '2',
    //        Date: '',
    //        User: '',
    //        Title: '',
    //        Dsc: '',
    //        Check: '',
    //      }
    //  ]);

      //   useEffect(() => {
      //     axios.get('/api/employee').then(response => {
      //       console.log('length : ',response.data2.length);
      //       var temp = {};
      //       for(var i=0; i< response.data2.length; i++) {
      //         temp = {
      //           key: String(i+1),
      //           선택: <Checkbox onChange={onChange}></Checkbox>,
      //           보낸날짜: response.data2[i].Date,
      //           보낸사람: response.data2[i].User,
      //           제목: response.data2[i].Title,
      //           내용: response.data2[i].Dsc,
      //           확인: response.data2[i].Check
      //         };
      //         console.log('이전 데이터 : ',data);
      //         setData([...data,temp]);
      //         console.log('이후 데이터 : ',data);
      //         console.log(temp);
      //         console.log('i : ',i);
      //       }
      //     });
      // }, []);
    

return (
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
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
            </Menu.Item>
            <Menu.Item key="4">
              <span>업무지시 및 조회</span>
            </Menu.Item>
            <Menu.Item key="5">
              <span>마이 페이지</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
            <Button style={{marginRight:'1%'}}>메시지조회</Button>
            <Button style={{marginRight:'1%'}}>로그아웃</Button>
          </Header>
          <Content style={{ margin: '0 20px' }}>
            <div style = {{display: 'flex'}}>
              <div style = {{display: 'inline-block', margin: '0px auto'}}>
                <Select name = 'year' defaultValue="년도" style={{ width: 80 }} onChange={Employee}>
                  <Option value="2020">2020</Option>
                  <Option value="2019">2019</Option>
                  <Option value="2018">2018</Option>
                  <Option value="2017">2017</Option>
                  <Option value="2016">2016</Option>
                </Select>
                <Select name = 'month' defaultValue="월" style={{ width: 60 }} onChange={Employee}>
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

export default Employee