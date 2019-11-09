import * as actionType from "./actionType";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

export const getPatientList = (payload: SearchBaseModel) => ({
  type: actionType.GET_PATIENT_LIST,
  payload
});
export const getPatientListSuccess = (payload: any) => ({
  type: actionType.GET_PATIENT_LIST_SUCCESS,
  payload
});
export const getPatientListFail = (payload: any) => ({
  type: actionType.GET_PATIENT_LIST_FAIL,
  payload
});

export const createPatient = (payload: any) => ({
  type: actionType.CREATE_PATIENT,
  payload
});
export const createPatientSuccess = (payload: any) => ({
  type: actionType.CREATE_PATIENT_SUCCESS,
  payload
});
export const createPatientFail = (payload: any) => ({
  type: actionType.CREATE_PATIENT_FAIL,
  payload
});

export const openCloseModel = (payload: any) => ({
  type: actionType.PATIENT_OPEN_CLOSE_MODAL,
  payload
});
