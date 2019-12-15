import * as actionType from "./actionType";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

export const getRoleList = (payload: SearchBaseModel) => ({
  type: actionType.GET_ROLE_LIST,
  payload
});
export const getRoleListSuccess = (payload: any) => ({
  type: actionType.GET_ROLE_LIST_SUCCESS,
  payload
});
export const getRoleListFail = (payload: any) => ({
  type: actionType.GET_ROLE_LIST_FAIL,
  payload
});

export const createRole = (payload: any) => ({
  type: actionType.CREATE_ROLE,
  payload
});
export const createRoleSuccess = (payload: any) => ({
  type: actionType.CREATE_ROLE_SUCCESS,
  payload
});
export const createRoleFail = (payload: any) => ({
  type: actionType.CREATE_ROLE_FAIL,
  payload
});

export const openCloseModel = (payload: any) => ({
  type: actionType.ROLE_OPEN_CLOSE_MODAL,
  payload
});

export const deleteRole = (payload: any) => ({ type: actionType.DELETE_ROLE, payload });
export const deleteRoleSuccess = (payload: any) => ({ type: actionType.DELETE_ROLE_SUCCESS, payload });
export const deleteRoleFail = (payload: any) => ({ type: actionType.DELETE_ROLE_FAIL, payload });
