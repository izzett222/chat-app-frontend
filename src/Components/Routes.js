import React from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";
  import LandingPage from './LandingPage';
  import Login from './login/Login';
  import NotFound from './NotFound';
  import JoinChat from './chat/JoinChat';

  const Routes = () => {
      return (
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/joinChat" exact>
          <JoinChat />
        </Route>
        <Route path="*" exact>
          <NotFound />
        </Route>
      </Switch>)
  }

  export default Routes;
