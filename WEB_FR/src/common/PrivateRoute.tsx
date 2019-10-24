import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { TOKEN_KEY } from './Constants';
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(TOKEN_KEY) ? (
        <AppLayout>
          <Component {...props} />
        </AppLayout>
      ) : (
          <Redirect to='/' />
        )
    }
  />
);
export default PrivateRoute;