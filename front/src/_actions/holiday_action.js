import axios from 'axios';
import {
    HOLIDAY_INFO
} from './types';
//dataToSubmit에는 넘어온 body 데이터가 들어가 있다.;로그인 액션
export function holidayInfo (dataToSubmit){
    const request = axios.post('/api/holidaysave', dataToSubmit)
        .then(response => response.data)

    return {
        type: HOLIDAY_INFO,
        payload: request //true,false를 받는 부분
    }
}