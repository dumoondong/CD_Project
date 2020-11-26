import React,{ useState } from 'react';
import {Layout, Breadcrumb, PageHeader, Button, Input} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import SideBar from '../../../../utils/SideBarPresident';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import { useDispatch } from 'react-redux';
import { myPageUser } from '../../../../_actions/user_action';
import MyPage from '../../Employee/MyPage/MyPage';

const { Header, Content } = Layout;

function PrezCheckMyPage(props) {
    const dispatch = useDispatch();
    const [Password, setPassword] = useState('');
    const [MypageShow, setMypageShow] = useState(false);

    const handleChangePassword = (e) => {
        setPassword(e.currentTarget.value);
      }

    const handleCheck = () => {
        console.log("Check");

        let body = {
            Password
        }

        dispatch(myPageUser(body))
            .then(response => { 
                if(response.payload.success){
                    console.log(response.payload.success);
                    alert('Success!',);
                    setMypageShow(true);
                }
                else {
                    alert('비밀번호를 다시 확인해주세요.');
            }
        })
    } 
   
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <SideBar DefaultKey={'5'}/>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
                        <LoginedUser />
                        <LogoutUser pageChange={props}/>
                    </Header>
                    {MypageShow ? <MyPage /> : <Content style={{ margin: '0', backgroundColor: 'white'}}>
                    <Breadcrumb style = {{background: '#fff', minHeight: 100}}>
                        <Breadcrumb.Item>
                            <PageHeader
                                title="개인정보변경">   
                            </PageHeader>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{width: '50%', height: '400px', margin: '0 auto'}}>
                        <div style = {{marginBottom: '20px',marginTop: '10%'}}>
                            <h2 style = {{textAlign: "center"}}>본인확인</h2>
                        </div>
                        <div style = {{display: 'inline-block', width:'20%'}}>
                            현재 비밀번호 : 
                        </div>
                        <div style = {{display: 'inline-block', margin: '0 10px', width:'60%'}}>
                            <Input.Password
                                placeholder=""
                                value={Password}
                                onChange={handleChangePassword}
                            />
                        </div>
                        <div style = {{display: 'inline-block'}}>
                            <Button onClick={handleCheck}>확인</Button>
                        </div>
                    </div>
                    </Content>
                    }
                </Layout>
            </Layout>
        </div>
    );
}

export default PrezCheckMyPage