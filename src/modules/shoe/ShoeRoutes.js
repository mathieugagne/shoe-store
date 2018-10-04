import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Error404 from '../app/pages/Error404';
import ShoeBrowse from './pages/ShoeBrowse';

function ShoeRoutes() {
  return (
    <Switch>
      <Route path="/shoes" component={ShoeBrowse} />
      <Route path="*" component={Error404} />
    </Switch>
  );
}

export default ShoeRoutes;
