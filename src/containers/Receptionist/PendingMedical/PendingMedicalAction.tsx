import * as actionType from "./actionType";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

export const getPendingMedicalList = (payload: SearchBaseModel) => ({
  type: actionType.GET_PENDING_MEDICAL_LIST,
  payload
});
export const getPendingMedicalListSuccess = (payload: any) => ({
  type: actionType.GET_PENDING_MEDICAL_LIST_SUCCESS,
  payload
});
export const getPendingMedicalListFail = (payload: any) => ({
  type: actionType.GET_PENDING_MEDICAL_LIST_FAIL,
  payload
});
