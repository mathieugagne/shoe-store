import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BaseTemplate from './modules/app/components/BaseTemplate';
import AppRoutes from './modules/app/AppRoutes';
import NotificationRoutes from './modules/notification/NotificationRoutes';
import ShoeRoutes from './modules/shoe/ShoeRoutes';
import StoreRoutes from './modules/store/StoreRoutes';
import Error404 from './modules/app/pages/Error404';

function Routes() {
  return (
    <BaseTemplate>
      <Switch>
        <Route path="/notifications" component={NotificationRoutes} />
        <Route path="/shoes" component={ShoeRoutes} />
        <Route path="/stores" component={StoreRoutes} />
        <Route path="/" component={AppRoutes} />
        <Route path="*" component={Error404} />
      </Switch>
    </BaseTemplate>
  );
}

export default Routes;
