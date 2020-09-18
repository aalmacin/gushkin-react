import React from 'react';
import classes from './MainNav.module.scss';
import { useAuth0 } from '@auth0/auth0-react';

function MainNav() {
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect, logout } = useAuth0();

  const performLogin = (e: any) => {
    loginWithRedirect();
    e.preventDefault();
  };

  const performLogout = (e: any) => {
    logout();
    e.preventDefault();
  };

  return (
    <div className={classes.MainNav}>
      <h1 className={classes.Logo}>Gushkin</h1>
      {isAuthenticated ?
        <a onClick={performLogout} href="#logout" className={classes.SignOut}>
          Sign Out
      </a>
        :
        <a onClick={performLogin} href="#login" className={classes.SignIn}>
          Sign In
      </a>
      }
    </div>
  );
}

export default MainNav;
