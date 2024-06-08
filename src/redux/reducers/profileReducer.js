import { FETCH_PROFILE_FAILURE, FETCH_PROFILE_REQUEST, GET_PROFILE, SAVE_PROFILE_PHOTO } from "../actions/profileActions";

const initialState = {
  userProfile: null,
  loading: false,
  error: null,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
        error: null
      };
    case SAVE_PROFILE_PHOTO:
      return {
        ...state,
        loading: false,
        error: null
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
