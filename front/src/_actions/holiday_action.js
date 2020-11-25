import axios from 'axios';
import {
    HOLIDAY_INFO,
    SMALLCODE_INFO,
    LARGECODE_INFO,

} from './types';

export function holidayInfo(dataToSubmit){
    const request = axios.post('/api/holidaysave', dataToSubmit)
        .then(response => response.data)

    return {
        type: HOLIDAY_INFO,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
export function SmallCodeInfo(dataToSubmit){
    const request = axios.post('/api/smallcodesave', dataToSubmit)
        .then(response => response.data)

    return {
        type: SMALLCODE_INFO,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}

export function LargeCodeInfo(dataToSubmit){
    const request = axios.post('/api/mastercodesave', dataToSubmit)
        .then(response => response.data)

    return {
        type: LARGECODE_INFO,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}