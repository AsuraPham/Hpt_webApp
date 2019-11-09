import * as actionType from "./actionType";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

export const getDoctorList = (payload: SearchBaseModel) => ({
  type: actionType.GET_DOCTOR_LIST,
  payload
});
export const getDoctorListSuccess = (payload: any) => ({
  type: actionType.GET_DOCTOR_LIST_SUCCESS,
  payload
});
export const getDoctorListFail = (payload: any) => ({
  type: actionType.GET_DOCTOR_LIST_FAIL,
  payload
});

export const createDoctor = (payload: any) => ({
  type: actionType.CREATE_DOCTOR,
  payload
});
export const createDoctorSuccess = (payload: any) => ({
  type: actionType.CREATE_DOCTOR_SUCCESS,
  payload
});
export const createDoctorFail = (payload: any) => ({
  type: actionType.CREATE_DOCTOR_FAIL,
  payload
});

export const openCloseModel = (payload: any) => ({
  type: actionType.DOCTOR_OPEN_CLOSE_MODAL,
  payload
});
