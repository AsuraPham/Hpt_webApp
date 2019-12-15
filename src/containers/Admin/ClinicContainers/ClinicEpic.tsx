import { combineEpics } from "redux-observable";
import { toastr } from "react-redux-toastr";

import { handleApiError } from "../../../common/handleApiError";
import { GetPagination } from "../../../common/models/Pagination";
import { CREATE_SUCCESS, CREATE_FAIL, DELETE_SUCCESS } from "../../../common/const/message";
import CommonResponse from "../../../common/models/CommonResponse";
import { PAGE_SIZE } from "../../../common/Constants";

import * as actionType from "./actionType";
import * as clinicAction from "./ClinicAction";
import ClinicService from "./ClinicService";
import { ClinicItem } from "./models/ClinicModel";
import { ClinicState } from "./models/ClinicState";
import { Observable } from "rxjs";

const getClinicListEpic = (action$: any) =>
  action$.ofType(actionType.GET_CLINIC_LIST).mergeMap((action: any) => {
    return ClinicService.getListClinic(action.payload)
      .map((response: CommonResponse<ClinicItem[]>) => {
        if (!response.hasErrors) {
          let result = {
            pagination: GetPagination(response.meta),
            result: response.result
          };
          return clinicAction.getClinicListSuccess(result);
        } else {
          return clinicAction.getClinicListFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const createClinicEpic = (action$: any) =>
  action$.ofType(actionType.CREATE_CLINIC).mergeMap((action: any) => {
    return ClinicService.createClinic(action.payload)
      .map((result: any) => {
        let response = result.response;
        if (!response.hasErrors) {
          toastr.success("", CREATE_SUCCESS);
          return clinicAction.createClinicSuccess(response.result);
        } else {
          toastr.error("", CREATE_FAIL);
          return clinicAction.createClinicFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const deleteClinicEpic = (action$: any) => action$.ofType(actionType.DELETE_CLINIC).mergeMap((action: any) => {
  let request = action.payload;
  return ClinicService.deleteClinic(request)
    .map((result: any) => {
      let response = result.response;
      if (!response.hasErrors) {
        toastr.success("", DELETE_SUCCESS);
        return clinicAction.deleteClinicSuccess(response);
      } else {
        return clinicAction.deleteClinicFail(response);
      }
    }).catch(error => handleApiError(error));
});

const saveSuccessEpic = (action$: any, store) =>
  action$.ofType(actionType.CREATE_CLINIC_SUCCESS, actionType.DELETE_CLINIC_SUCCESS).mergeMap(() => {
    let state: ClinicState = store.getState().departmentState;
    const searchReq = {
      pageIndex: state.pagination ? state.pagination.current : 1,
      pageSize: PAGE_SIZE,
      keyword: ""
    };
    return Observable.of(clinicAction.getClinicList(searchReq));
  });

export const clinicEpics = combineEpics(
  createClinicEpic,
  getClinicListEpic,
  deleteClinicEpic,
  saveSuccessEpic
);
