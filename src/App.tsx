import React from 'react';
import logo from './logo.svg';
import './App.scss';
import LoginButton from 'authentication/LoginButton';
import LogoutButton from 'authentication/LogoutButton';
import Profile from 'authentication/Profile';
import Button from 'complib/Button';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated } = useAuth0()
  return (
    <div className="App">
      <Profile />
      {isAuthenticated ?
        <LogoutButton /> :
        <LoginButton />}
    </div>
  );
}

export default App;
