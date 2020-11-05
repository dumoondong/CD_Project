import React, { Component } from 'react';
import Clock from 'react-live-clock';
 
class liveClock extends Component {
    render() {
        return (
            <div>
                <Clock format={'YYYY 년 MM 월 DD 일'} ticking={true} timezone={'KR/Pacific'}/>
                <br />
                <Clock format={'HH:mm:ss'} ticking={true} timezone={'KR/Pacific'}/>
            </div>
        )
    }
}
 
export default liveClock