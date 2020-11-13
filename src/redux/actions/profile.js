import axios from 'axios';
import { PROFILE_ACTION, PROFILE_ERROR, PROFILE_START_LOADING, PROFILE_STOP_LOADING } from '../actionTypes';
export const profileAction = (userName, id) => ({ type: PROFILE_ACTION, userName, id });
export const startLoading = () => ({ type: PROFILE_START_LOADING});
export const stopLoading = () => ({ type: PROFILE_STOP_LOADING});
export const profileErrorAction = (message) => ({ type: PROFILE_ERROR, message})

export const getProfile = (token) => async dispatch => {
    try{
    dispatch(startLoading());
    const res = await axios.get(`${process.env.BACKEND_LINK}/api/v1/user/profile`, {
        headers: {
            token
        }
    });
    
    dispatch(profileAction(res.data.data.user.userName, res.data.data.user.id));
    return dispatch(stopLoading());
    }
    catch(error){
        dispatch(profileErrorAction(error.response.data.data.message))
        return dispatch(stopLoading())
    }
}
