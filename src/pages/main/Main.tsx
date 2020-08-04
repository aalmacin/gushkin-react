import React, { Suspense } from 'react';
import classes from './Main.module.scss';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';


import Loading from 'complib/Loading';
import { useAuth0 } from '@auth0/auth0-react';

const Store = React.lazy(() => import('./store/Store'));
const BoughtItems = React.lazy(() => import('./bought-items/BoughtItems'));
const Activities = React.lazy(() => import('./activities/Activities'));

function Main() {
  const match = useRouteMatch();
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div className={classes.Main}>
      <Switch>
        <Route path={`${match.path}/store`}>
          <Suspense fallback={<Loading />}>
            <Store />
          </Suspense>
        </Route>
        <Route path={`${match.path}/history`}>
          <Suspense fallback={<Loading />}>
            <BoughtItems />
          </Suspense>
        </Route>
        <Route path={`${match.path}`}>
          <Suspense fallback={<Loading />}>
            <Activities />
          </Suspense>
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
