import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Error404 from './pages/Error404';
import Overview from './pages/OverviewPage';

function AppRoutes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/overview" />
      <Route path="/overview" component={Overview} />
      <Route path="*" component={Error404} />
    </Switch>
  );
}

export default AppRoutes;
