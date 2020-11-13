import React from 'react'
import 'antd/dist/antd.css';
import { DatePicker, message, Alert, Layout, Menu, Breadcrumb, Button, Row, Col, Switch, Table, Select} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LiveClock from '../MainPage/LiveClock';

//칼럼
const { Header, Content, Sider, Footer } = Layout; //Layout부분을  Header , Content ,Sider, Footer로 나눠서 사용한다.
function Employee() {
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
            <Button style={{marginRight:'1%'}}>로그아웃</Button>
          </Header>
          <Content style={{ margin: '0 16px' }}>
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