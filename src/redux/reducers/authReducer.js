
import { SIGN_UP, LOGIN, LOGOUT, AUTH_ERROR } from "../actions/authActions";

const initialState = {
    isAuthenticated: true,
    user: null,
    error: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null
            };
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        default:
            return state;
    }
}

