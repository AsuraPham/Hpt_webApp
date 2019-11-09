import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./common/PrivateRoute";
import Dashboard from "./app/Dashboard/Dashboard";
import SignIn from "./app/Login/SignIn";
import adalContext from "./common/authConfig";
import { STATIC_ROUTE } from "./common/Constants";
import Notifications from "./app/Notifications/Notifications";
import Department from "./app/Department/Department";
import Patient from "./app/Patient/Patient";
import Doctor from "./app/Doctor/Doctor";
import Medicine from "./app/Medicine/Medicine";
import Sevices from "./app/ServicesExamination/Services";

class App extends React.Component {
  public token = "";
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <PrivateRoute
          path={STATIC_ROUTE.NOTIFICATION}
          component={Notifications}
        />
        <PrivateRoute path={STATIC_ROUTE.HOME} component={Dashboard} />
        {/* new vesion */}
        <PrivateRoute path={STATIC_ROUTE.DEPARTMENT} component={Department} />
        <PrivateRoute path={STATIC_ROUTE.PATIENT} component={Patient} />
        <PrivateRoute path={STATIC_ROUTE.DOCTOR} component={Doctor} />
        <PrivateRoute path={STATIC_ROUTE.MEDICINE} component={Medicine} />
        <PrivateRoute path={STATIC_ROUTE.SERVICES} component={Sevices} />
        <Route
          path="/signin-oidc"
          render={() => adalContext.AuthContext.handleWindowCallback()}
        />
        <Route path="/" component={SignIn} />
        <Route path={STATIC_ROUTE.LOGIN} component={SignIn} />
      </Switch>
    );
  }
}

export default App;
