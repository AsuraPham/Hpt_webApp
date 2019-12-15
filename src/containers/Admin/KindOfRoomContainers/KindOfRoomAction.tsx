import * as actionType from "./actionType";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

export const getKindOfRoomList = (payload: SearchBaseModel) => ({
  type: actionType.GET_KINDOFROOM_LIST,
  payload
});
export const getKindOfRoomListSuccess = (payload: any) => ({
  type: actionType.GET_KINDOFROOM_LIST_SUCCESS,
  payload
});
export const getKindOfRoomListFail = (payload: any) => ({
  type: actionType.GET_KINDOFROOM_LIST_FAIL,
  payload
});

export const createKindOfRoom = (payload: any) => ({
  type: actionType.CREATE_KINDOFROOM,
  payload
});
export const createKindOfRoomSuccess = (payload: any) => ({
  type: actionType.CREATE_KINDOFROOM_SUCCESS,
  payload
});
export const createKindOfRoomFail = (payload: any) => ({
  type: actionType.CREATE_KINDOFROOM_FAIL,
  payload
});

export const openCloseModel = (payload: any) => ({
  type: actionType.KINDOFROOM_OPEN_CLOSE_MODAL,
  payload
});

export const deleteKindOfRoom = (payload: any) => ({ type: actionType.DELETE_KINDOFROOM, payload });
export const deleteKindOfRoomSuccess = (payload: any) => ({ type: actionType.DELETE_KINDOFROOM_SUCCESS, payload });
export const deleteKindOfRoomFail = (payload: any) => ({ type: actionType.DELETE_KINDOFROOM_FAIL, payload });
