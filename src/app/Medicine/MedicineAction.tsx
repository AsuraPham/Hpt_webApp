import * as actionType from "./actionType";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

export const getMedicineList = (payload: SearchBaseModel) => ({
  type: actionType.GET_MEDICINE_LIST,
  payload
});
export const getMedicineListSuccess = (payload: any) => ({
  type: actionType.GET_MEDICINE_LIST_SUCCESS,
  payload
});
export const getMedicineListFail = (payload: any) => ({
  type: actionType.GET_MEDICINE_LIST_FAIL,
  payload
});

export const createMedicine = (payload: any) => ({
  type: actionType.CREATE_MEDICINE,
  payload
});
export const createMedicineSuccess = (payload: any) => ({
  type: actionType.CREATE_MEDICINE_SUCCESS,
  payload
});
export const createMedicineFail = (payload: any) => ({
  type: actionType.CREATE_MEDICINE_FAIL,
  payload
});

export const openCloseModel = (payload: any) => ({
  type: actionType.MEDICINE_OPEN_CLOSE_MODAL,
  payload
});
