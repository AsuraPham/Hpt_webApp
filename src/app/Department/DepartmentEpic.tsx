import { combineEpics } from "redux-observable";
import { toastr } from "react-redux-toastr";

import { handleApiError } from "../../common/handleApiError";
import { GetPagination } from "../../common/models/Pagination";
import { CREATE_SUCCESS, CREATE_FAIL } from "../../common/const/message";
import CommonResponse from "../../common/models/CommonResponse";
import { PAGE_SIZE } from "../../common/Constants";

import * as actionType from "./actionType";
import * as departmentAction from "./DepartmentAction";
import DepartmentService from "./DepartmentService";
import { DepartmentItem } from "./models/DepartmentModel";
import { DepartmentState } from "./models/DepartmentState";
import { Observable } from "rxjs";

const getDepartmentListEpic = (action$: any) =>
  action$.ofType(actionType.GET_DEPARTMENT_LIST).mergeMap((action: any) => {
    return DepartmentService.getListDepartment(action.payload)
      .map((response: CommonResponse<DepartmentItem[]>) => {
        if (!response.hasErrors) {
          let result = {
            pagination: GetPagination(response.meta),
            result: response.result
          };
          return departmentAction.getDepartmentListSuccess(result);
        } else {
          return departmentAction.getDepartmentListFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const createDepartmentEpic = (action$: any) =>
  action$.ofType(actionType.CREATE_DEPARTMENT).mergeMap((action: any) => {
    return DepartmentService.createDepartment(action.payload)
      .map((result: any) => {
        let response = result.response;
        if (!response.hasErrors) {
          toastr.success("", CREATE_SUCCESS);
          return departmentAction.createDepartmentSuccess(response.result);
        } else {
          toastr.error("", CREATE_FAIL);
          return departmentAction.createDepartmentFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const saveSuccessEpic = (action$: any, store) =>
  action$.ofType(actionType.CREATE_DEPARTMENT_SUCCESS).mergeMap(() => {
    let state: DepartmentState = store.getState().departmentState;
    const searchReq = {
      pageIndex: state.pagination ? state.pagination.current : 1,
      pageSize: PAGE_SIZE,
      keyword: ""
    };
    return Observable.of(departmentAction.getDepartmentList(searchReq));
  });

export const deparmentEpics = combineEpics(
  createDepartmentEpic,
  getDepartmentListEpic,
  saveSuccessEpic
);
