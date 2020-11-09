import React from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";
  import LandingPage from './LandingPage';
  import Login from './login/Login';
  import NotFound from './NotFound';

  const Routes = () => {
      return (
      <Switch>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/login" exact component={Login}/>
        <Route path="*" exact component={NotFound} />
      </Switch>)
  }

  export default Routes;
