import { combineEpics } from "redux-observable";
import { toastr } from "react-redux-toastr";
import { Observable } from "rxjs";

import { handleApiError } from "../../common/handleApiError";
import { GetPagination } from "../../common/models/Pagination";
import { CREATE_SUCCESS, CREATE_FAIL, DELETE_SUCCESS, EDIT_FAIL, SAVE_SUCCESS } from "../../common/const/message";
import CommonResponse from "../../common/models/CommonResponse";
import { PAGE_SIZE } from "../../common/Constants";

import * as actionType from "./actionType";
import * as patientAction from "./PatientAction";
import PatientService from "./PatientService";
import { PatientItem } from "./models/PatientModel";
import { PatientState } from "./models/PatientState";

const getPatientListEpic = (action$: any) =>
  action$.ofType(actionType.GET_PATIENT_LIST).mergeMap((action: any) => {
    return PatientService.getListPatient(action.payload)
      .map((response: CommonResponse<PatientItem[]>) => {
        if (!response.hasErrors) {
          let result = {
            pagination: GetPagination(response.meta),
            result: response.result
          };
          return patientAction.getPatientListSuccess(result);
        } else {
          return patientAction.getPatientListFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const createPatientEpic = (action$: any) =>
  action$.ofType(actionType.CREATE_PATIENT).mergeMap((action: any) => {
    return PatientService.createPatient(action.payload)
      .map((result: any) => {
        let response = result.response;
        if (!response.hasErrors) {
          toastr.success("", CREATE_SUCCESS);
          return patientAction.createPatientSuccess(response.result);
        } else {
          toastr.error("", CREATE_FAIL);
          return patientAction.createPatientFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const editPatientEpic = (action$: any) =>
  action$.ofType(actionType.EDIT_PATIENT).mergeMap((action: any) => {
    return PatientService.editPatient(action.payload)
      .map((result: any) => {
        let response = result.response;
        if (!response.hasErrors) {
          toastr.success("", SAVE_SUCCESS);
          return patientAction.editPatientSuccess(response.result);
        } else {
          toastr.error("", EDIT_FAIL);
          return patientAction.editPatientFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const deletePatientEpic = (action$: any) => action$.ofType(actionType.DELETE_PATIENT).mergeMap((action: any) => {
  let request = action.payload;
  return PatientService.deletePatient(request)
    .map((result: any) => {
      let response = result.response;
      if (!response.hasErrors) {
        toastr.success("", DELETE_SUCCESS);
        return patientAction.deletePatientSuccess(response);
      } else {
        return patientAction.deletePatientFail(response);
      }
    }).catch(error => handleApiError(error));
});

const saveSuccessEpic = (action$: any, store) =>
  action$.ofType(actionType.CREATE_PATIENT_SUCCESS, actionType.DELETE_PATIENT_SUCCESS, actionType.EDIT_PATIENT_SUCCESS).mergeMap(() => {
    let state: PatientState = store.getState().patientState;
    const searchReq = {
      pageIndex: state.pagination ? state.pagination.current : 1,
      pageSize: PAGE_SIZE,
      keyword: ""
    };
    return Observable.of(patientAction.getPatientList(searchReq));
  });

export const patientEpics = combineEpics(
  createPatientEpic,
  getPatientListEpic,
  saveSuccessEpic,
  editPatientEpic,
  deletePatientEpic
);
