import axios from 'axios';
import { apiBaseUrl } from '../../config/urlConfig';

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const GET_PROFILE = 'GET_PROFILE';
export const SAVE_PROFILE_PHOTO = 'SAVE_PROFILE_PHOTO';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const getUserProfile = (token) => async dispatch => {
  dispatch({ type: FETCH_PROFILE_REQUEST });
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const res = await axios.get(`${apiBaseUrl}/api/profile`, { headers: headers });
    const { email, username, _id, profile_photo } = res.data.user
    dispatch({
      type: GET_PROFILE,
      payload: { email, username, id: _id, profilePhoto: `${apiBaseUrl + profile_photo}` }
    });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.message });
    return Promise.reject();
  }
}


export const saveProfileImage = (formData, token) => async dispatch => {
  dispatch({ type: FETCH_PROFILE_REQUEST });
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    await axios.post(`${apiBaseUrl}/api/profile/photo`, formData, { headers: headers });

    dispatch({
      type: SAVE_PROFILE_PHOTO,
    });
    return Promise.resolve();
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.response.data.message });
    return Promise.reject();
  }

}
