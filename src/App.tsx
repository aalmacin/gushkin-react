import React, { Suspense } from 'react';
import classes from './App.module.scss';
import {
  Switch, Route, BrowserRouter as Router,
} from "react-router-dom";
import MainNav from 'MainNav';
import Loading from 'complib/Loading';
import Helmet from 'react-helmet'

const Main = React.lazy(() => import('./pages/main/Main'));
const Home = React.lazy(() => import('./pages/home/Home'));

function App() {
  return (
    <div className={classes.App}>
      <Helmet>
        <title>Welcome to Gushkin</title>
      </Helmet>
      <Router>
        <MainNav />
        <Switch>
          <Route path="/main">
            <Suspense fallback={<Loading />}>
              <Main />
            </Suspense>
          </Route>
          <Route path="/">
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
