import * as actionType from "./actionType";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

export const getDepartmentList = (payload: SearchBaseModel) => ({
  type: actionType.GET_DEPARTMENT_LIST,
  payload
});
export const getDepartmentListSuccess = (payload: any) => ({
  type: actionType.GET_DEPARTMENT_LIST_SUCCESS,
  payload
});
export const getDepartmentListFail = (payload: any) => ({
  type: actionType.GET_DEPARTMENT_LIST_FAIL,
  payload
});

export const createDepartment = (payload: any) => ({
  type: actionType.CREATE_DEPARTMENT,
  payload
});
export const createDepartmentSuccess = (payload: any) => ({
  type: actionType.CREATE_DEPARTMENT_SUCCESS,
  payload
});
export const createDepartmentFail = (payload: any) => ({
  type: actionType.CREATE_DEPARTMENT_FAIL,
  payload
});

export const openCloseModel = (payload: any) => ({
  type: actionType.DEPARTMENT_OPEN_CLOSE_MODAL,
  payload
});

export const deleteDepartment = (payload: any) => ({ type: actionType.DELETE_DEPARTMENT, payload });
export const deleteDepartmentSuccess = (payload: any) => ({ type: actionType.DELETE_DEPARTMENT_SUCCESS, payload });
export const deleteDepartmentFail = (payload: any) => ({ type: actionType.DELETE_DEPARTMENT_FAIL, payload });
