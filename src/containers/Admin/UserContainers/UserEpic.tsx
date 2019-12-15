import { combineEpics } from "redux-observable";
import { toastr } from "react-redux-toastr";

import { handleApiError } from "../../../common/handleApiError";
import { GetPagination } from "../../../common/models/Pagination";
import { CREATE_SUCCESS, CREATE_FAIL, DELETE_SUCCESS } from "../../../common/const/message";
import CommonResponse from "../../../common/models/CommonResponse";
import { PAGE_SIZE } from "../../../common/Constants";

import * as actionType from "./actionType";
import * as roleAction from "./UserAction";
import UserService from "./UserService";
import { UserItem } from "./models/UserModel";
import { UserState } from "./models/UserState";
import { Observable } from "rxjs";

const getUserListEpic = (action$: any) =>
  action$.ofType(actionType.GET_USER_LIST).mergeMap((action: any) => {
    return UserService.getListUser(action.payload)
      .map((response: CommonResponse<UserItem[]>) => {
        if (!response.hasErrors) {
          let result = {
            pagination: GetPagination(response.meta),
            result: response.result
          };
          return roleAction.getUserListSuccess(result);
        } else {
          return roleAction.getUserListFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const createUserEpic = (action$: any) =>
  action$.ofType(actionType.CREATE_USER).mergeMap((action: any) => {
    return UserService.createUser(action.payload)
      .map((result: any) => {
        let response = result.response;
        if (!response.hasErrors) {
          toastr.success("", CREATE_SUCCESS);
          return roleAction.createUserSuccess(response.result);
        } else {
          toastr.error("", CREATE_FAIL);
          return roleAction.createUserFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const deleteUserEpic = (action$: any) => action$.ofType(actionType.DELETE_USER).mergeMap((action: any) => {
  let request = action.payload;
  return UserService.deleteUser(request)
    .map((result: any) => {
      let response = result.response;
      if (!response.hasErrors) {
        toastr.success("", DELETE_SUCCESS);
        return roleAction.deleteUserSuccess(response);
      } else {
        return roleAction.deleteUserFail(response);
      }
    }).catch(error => handleApiError(error));
});

const saveSuccessEpic = (action$: any, store) =>
  action$.ofType(actionType.CREATE_USER_SUCCESS, actionType.DELETE_USER_SUCCESS).mergeMap(() => {
    let state: UserState = store.getState().departmentState;
    const searchReq = {
      pageIndex: state.pagination ? state.pagination.current : 1,
      pageSize: PAGE_SIZE,
      keyword: ""
    };
    return Observable.of(roleAction.getUserList(searchReq));
  });

export const userEpics = combineEpics(
  createUserEpic,
  getUserListEpic,
  deleteUserEpic,
  saveSuccessEpic
);
