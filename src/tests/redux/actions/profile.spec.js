import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import axios from 'axios';
import { getProfile, profileAction, profileErrorAction, startLoading, stopLoading} from '../../../redux/actions/profile';
import { PROFILE_ACTION, PROFILE_ERROR, PROFILE_START_LOADING, PROFILE_STOP_LOADING } from '../../../redux/actionTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('get profile actions', () => {
    it('should return an action object', () => {
        const id = 5;
        const userName = 'james'
        const result = profileAction(userName, id);
        expect(result.type).toEqual(PROFILE_ACTION);
        expect(result.id).toEqual(id);
        expect(result.userName).toEqual(userName);
    })
    it('should return an error action object', () => {
        const error = 'userName already taken';
        const result = profileErrorAction(error);
        expect(result.type).toEqual(PROFILE_ERROR);
        expect(result.message).toEqual(error);
    })
    it('should return a start loading action object', () => {
        const result = startLoading();
        expect(result.type).toEqual(PROFILE_START_LOADING);
    })
    it('should return a start loading action object', () => {
        const result = stopLoading();
        expect(result.type).toEqual(PROFILE_STOP_LOADING);
    })
    it('should send a thunk action', async () => {
        const userName = 'james';
        const id = 5
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: { user:  { id, userName  } } } }));
        const store = mockStore({ user: {
            userName: '',
            id: null,
            token: '',
            error: '',
            loginError: '',
            loading: false,
            loginLoading: false
        
        } })
        const expectedActions =  [{ type: PROFILE_START_LOADING }, { type: PROFILE_ACTION, id, userName }, { type: PROFILE_STOP_LOADING }]
        await store.dispatch(getProfile('efergrgthty'))
        expect(store.getActions()).toEqual(expectedActions)
    })
    it('should send a thunk action if there is an error', async () => {
        const error = 'this is an error';
        axios.get.mockImplementationOnce(() => Promise.reject({ response: { data: { data: { message: error } } } }));
        const store = mockStore({ user: {
            userName: '',
            id: null,
            token: '',
            error: '',
            loginError: '',
            loading: false,
            loginLoading: false
        
        } })
        const expectedActions =  [{ type: PROFILE_START_LOADING }, { type: PROFILE_ERROR, message: error }, { type: PROFILE_STOP_LOADING } ]
        await store.dispatch(getProfile('tokensdsdfds'))
        expect(store.getActions()).toEqual(expectedActions)
    })
})
