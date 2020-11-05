import React, { Component } from 'react';
import Clock from './liveClock';
 
class mainPage extends Component {
    render() {
        return (
            <div >
                <Clock></Clock>
                <button>출근</button><button>퇴근</button>
                <form style={{ display: 'flex', flexDirection: 'column', width: '10%'}}>
                <button>홈 바로가기</button>
                <button>연가</button>
                <button>근무조회</button>
                <button>업무지시 및 조회</button>
                <button>마이 페이지</button>
                </form>
            </div>
        )
    }
}
 
export default mainPage