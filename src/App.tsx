import React from 'react';
import logo from './logo.svg';
import './App.scss';
import LoginButton from './authentication/LoginButton/LoginButton';
import LogoutButton from './authentication/LogoutButton/LogoutButton';
import Profile from './authentication/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Profile />
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;
