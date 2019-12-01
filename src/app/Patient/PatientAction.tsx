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

export const deletePatient = (payload: any) => ({ type: actionType.DELETE_PATIENT, payload });
export const deletePatientSuccess = (payload: any) => ({ type: actionType.DELETE_PATIENT_SUCCESS, payload });
export const deletePatientFail = (payload: any) => ({ type: actionType.DELETE_PATIENT_FAIL, payload });

export const editPatient = (payload: any) => ({ type: actionType.EDIT_PATIENT, payload });
export const editPatientSuccess = (payload: any) => ({ type: actionType.EDIT_PATIENT_SUCCESS, payload });
export const editPatientFail = (payload: any) => ({ type: actionType.EDIT_PATIENT_FAIL, payload });
