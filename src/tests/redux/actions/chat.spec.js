import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import axios from 'axios';
import { startChat, startChatAction, chatErrorAction, startLoading, stopLoading } from '../../../redux/actions/chat';
import {  START_CHAT_ACTION, START_CHAT_ERROR, START_CHAT_LOADING_START, START_CHAT_LOADING_STOP } from '../../../redux/actionTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('start chat actions', () => {
    it('should return an action object', () => {
        const id = 5;
        const userName = 'james'
        const result = startChatAction(userName, id);
        expect(result.type).toEqual(START_CHAT_ACTION);
        expect(result.id).toEqual(id);
        expect(result.userName).toEqual(userName);
    })
    it('should return an error action object', () => {
        const error = 'userName already taken';
        const result = chatErrorAction(error);
        expect(result.type).toEqual(START_CHAT_ERROR);
        expect(result.message).toEqual(error);
    })
    it('should return a start loading action object', () => {
        const result = startLoading();
        expect(result.type).toEqual(START_CHAT_LOADING_START);
    })
    it('should return a start loading action object', () => {
        const result = stopLoading();
        expect(result.type).toEqual(START_CHAT_LOADING_STOP);
    })
    it('should send a thunk action', async () => {
        const userName = 'james';
        const id = 5
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: { friend:  { id, userName  } } } }));
        const store = mockStore({ user: {
            userName: '',
            id: null,
            token: '',
            error: '',
            loginError: '',
            loading: false,
            loginLoading: false
        
        }, friend: {
            userName: '',
            id: null,
            loading: false,
            error: ''
        } })
        const expectedActions =  [{ type: START_CHAT_LOADING_START }, { type: START_CHAT_ACTION, id, userName }, { type: START_CHAT_LOADING_STOP }]
        await store.dispatch(startChat('efergrgthty', userName, id))
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
        
        }, friend: {
            userName: '',
            id: null,
            loading: false,
            error: ''
        } })
        const expectedActions =  [{ type: START_CHAT_LOADING_START }, { type: START_CHAT_ERROR, message: error }, { type: START_CHAT_LOADING_STOP } ]
        await store.dispatch(startChat('tokensdsdfds'))
        expect(store.getActions()).toEqual(expectedActions)
    })
})
