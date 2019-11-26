import * as actionType from "./actionType";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

export const getUserList = (payload: SearchBaseModel) => ({
  type: actionType.GET_USER_LIST,
  payload
});
export const getUserListSuccess = (payload: any) => ({
  type: actionType.GET_USER_LIST_SUCCESS,
  payload
});
export const getUserListFail = (payload: any) => ({
  type: actionType.GET_USER_LIST_FAIL,
  payload
});

export const createUser = (payload: any) => ({
  type: actionType.CREATE_USER,
  payload
});
export const createUserSuccess = (payload: any) => ({
  type: actionType.CREATE_USER_SUCCESS,
  payload
});
export const createUserFail = (payload: any) => ({
  type: actionType.CREATE_USER_FAIL,
  payload
});

export const openCloseModel = (payload: any) => ({
  type: actionType.USER_OPEN_CLOSE_MODAL,
  payload
});

export const deleteUser = (payload: any) => ({ type: actionType.DELETE_USER, payload });
export const deleteUserSuccess = (payload: any) => ({ type: actionType.DELETE_USER_SUCCESS, payload });
export const deleteUserFail = (payload: any) => ({ type: actionType.DELETE_USER_FAIL, payload });
