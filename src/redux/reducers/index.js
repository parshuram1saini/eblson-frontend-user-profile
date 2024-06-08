import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  userProfileData: profileReducer,
  auth : authReducer
});

export default rootReducer;
