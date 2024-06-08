import axios from 'axios';
import { apiBaseUrl } from '../../config/urlConfig';

export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';

export const signUp = (user) => async dispatch => {
    try {
        const res = await axios.post(`${apiBaseUrl}/api/register`, user);
        const { response: { email, username, _id, profile_photo }, token } = res.data

        localStorage.setItem("token", token);

        dispatch({
            type: SIGN_UP,
            payload: { email, username, id: _id, profilePhoto: profile_photo }
        });
        return Promise.resolve();
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response && error.response.data ? error.response.data.message : 'Sign up failed'
        });
        return Promise.reject();
    }
};

export const login = (user) => async dispatch => {
    try {
        const res = await axios.post(`${apiBaseUrl}/api/login`, user);
        const { user: { email, username, _id, profile_photo }, token } = res.data

        localStorage.setItem("token", token);

        if (user.email && user.password && user) {
            dispatch({
                type: LOGIN,
                payload: { email, username, id: _id, profilePhoto: profile_photo }
            });
            return Promise.resolve();
        } else {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Invalid credentials'
            });
            return Promise.reject();
        }
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response && error.response.data ? error.response.data.message : 'Login failed'
        });
        return Promise.reject();
    }
};

export const logout = () => dispatch => {

    localStorage.removeItem("token");

    dispatch({
        type: LOGOUT
    });
    return Promise.resolve();
};


