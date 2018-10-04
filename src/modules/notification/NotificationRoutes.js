import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Error404 from '../app/pages/Error404';
import NotificationBrowse from './pages/NotificationBrowse';

function NotificationRoutes() {
  return (
    <Switch>
      <Route path="/notifications" component={NotificationBrowse} />
      <Route path="*" component={Error404} />
    </Switch>
  );
}

export default NotificationRoutes;
