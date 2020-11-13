import axios from 'axios';
import { START_CHAT_ACTION, START_CHAT_ERROR, START_CHAT_LOADING_START, START_CHAT_LOADING_STOP } from '../actionTypes';
export const startChatAction = (userName, id) => ({ type: START_CHAT_ACTION, userName, id });
export const startLoading = () => ({ type: START_CHAT_LOADING_START});
export const stopLoading = () => ({ type: START_CHAT_LOADING_STOP});
export const chatErrorAction = (message) => ({ type: START_CHAT_ERROR, message})

export const startChat = (token, userName) => async dispatch => {
    try{
    dispatch(startLoading());
    const res = await axios.get(`${process.env.BACKEND_LINK}/api/v1/chat/join/${userName}`, {
        headers: {
            token
        }
    });
    
    dispatch(startChatAction(res.data.data.friend.userName, res.data.data.friend.id));
    return dispatch(stopLoading());
    }
    catch(error){
        dispatch(chatErrorAction(error.response.data.data.message))
        return dispatch(stopLoading())
    }
}
