import React, { Component } from 'react';
import Clock from 'react-live-clock';
 
function LiveClock(){
    return (
        <div style={{background:'dark',color:'white'}}>
            <Clock format={'YYYY 년 MM 월 DD 일'} ticking={true}/>
            <br />
            <Clock format={'HH:mm:ss'} ticking={true}/>
        </div>
    )
}
 
export default LiveClock
