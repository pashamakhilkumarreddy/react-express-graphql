import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from '../components/common/Loader';

export default () => 
  <Suspense fallback={<Loader />}>
    <Switch>
      <Redirect from="/" to="/login" exact />
      <Route path="/login" component={lazy(() => import('../pages/Login'))} exact />
      <Route path="/events" component={lazy(() => import('../pages/Events'))}  exact />
      <Route path="/bookings" component={lazy(() => import('../pages/Bookings'))} exact />
    </Switch>
  </Suspense>
