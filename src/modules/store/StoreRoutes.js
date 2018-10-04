import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Error404 from '../app/pages/Error404';
import StoreBrowse from './pages/StoreBrowse';

function StoreRoutes() {
  return (
    <Switch>
      <Route path="/stores" component={StoreBrowse} />
      <Route path="*" component={Error404} />
    </Switch>
  );
}

export default StoreRoutes;
