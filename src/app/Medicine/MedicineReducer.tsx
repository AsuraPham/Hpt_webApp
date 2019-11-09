import * as actionType from "./actionType";
import { MedicineState } from "./models/MedicineState";
import { PAGE_SIZE } from "../../common/Constants";
import { createReducer } from "../../common/utils";
import { GLOBAL_SERVER_ERROR } from "../../actionTypes";

const initialState: MedicineState = {
  isLoading: false,
  isLoadingCreate: false,
  isOpenModal: false,
  pagination: {
    current: 1,
    pageSize: PAGE_SIZE,
    total: 0
  },
  searchRequest: {
    pageIndex: 1,
    pageSize: PAGE_SIZE
  },
  medicines: []
};
export default createReducer(initialState, {
  [actionType.GET_MEDICINE_LIST]: (state: MedicineState, payload: any) => {
    return { ...state, isLoading: true, searchRequest: payload };
  },
  [actionType.GET_MEDICINE_LIST_SUCCESS]: (
    state: MedicineState,
    payload: any
  ) => {
    return {
      ...state,
      isLoading: false,
      pagination: payload.pagination,
      medicines: payload.result
    };
  },
  [actionType.GET_MEDICINE_LIST_FAIL]: (state: MedicineState) => {
    return { ...state, isLoading: false };
  },

  [actionType.CREATE_MEDICINE]: (state: MedicineState) => {
    return { ...state, isLoadingCreate: true };
  },
  [actionType.CREATE_MEDICINE_SUCCESS]: (state: MedicineState) => {
    return { ...state, isOpenModal: false, isLoadingCreate: false };
  },
  [actionType.CREATE_MEDICINE_FAIL]: (state: MedicineState) => {
    return { ...state, isLoading: false };
  },
  [actionType.MEDICINE_OPEN_CLOSE_MODAL]: (
    state: MedicineState,
    payload
  ) => {
    return { ...state, ...payload };
  },

  [GLOBAL_SERVER_ERROR]: (state: MedicineState) => {
    return { ...state, isLoading: false };
  }
});
