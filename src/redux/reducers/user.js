import { SIGNUP_ACTION, SIGNUP_ERROR, SIGNUP_START_LOADING, SIGNUP_STOP_LOADING } from '../actionTypes';

const initialStale = {
    userName: '',
    id: null,
    token: '',
    error: '',
    loading: false,

}
const userReducer = (state = initialStale, action) => {
    switch(action.type) {
        case SIGNUP_ACTION:
            return { error: '', userName: action.userName, id: action.id, token: action.token }
        case SIGNUP_ERROR:
            return { ...state, error: action.message}
        case SIGNUP_START_LOADING:
            return { ...state, loading: true }
            case SIGNUP_STOP_LOADING:
                return { ...state, loading: false }
        default:
            return state
    }
}

export default userReducer;
