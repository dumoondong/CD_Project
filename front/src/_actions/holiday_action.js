import axios from 'axios';
import {
    HOLIDAY_INFO
} from './types';

export function holidayInfo(dataToSubmit){
    const request = axios.post('/api/holidaysave', dataToSubmit)
        .then(response => response.data)

    return {
        type: HOLIDAY_INFO,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}