import { combineEpics } from "redux-observable";
import { toastr } from "react-redux-toastr";

import { handleApiError } from "../../../common/handleApiError";
import { GetPagination } from "../../../common/models/Pagination";
import { CREATE_SUCCESS, CREATE_FAIL, DELETE_SUCCESS } from "../../../common/const/message";
import CommonResponse from "../../../common/models/CommonResponse";
import { PAGE_SIZE } from "../../../common/Constants";

import * as actionType from "./actionType";
import * as roleAction from "./RoleAction";
import RoleService from "./RoleService";
import { RoleItem } from "./models/RoleModel";
import { RoleState } from "./models/RoleState";
import { Observable } from "rxjs";

const getRoleListEpic = (action$: any) =>
  action$.ofType(actionType.GET_ROLE_LIST).mergeMap((action: any) => {
    return RoleService.getListRole(action.payload)
      .map((response: CommonResponse<RoleItem[]>) => {
        if (!response.hasErrors) {
          let result = {
            pagination: GetPagination(response.meta),
            result: response.result
          };
          return roleAction.getRoleListSuccess(result);
        } else {
          return roleAction.getRoleListFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const createRoleEpic = (action$: any) =>
  action$.ofType(actionType.CREATE_ROLE).mergeMap((action: any) => {
    return RoleService.createRole(action.payload)
      .map((result: any) => {
        let response = result.response;
        if (!response.hasErrors) {
          toastr.success("", CREATE_SUCCESS);
          return roleAction.createRoleSuccess(response.result);
        } else {
          toastr.error("", CREATE_FAIL);
          return roleAction.createRoleFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const deleteRoleEpic = (action$: any) => action$.ofType(actionType.DELETE_ROLE).mergeMap((action: any) => {
  let request = action.payload;
  return RoleService.deleteRole(request)
    .map((result: any) => {
      let response = result.response;
      if (!response.hasErrors) {
        toastr.success("", DELETE_SUCCESS);
        return roleAction.deleteRoleSuccess(response);
      } else {
        return roleAction.deleteRoleFail(response);
      }
    }).catch(error => handleApiError(error));
});

const saveSuccessEpic = (action$: any, store) =>
  action$.ofType(actionType.CREATE_ROLE_SUCCESS, actionType.DELETE_ROLE_SUCCESS).mergeMap(() => {
    let state: RoleState = store.getState().departmentState;
    const searchReq = {
      pageIndex: state.pagination ? state.pagination.current : 1,
      pageSize: PAGE_SIZE,
      keyword: ""
    };
    return Observable.of(roleAction.getRoleList(searchReq));
  });

export const roleEpics = combineEpics(
  createRoleEpic,
  getRoleListEpic,
  deleteRoleEpic,
  saveSuccessEpic
);
