import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { combineEpics } from "redux-observable";
import { reducer as toastrReducer } from "react-redux-toastr";
// reducer
import departmentState from "./app/Department/DepartmentReducer";
import patientState from "./app/Patient/PatientReducer";
import doctorState from "./app/Doctor/DoctorReducer";
import authState from "./app/Login/AuthReducer";

import { AuthState } from "./app/Login/models/AuthState";
import { authEpics } from "./app/Login/AuthEpics";
import { DashboardState } from "./app/Dashboard/models/DashboardState";
import { dashboardEpics } from "./app/Dashboard/DashboardEpic";
import dashboardState from "./app/Dashboard/DashboardReducer";
import { NotificationState } from "./app/Notifications/models/NotificationState";
import notificationState from "./app/Notifications/NotificationReducer";
import { notificationEpic } from "./app/Notifications/NotificationEpics";
// state
import { DepartmentState } from "./app/Department/models/DepartmentState";
import { PatientState } from "./app/Patient/models/PatientState";
import { DoctorState } from "./app/Doctor/models/DoctorState";
// epic
import { deparmentEpics } from "./app/Department/DepartmentEpic";
import { patientEpics } from "./app/Patient/PatientEpic";
import { doctorEpics } from "./app/Doctor/DoctorEpic";

export interface State {
  authState: AuthState;
  departmentState: DepartmentState;
  dashboardState: DashboardState;
  notificationState: NotificationState;
  patientState: PatientState;
  doctorState: DoctorState;
}

export const rootEpic = (action$: any, store?: any) =>
  combineEpics(
    authEpics,
    deparmentEpics,
    dashboardEpics,
    notificationEpic,
    patientEpics,
    doctorEpics
  )(action$, store).catch((error: any, stream: any) => {
    // tslint:disable-next-line:no-console
    console.error("Uncaught", error.stack);
    return stream;
  });

export const rootReducer = combineReducers<State>({
  routing: routerReducer,
  toastr: toastrReducer,
  authState,
  departmentState,
  patientState,
  dashboardState,
  notificationState,
  doctorState
});
