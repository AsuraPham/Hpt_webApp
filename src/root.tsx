import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { combineEpics } from "redux-observable";
import { reducer as toastrReducer } from "react-redux-toastr";
// reducer
import departmentState from "./app/Department/DepartmentReducer";
import patientState from "./app/Patient/PatientReducer";
import doctorState from "./app/Doctor/DoctorReducer";
import servicesState from "./app/ServicesExamination/ServicesReducer";
import medicineState from "./app/Medicine/MedicineReducer";
import authState from "./app/Login/AuthReducer";
import kindOfRoomState from "./containers/Admin/KindOfRoomContainers/KindOfRoomReducer";
import clinicState from "./containers/Admin/ClinicContainers/ClinicReducer";
import roleState from "./containers/Admin/RoleContainers/RoleReducer";
import userState from "./containers/Admin/UserContainers/UserReducer";
import pendingMedicalState from "./containers/Receptionist/PendingMedical/PendingMedicalReducer";

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
import { ServicesState } from "./app/ServicesExamination/models/ServicesState";
import { MedicineState } from "./app/Medicine/models/MedicineState";
import { KindOfRoomState } from "./containers/Admin/KindOfRoomContainers/models/KindOfRoomState";
import { ClinicState } from "./containers/Admin/ClinicContainers/models/ClinicState";
import { RoleState } from "./containers/Admin/RoleContainers/models/RoleState";
import { UserState } from "./containers/Admin/UserContainers/models/UserState";
import { PendingMedicalState } from "./containers/Receptionist/PendingMedical/models/PendingMedicalState";

// epic
import { deparmentEpics } from "./app/Department/DepartmentEpic";
import { patientEpics } from "./app/Patient/PatientEpic";
import { doctorEpics } from "./app/Doctor/DoctorEpic";
import { servicesEpics } from "./app/ServicesExamination/ServicesEpic";
import { medicineEpics } from "./app/Medicine/MedicineEpic";
import { kindOfRoomEpics } from "./containers/Admin/KindOfRoomContainers/KindOfRoomEpic";
import { clinicEpics } from "./containers/Admin/ClinicContainers/ClinicEpic";
import { roleEpics } from "./containers/Admin/RoleContainers/RoleEpic";
import { userEpics } from "./containers/Admin/UserContainers/UserEpic";
import { pendingMedicalEpic } from "./containers/Receptionist/PendingMedical/PendingMedicalEpic";

export interface State {
  authState: AuthState;
  departmentState: DepartmentState;
  dashboardState: DashboardState;
  notificationState: NotificationState;
  patientState: PatientState;
  doctorState: DoctorState;
  servicesState: ServicesState;
  medicineState: MedicineState;
  kindOfRoomState: KindOfRoomState;
  clinicState: ClinicState;
  roleState: RoleState;
  userState: UserState;
  pendingMedicalState: PendingMedicalState;
}

export const rootEpic = (action$: any, store?: any) =>
  combineEpics(
    authEpics,
    deparmentEpics,
    dashboardEpics,
    notificationEpic,
    patientEpics,
    doctorEpics,
    servicesEpics,
    medicineEpics,
    kindOfRoomEpics,
    clinicEpics,
    roleEpics,
    userEpics,
    pendingMedicalEpic
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
  doctorState,
  servicesState,
  medicineState,
  kindOfRoomState,
  clinicState,
  roleState,
  userState,
  pendingMedicalState
});
