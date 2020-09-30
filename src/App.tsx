import React, { Suspense, useEffect } from "react";
import classes from "./App.module.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import MainNav from "MainNav";
import Loading from "components/Loading";
import Helmet from "react-helmet";
import { useAuth0 } from "@auth0/auth0-react";
import SideNav from "SideNav";
import { useToast } from "components/Toast/useToast";

const Main = React.lazy(() => import("./pages/main/Main"));
const Home = React.lazy(() => import("./pages/home/Home"));

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((accessToken) => {
        localStorage.setItem("jwt", accessToken);
      });
    }
  }, [isAuthenticated, getAccessTokenSilently]);
  const { toast } = useToast();
  return (
    <div className={classes.App}>
      {toast}
      <Helmet>
        <title>Welcome to Gushkin</title>
      </Helmet>
      <Router>
        <MainNav />
        <div className={classes.Content}>
          <SideNav />
          <div className={classes.Page}>
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
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
