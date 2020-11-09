import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import axios from 'axios';
import { signUp, signupAction, signUpErrorAction, startLoading, stopLoading} from '../../../redux/actions/signup';
import { SIGNUP_ACTION, SIGNUP_ERROR, SIGNUP_START_LOADING, SIGNUP_STOP_LOADING } from '../../../redux/actionTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('sign up actions', () => {
    it('should return an action object', () => {
        const userName = 'james';
        const id = 5;
        const token = 'vergrgrt'
        const result = signupAction(userName, id, token);
        expect(result.type).toEqual(SIGNUP_ACTION);
        expect(result.userName).toEqual(userName);
        expect(result.id).toEqual(id);
        expect(result.token).toEqual(token);
    })
    it('should return an error action object', () => {
        const error = 'userName already taken';
        const result = signUpErrorAction(error);
        expect(result.type).toEqual(SIGNUP_ERROR);
        expect(result.message).toEqual(error);
    })
    it('should return a start loading action object', () => {
        const result = startLoading();
        expect(result.type).toEqual(SIGNUP_START_LOADING);
    })
    it('should return a start loading action object', () => {
        const result = stopLoading();
        expect(result.type).toEqual(SIGNUP_STOP_LOADING);
    })
    it('should send a thunk action', async () => {
        const userName = 'james'
        const id = 5;
        const token = 'vergrgrt'
        axios.post.mockImplementationOnce(() => Promise.resolve({ data: { data: { token, user: { id, userName } } } }));
        const store = mockStore({ user: {
            userName: '',
            id: null,
            token: '',
            error: '',
            loginError: '',
            loading: false,
            loginLoading: false
        
        } })
        const expectedActions =  [{ type: SIGNUP_START_LOADING }, { type: SIGNUP_STOP_LOADING },{ type: SIGNUP_ACTION, userName, id, token }]
        await store.dispatch(signUp())
        expect(store.getActions()).toEqual(expectedActions)
    })
    it('should send a thunk action if there is an error', async () => {
        const message = 'this is an error'
        axios.post.mockImplementationOnce(() => Promise.reject({ response: { data: { data: { message } } } }));
        const store = mockStore({ user: {
            userName: '',
            id: null,
            token: '',
            error: '',
            loginError: '',
            loading: false,
            loginLoading: false
        
        } })
        const expectedActions =  [{ type: SIGNUP_START_LOADING }, { type: SIGNUP_STOP_LOADING },{ type: SIGNUP_ERROR, message }]
        await store.dispatch(signUp())
        expect(store.getActions()).toEqual(expectedActions)
    })
})
