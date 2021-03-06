import {
    LOGIN_USER,
    CREATE_USER,
    UPDATE_USER,
    HOLIDAY_INFO,
    SMALLCODE_INFO,
    LARGECODE_INFO,
    ONWORK_USER,
    OFFWORK_USER,
    HOLIDAY_USER,
    MYPAGE_USER,
    // SMALLCODEUPDATE_INFO
} from '../_actions/types';
//이전state 값과 action값을 묶어서 store(index.js)로 보냄
export default function(state= {}, action) {
    switch (action.type){ //액션을 보낼 곳
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        //break;
        case CREATE_USER:
            return { ...state, CreateSuccess: action.payload }
        //break;
        case UPDATE_USER:
            return { ...state, UpdateSuccess: action.payload }
        //break;
        case HOLIDAY_INFO:
            return { ...state, holidaySaveSuccess: action.payload }
        //break; 
        case SMALLCODE_INFO:
            return { ...state, smallcodeSaveSuccess: action.payload }
        //break;
        case LARGECODE_INFO:
            return { ...state, largecodeSaveSuccess: action.payload }
        //break;
        case ONWORK_USER:
            return { ...state, success: action.payload }
        //break; 
        case OFFWORK_USER:
            return { ...state, success: action.payload }
        //break; 
        case HOLIDAY_USER:
            return { ...state, success: action.payload }
        //break; 
        case MYPAGE_USER:
            return { ...state, success: action.payload }
        //break; 
        // case SMALLCODEUPDATE_INFO:
        //     return { ...state, success: action.payload }
        //break; 
        default:
            return state;
    }
}