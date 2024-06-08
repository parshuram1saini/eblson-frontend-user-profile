import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import "./App.css"
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UserProfileDashboard from './components/UserProfileDashboard';
import HOC from './components/Common/HOC';

function App() {

  const UserProfileDashboardComponent = HOC(UserProfileDashboard)
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/profile" element={<UserProfileDashboardComponent />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Provider>
  );
}

export default App;
