import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from '../components/common/Loader';

import NotFound from '../components/Errors/NotFound';

import { AuthContext } from '../context';

export default () =>
  <AuthContext.Consumer>
    {
      (context) =>
      <Suspense fallback={<Loader />}>
        <Switch>
          { !context.token && <Redirect from="/" to="/login" exact /> }
          { context.token && <Redirect from="/" to="/events" exact /> }
          { context.token && <Redirect from="/login" to="/events" exact /> }
          {
            !context.token && <Route path="/login" component={lazy(() => import('../pages/Login'))} exact />
          }          
          {
            !context.token && <Route path="/signup" component={lazy(() => import('../pages/SignUp'))} exact />
          }                    
          <Route path="/events" component={lazy(() => import('../pages/Events'))}  exact />
          {
            context.token && <Route path="/bookings" component={lazy(() => import('../pages/Bookings'))} exact />
          }  
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    }
  </AuthContext.Consumer>
