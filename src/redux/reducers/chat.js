import { 
    START_CHAT_ACTION, START_CHAT_ERROR, START_CHAT_LOADING_START, START_CHAT_LOADING_STOP
} from '../actionTypes';

const initialStale = {
    userName: '',
    id: null,
    error: '',
    loading: false,
}
const userReducer = (state = initialStale, action) => {
    switch(action.type) {
        case START_CHAT_ACTION:
            return { ...state, error: '', userName: action.userName, id: action.id }
        case START_CHAT_ERROR:
            return { ...state, error: action.message}
        case START_CHAT_LOADING_START:
            return { ...state, loading: true }
            case START_CHAT_LOADING_STOP:
                return { ...state, loading: false }
        default:
            return state
    }
}

export default userReducer;
