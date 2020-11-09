import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import axios from 'axios';
import { login, loginAction, loginError, startLoading, stopLoading} from '../../../redux/actions/login';
import { LOGIN_ACTION, LOGIN_ERROR, LOGIN_START_LOADING, LOGIN_STOP_LOADING } from '../../../redux/actionTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('sign in actions', () => {
    it('should return an action object', () => {
        const token = 'vergrgrt'
        const result = loginAction(token);
        expect(result.type).toEqual(LOGIN_ACTION);
        expect(result.token).toEqual(token);
    })
    it('should return an error action object', () => {
        const error = 'userName already taken';
        const result = loginError(error);
        expect(result.type).toEqual(LOGIN_ERROR);
        expect(result.message).toEqual(error);
    })
    it('should return a start loading action object', () => {
        const result = startLoading();
        expect(result.type).toEqual(LOGIN_START_LOADING);
    })
    it('should return a start loading action object', () => {
        const result = stopLoading();
        expect(result.type).toEqual(LOGIN_STOP_LOADING);
    })
    it('should send a thunk action', async () => {
        const token = 'vergrgrt'
        axios.post.mockImplementationOnce(() => Promise.resolve({ data: { data: { token } } }));
        const store = mockStore({ user: {
            userName: '',
            id: null,
            token: '',
            error: '',
            loginError: '',
            loading: false,
            loginLoading: false
        
        } })
        const expectedActions =  [{ type: LOGIN_START_LOADING }, { type: LOGIN_STOP_LOADING },{ type: LOGIN_ACTION, token }]
        await store.dispatch(login())
        expect(store.getActions()).toEqual(expectedActions)
    })
    it('should send a thunk action if there is an error', async () => {
        const error = 'this is an error'
        axios.post.mockImplementationOnce(() => Promise.reject({ response: { data: { data: { error } } } }));
        const store = mockStore({ user: {
            userName: '',
            id: null,
            token: '',
            error: '',
            loginError: '',
            loading: false,
            loginLoading: false
        
        } })
        const expectedActions =  [{ type: LOGIN_START_LOADING }, { type: LOGIN_ERROR, message: error }, { type: LOGIN_STOP_LOADING }]
        await store.dispatch(login())
        expect(store.getActions()).toEqual(expectedActions)
    })
})
