import chat from '../../../redux/reducers/chat';
import { 
   START_CHAT_ACTION, START_CHAT_ERROR, START_CHAT_LOADING_START, START_CHAT_LOADING_STOP
} from '../../../redux/actionTypes';

const initialState = {
    userName: '',
    id: null,
    error: '',
    loading: false,

}
describe('user reducer', () => {
    it('should update the id and userName', () => {
        const userName = 'james'
        const id = 5;
        const result = chat(initialState, { type:  START_CHAT_ACTION, userName, id })
        const { id: userId, token: userToken, userName: username, ...rest  } = result
        expect(username).toEqual(userName);
        expect(userId).toEqual(id);
        expect(rest).toEqual({ error: '', loading: false })
    })
    it('should change the start chat error state', () => {
        const message = 'this is an error'
        const result = chat(initialState, { type: START_CHAT_ERROR, message })
        const { error,  ...rest  } = result
        expect(error).toEqual(message);
        expect(rest).toEqual({ userName: '', id: null,  loading: false, })
    })

    it('should change the start chat START load state', () => {
        const { loading, ...rest } = chat(initialState, { type: START_CHAT_LOADING_START });
        expect(loading).toBeTruthy();
        expect(rest).toEqual({ userName: '', id: null, error: ''})
    })
    it('should change the start chat STOP load state', () => {
        const { loading, ...rest } = chat(initialState, { type: START_CHAT_LOADING_STOP });
        expect(loading).toBeFalsy();
        expect(rest).toEqual({ userName: '', id: null, error: '' })
    })
})
