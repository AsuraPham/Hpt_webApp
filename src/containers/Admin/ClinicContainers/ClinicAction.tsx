import * as actionType from "./actionType";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

export const getClinicList = (payload: SearchBaseModel) => ({
  type: actionType.GET_CLINIC_LIST,
  payload
});
export const getClinicListSuccess = (payload: any) => ({
  type: actionType.GET_CLINIC_LIST_SUCCESS,
  payload
});
export const getClinicListFail = (payload: any) => ({
  type: actionType.GET_CLINIC_LIST_FAIL,
  payload
});

export const createClinic = (payload: any) => ({
  type: actionType.CREATE_CLINIC,
  payload
});
export const createClinicSuccess = (payload: any) => ({
  type: actionType.CREATE_CLINIC_SUCCESS,
  payload
});
export const createClinicFail = (payload: any) => ({
  type: actionType.CREATE_CLINIC_FAIL,
  payload
});

export const openCloseModel = (payload: any) => ({
  type: actionType.CLINIC_OPEN_CLOSE_MODAL,
  payload
});

export const deleteClinic = (payload: any) => ({ type: actionType.DELETE_CLINIC, payload });
export const deleteClinicSuccess = (payload: any) => ({ type: actionType.DELETE_CLINIC_SUCCESS, payload });
export const deleteClinicFail = (payload: any) => ({ type: actionType.DELETE_CLINIC_FAIL, payload });
