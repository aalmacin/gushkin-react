import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import classes from './Home.module.scss';

function Home() {
  const { isAuthenticated } = useAuth0()

  return (
    <div className={classes.Home}>
      <h2>Home</h2>
      <p>{isAuthenticated ? 'Logged in' : 'Not logged in'}</p>
    </div>
  )
}

export default Home;
