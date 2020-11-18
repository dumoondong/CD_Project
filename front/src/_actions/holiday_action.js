import axios from 'axios';
import {
    HOLIDAY_INFO
} from './types';

export function holidayInfo(dataToSubmit){
    const request = axios.post('/api/holidaysave', dataToSubmit)
        .then(response => response.data)

    return {
        type: HOLIDAY_INFO,
        payload: request //true,false를 받는 부분
    }
}