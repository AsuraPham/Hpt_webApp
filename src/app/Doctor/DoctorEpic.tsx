import { combineEpics } from "redux-observable";
import { toastr } from "react-redux-toastr";
import { Observable } from "rxjs";

import { handleApiError } from "../../common/handleApiError";
import { GetPagination } from "../../common/models/Pagination";
import { CREATE_SUCCESS, CREATE_FAIL, DELETE_SUCCESS } from "../../common/const/message";
import CommonResponse from "../../common/models/CommonResponse";
import { PAGE_SIZE } from "../../common/Constants";

import * as actionType from "./actionType";
import * as patientAction from "./DoctorAction";
import DoctorService from "./DoctorService";
import { DoctorItem } from "./models/DoctorModel";
import { DoctorState } from "./models/DoctorState";

const getDoctorListEpic = (action$: any) =>
  action$.ofType(actionType.GET_DOCTOR_LIST).mergeMap((action: any) => {
    return DoctorService.getListDoctor(action.payload)
      .map((response: CommonResponse<DoctorItem[]>) => {
        if (!response.hasErrors) {
          let result = {
            pagination: GetPagination(response.meta),
            result: response.result
          };
          return patientAction.getDoctorListSuccess(result);
        } else {
          return patientAction.getDoctorListFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const createDoctorEpic = (action$: any) =>
  action$.ofType(actionType.CREATE_DOCTOR).mergeMap((action: any) => {
    return DoctorService.createDoctor(action.payload)
      .map((result: any) => {
        let response = result.response;
        if (!response.hasErrors) {
          toastr.success("", CREATE_SUCCESS);
          return patientAction.createDoctorSuccess(response.result);
        } else {
          toastr.error("", CREATE_FAIL);
          return patientAction.createDoctorFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const deleteDoctorEpic = (action$: any) => action$.ofType(actionType.DELETE_DOCTOR).mergeMap((action: any) => {
  let request = action.payload;
  return DoctorService.deleteDoctor(request)
    .map((result: any) => {
      let response = result.response;
      if (!response.hasErrors) {
        toastr.success("", DELETE_SUCCESS);
        return patientAction.deleteDoctorSuccess(response);
      } else {
        return patientAction.deleteDoctorFail(response);
      }
    }).catch(error => handleApiError(error));
});

const saveSuccessEpic = (action$: any, store) =>
  action$.ofType(actionType.CREATE_DOCTOR_SUCCESS, actionType.DELETE_DOCTOR_SUCCESS).mergeMap(() => {
    let state: DoctorState = store.getState().patientState;
    const searchReq = {
      pageIndex: state.pagination ? state.pagination.current : 1,
      pageSize: PAGE_SIZE,
      keyword: ""
    };
    return Observable.of(patientAction.getDoctorList(searchReq));
  });

export const doctorEpics = combineEpics(
  createDoctorEpic,
  getDoctorListEpic,
  saveSuccessEpic,
  deleteDoctorEpic
);
