import React, { Suspense } from 'react';
import classes from './Main.module.scss';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';


import Loading from 'complib/Loading';

const Store = React.lazy(() => import('./store/Store'));
const BoughtItems = React.lazy(() => import('./bought-items/BoughtItems'));
const Activities = React.lazy(() => import('./activities/Activities'));

function Main() {
  const match = useRouteMatch();

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
