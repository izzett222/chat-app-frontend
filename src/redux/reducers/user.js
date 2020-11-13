import { 
    SIGNUP_ACTION, SIGNUP_ERROR, SIGNUP_START_LOADING, SIGNUP_STOP_LOADING,
    LOGIN_ACTION, LOGIN_ERROR, LOGIN_START_LOADING, LOGIN_STOP_LOADING,
    PROFILE_ACTION, PROFILE_ERROR, PROFILE_START_LOADING, PROFILE_STOP_LOADING
} from '../actionTypes';

const initialStale = {
    userName: '',
    id: null,
    token: '',
    error: '',
    loginError: '',
    loading: false,
    loginLoading: false,
    profileError: '',
    profileLoading: false,

}
const userReducer = (state = initialStale, action) => {
    switch(action.type) {
        case SIGNUP_ACTION:
            return { ...state, error: '', userName: action.userName, id: action.id, token: action.token }
        case SIGNUP_ERROR:
            return { ...state, error: action.message}
        case SIGNUP_START_LOADING:
            return { ...state, loading: true }
            case SIGNUP_STOP_LOADING:
                return { ...state, loading: false }
        case LOGIN_ACTION:
            return { ...state, loginError: '', token: action.token }
        case LOGIN_ERROR:
            return { ...state, loginError: action.message}
        case LOGIN_START_LOADING:
            return { ...state, loginLoading: true }
        case LOGIN_STOP_LOADING:
            return { ...state, loginLoading: false }
        case PROFILE_ACTION:
            return { ...state, error: '', userName: action.userName, id: action.id }
        case PROFILE_ERROR:
            return { ...state, profileError: action.message}
        case PROFILE_START_LOADING:
            return { ...state, profileLoading: true }
        case PROFILE_STOP_LOADING:
            return { ...state, profileLoading: false }
        default:
            return state
    }
}

export default userReducer;
