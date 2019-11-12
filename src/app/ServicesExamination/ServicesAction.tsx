import * as actionType from "./actionType";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

export const getServicesList = (payload: SearchBaseModel) => ({
  type: actionType.GET_SERVICES_LIST,
  payload
});
export const getServicesListSuccess = (payload: any) => ({
  type: actionType.GET_SERVICES_LIST_SUCCESS,
  payload
});
export const getServicesListFail = (payload: any) => ({
  type: actionType.GET_SERVICES_LIST_FAIL,
  payload
});

export const createServices = (payload: any) => ({
  type: actionType.CREATE_SERVICES,
  payload
});
export const createServicesSuccess = (payload: any) => ({
  type: actionType.CREATE_SERVICES_SUCCESS,
  payload
});
export const createServicesFail = (payload: any) => ({
  type: actionType.CREATE_SERVICES_FAIL,
  payload
});

export const openCloseModel = (payload: any) => ({
  type: actionType.SERVICES_OPEN_CLOSE_MODAL,
  payload
});

export const deleteServices = (payload: any) => ({ type: actionType.DELETE_SERVICES, payload });
export const deleteServicesSuccess = (payload: any) => ({ type: actionType.DELETE_SERVICES_SUCCESS, payload });
export const deleteServicesFail = (payload: any) => ({ type: actionType.DELETE_SERVICES_FAIL, payload });