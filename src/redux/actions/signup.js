import axios from 'axios';
import { SIGNUP_ACTION, SIGNUP_ERROR, SIGNUP_START_LOADING, SIGNUP_STOP_LOADING } from '../actionTypes';
export const signupAction = (userName, id, token) => ({ type: SIGNUP_ACTION, userName, id, token });
export const startLoading = () => ({ type: SIGNUP_START_LOADING});
export const stopLoading = () => ({ type: SIGNUP_STOP_LOADING});
export const signUpErrorAction = (message) => ({ type: SIGNUP_ERROR, message})

export const signUp = (user) => async dispatch => {
    try{
    dispatch(startLoading());
    const res = await axios.post(`${process.env.BACKEND_LINK}/api/v1/user/signup`, user);
    localStorage.setItem('token', res.data.data.token)
    dispatch(stopLoading());
    return dispatch(signupAction(res.data.data.user.userName, res.data.data.user.id, res.data.data.token));
    }
    catch(error){
        dispatch(stopLoading())
        return dispatch(signUpErrorAction(error.response.data.data.message))
    }
}
