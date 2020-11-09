import axios from 'axios';
import { LOGIN_ACTION, LOGIN_ERROR, LOGIN_START_LOADING, LOGIN_STOP_LOADING } from '../actionTypes';
export const loginAction = (token) => ({ type: LOGIN_ACTION, token });
export const startLoading = () => ({ type: LOGIN_START_LOADING});
export const stopLoading = () => ({ type: LOGIN_STOP_LOADING});
export const loginError = (message) => ({ type: LOGIN_ERROR, message})

export const login = (user) => async dispatch => {
    try{
    dispatch(startLoading());
    const res = await axios.post(`${process.env.BACKEND_LINK}/api/v1/user/login`, user);
    localStorage.setItem('token', res.data.data.token)
    dispatch(stopLoading());
    return dispatch(loginAction(res.data.data.token));
    }
    catch(error){
        dispatch(loginError(error.response.data.data.error))
        return dispatch(stopLoading())
    }
}
