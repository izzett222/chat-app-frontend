import user from '../../../redux/reducers/user';
import { LOGIN_ACTION, LOGIN_ERROR, LOGIN_START_LOADING, LOGIN_STOP_LOADING, SIGNUP_ACTION, SIGNUP_ERROR, SIGNUP_START_LOADING, SIGNUP_STOP_LOADING } from '../../../redux/actionTypes';

const initialState = {
    userName: '',
    id: null,
    token: '',
    error: '',
    loginError: '',
    loading: false,
    loginLoading: false

}
describe('user reducer', () => {
    it('should update the token, id and userName', () => {
        const userName = 'james'
        const id = 5;
        const token = 'vergrgrt'
        const result = user(initialState, { type: SIGNUP_ACTION, userName, id, token })
        const { id: userId, token: userToken, userName: username, ...rest  } = result
        expect(username).toEqual(userName);
        expect(userToken).toEqual(token);
        expect(userId).toEqual(id);
        expect(rest).toEqual({ error: '', loading: false, loginLoading: false, loginError: '' })
    })
    it('should update the token', () => {
        const token = 'vergrgrt'
        const result = user(initialState, { type: LOGIN_ACTION,  token })
        const { token: userToken, ...rest  } = result
        expect(userToken).toEqual(token);
        expect(rest).toEqual({ error: '', loading: false, loginLoading: false, userName: '', id: null, loginError: '' })
    })
    it('should change the sign up error state', () => {
        const message = 'this is an error'
        const result = user(initialState, { type: SIGNUP_ERROR, message })
        const { error,  ...rest  } = result
        expect(error).toEqual(message);
        expect(rest).toEqual({ userName: '', token: '', id: null,  loading: false, loginLoading: false, loginError: '' })
    })
    it('should change the login error state', () => {
        const message = 'this is an error'
        const result = user(initialState, { type: LOGIN_ERROR, message })
        const { loginError,  ...rest  } = result
        expect(loginError).toEqual(message);
        expect(rest).toEqual({ userName: '', token: '', id: null,  loading: false, loginLoading: false, error: '' })
    })
    it('should change the sign up START load state', () => {
        const { loading, ...rest } = user(initialState, { type: SIGNUP_START_LOADING });
        expect(loading).toBeTruthy();
        expect(rest).toEqual({ userName: '', token: '', id: null, loginLoading: false, error: '', loginError: '', })
    })
    it('should change the sign up STOP load state', () => {
        const { loading, ...rest } = user(initialState, { type: SIGNUP_STOP_LOADING });
        expect(loading).toBeFalsy();
        expect(rest).toEqual({ userName: '', token: '', id: null, loginLoading: false, error: '', loginError: '', })
    })
    it('should change the login START load state', () => {
        const { loginLoading, ...rest } = user(initialState, { type: LOGIN_START_LOADING });
        expect(loginLoading).toBeTruthy();
        expect(rest).toEqual({ userName: '', token: '', id: null, loading: false, error: '', loginError: '', })
    })
    it('should change the login STOP load state', () => {
        const { loginLoading, ...rest } = user(initialState, { type: LOGIN_STOP_LOADING });
        expect(loginLoading).toBeFalsy();
        expect(rest).toEqual({ userName: '', token: '', id: null, loading: false, error: '', loginError: '', })
    })
})
