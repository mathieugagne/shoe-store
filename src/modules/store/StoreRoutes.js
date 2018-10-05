import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Error404 from '../app/pages/Error404';
import StoreBrowse from './pages/StoreBrowse';
import StoreRead from './pages/StoreRead';

function StoreRoutes() {
  return (
    <Switch>
      <Route path="/stores/:storeId" component={StoreRead} />
      <Route path="/stores" component={StoreBrowse} />
      <Route path="*" component={Error404} />
    </Switch>
  );
}

export default StoreRoutes;
