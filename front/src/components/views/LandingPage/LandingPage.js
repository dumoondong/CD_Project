import React, { useEffect } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import { response } from 'express';

function LandingPage(props) {
    //axios 연습 
    useEffect(() => {
        axios.get('/api/hello').then(response => console.log(response));
    }, []);

    // const onClickHandler = () => {
    //     axios.get(`/api/users/logout`)
    //         .then(response => {
    //             if(response.data.success){
    //                 props.history.push('/login');
    //             }else{
    //                 alert('Error');
    //             }
    //         });
    // }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
        {/* <button onClick={onClickHandler}>
            로그아웃
        </button> */}
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <h2>시작 페이지</h2>
                <Link to="/login">login</Link>
                <Link to="/register">sign</Link>
            </div>
        </div>
    )
}

export default LandingPage
