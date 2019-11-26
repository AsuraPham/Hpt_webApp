import { combineEpics } from "redux-observable";
import { toastr } from "react-redux-toastr";

import { handleApiError } from "../../../common/handleApiError";
import { GetPagination } from "../../../common/models/Pagination";
import { CREATE_SUCCESS, CREATE_FAIL, DELETE_SUCCESS } from "../../../common/const/message";
import CommonResponse from "../../../common/models/CommonResponse";
import { PAGE_SIZE } from "../../../common/Constants";

import * as actionType from "./actionType";
import * as kindOfRoomAction from "./KindOfRoomAction";
import KindOfRoomService from "./KindOfRoomService";
import { KindOfRoomItem } from "./models/KindOfRoomModel";
import { KindOfRoomState } from "./models/KindOfRoomState";
import { Observable } from "rxjs";

const getKindOfRoomListEpic = (action$: any) =>
  action$.ofType(actionType.GET_KINDOFROOM_LIST).mergeMap((action: any) => {
    return KindOfRoomService.getListKindOfRoom(action.payload)
      .map((response: CommonResponse<KindOfRoomItem[]>) => {
        if (!response.hasErrors) {
          let result = {
            pagination: GetPagination(response.meta),
            result: response.result
          };
          return kindOfRoomAction.getKindOfRoomListSuccess(result);
        } else {
          return kindOfRoomAction.getKindOfRoomListFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const createKindOfRoomEpic = (action$: any) =>
  action$.ofType(actionType.CREATE_KINDOFROOM).mergeMap((action: any) => {
    return KindOfRoomService.createKindOfRoom(action.payload)
      .map((result: any) => {
        let response = result.response;
        if (!response.hasErrors) {
          toastr.success("", CREATE_SUCCESS);
          return kindOfRoomAction.createKindOfRoomSuccess(response.result);
        } else {
          toastr.error("", CREATE_FAIL);
          return kindOfRoomAction.createKindOfRoomFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const deleteKindOfRoomEpic = (action$: any) => action$.ofType(actionType.DELETE_KINDOFROOM).mergeMap((action: any) => {
  let request = action.payload;
  return KindOfRoomService.deleteKindOfRoom(request)
    .map((result: any) => {
      let response = result.response;
      if (!response.hasErrors) {
        toastr.success("", DELETE_SUCCESS);
        return kindOfRoomAction.deleteKindOfRoomSuccess(response);
      } else {
        return kindOfRoomAction.deleteKindOfRoomFail(response);
      }
    }).catch(error => handleApiError(error));
});

const saveSuccessEpic = (action$: any, store) =>
  action$.ofType(actionType.CREATE_KINDOFROOM_SUCCESS, actionType.DELETE_KINDOFROOM_SUCCESS).mergeMap(() => {
    let state: KindOfRoomState = store.getState().departmentState;
    const searchReq = {
      pageIndex: state.pagination ? state.pagination.current : 1,
      pageSize: PAGE_SIZE,
      keyword: ""
    };
    return Observable.of(kindOfRoomAction.getKindOfRoomList(searchReq));
  });

export const kindOfRoomEpics = combineEpics(
  createKindOfRoomEpic,
  getKindOfRoomListEpic,
  deleteKindOfRoomEpic,
  saveSuccessEpic
);
