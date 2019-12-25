import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./common/PrivateRoute";
import Dashboard from "./app/Dashboard/Dashboard";
import SignIn from "./app/Login/SignIn";
import { STATIC_ROUTE } from "./common/Constants";
import Department from "./app/Department/Department";
import Patient from "./app/Patient/Patient";
import Doctor from "./app/Doctor/Doctor";
import Medicine from "./app/Medicine/Medicine";
import Sevices from "./app/ServicesExamination/Services";
import ClinicManager from "./app/Admin/ClinicManager/ClinicManager";
import UserManager from "./app/Admin/UserManager/UserManager";
import ReceivePatient from "./app/Receptionist/ReceivePatient/ReceivePatient";
import PendingMedical from "./app/Receptionist/PendingMedical/PendingMedical";
import Medical from "./app/DoctorClinic/Medical/index";
import PharmacistPrescription from "./containers/Pharmacist/Prescription";

class App extends React.Component {
  public token = "";
  constructor(props: any) {
    super(props);
  }

  render() {
    // const accountInfo: any =
    //   JSON.parse(localStorage.getItem(ACCOUNT_INFO) || "{}") || {};

    return (
      <Switch>
        {/* <PrivateRoute path={STATIC_ROUTE.HOME} component={Dashboard} /> */}
        {/* new vesion */}
        <PrivateRoute path={STATIC_ROUTE.PATIENT} component={Patient} />
        <PrivateRoute path={STATIC_ROUTE.MEDICINE} component={Medicine} />
        <PrivateRoute path={STATIC_ROUTE.PRESCRIPTION} component={PharmacistPrescription} />
        {/* admin */}
        <PrivateRoute path={STATIC_ROUTE.CLINIC_MANAGER} component={ClinicManager} />
        <PrivateRoute path={STATIC_ROUTE.USER_MANAGER} component={UserManager} />
        <PrivateRoute path={STATIC_ROUTE.SERVICES} component={Sevices} />
        <PrivateRoute path={STATIC_ROUTE.DOCTOR} component={Doctor} />
        <PrivateRoute path={STATIC_ROUTE.DEPARTMENT} component={Department} />
        <PrivateRoute path={STATIC_ROUTE.RECEIVE_PATIENT} component={ReceivePatient} />
        <PrivateRoute path={STATIC_ROUTE.PENDING_MEDICAL} component={PendingMedical} />
        {/* kham benh */}
        <PrivateRoute path={STATIC_ROUTE.DOCTOR_MEDICAL} component={Medical} />
        <Route path="/" component={SignIn} />
        <Route path={STATIC_ROUTE.LOGIN} component={SignIn} />
      </Switch>
    );
  }
}

export default App;
