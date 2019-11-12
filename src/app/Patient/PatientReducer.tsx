import * as actionType from "./actionType";
import { PatientState } from "./models/PatientState";
import { PAGE_SIZE } from "../../common/Constants";
import { createReducer } from "../../common/utils";
import { GLOBAL_SERVER_ERROR } from "../../actionTypes";

const initialState: PatientState = {
  isLoading: false,
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
  isOpenModalDelete: false,
  patients: []
};
export default createReducer(initialState, {
  [actionType.GET_PATIENT_LIST]: (state: PatientState, payload: any) => {
    return { ...state, isLoading: true, searchRequest: payload };
  },
  [actionType.GET_PATIENT_LIST_SUCCESS]: (
    state: PatientState,
    payload: any
  ) => {
    return {
      ...state,
      isLoading: false,
      pagination: payload.pagination,
      patients: payload.result
    };
  },
  [actionType.GET_PATIENT_LIST_FAIL]: (state: PatientState) => {
    return { ...state, isLoading: false };
  },

  [actionType.CREATE_PATIENT]: (state: PatientState) => {
    return { ...state, isLoading: true };
  },
  [actionType.CREATE_PATIENT_SUCCESS]: (state: PatientState) => {
    return { ...state, isOpenModal: false, isLoading: false };
  },
  [actionType.CREATE_PATIENT_FAIL]: (state: PatientState) => {
    return { ...state, isLoading: false };
  },

  // delete
  [actionType.DELETE_PATIENT]: (state: PatientState) => {
    return { ...state, isLoading: false };
  },
  [actionType.DELETE_PATIENT_SUCCESS]: (state: PatientState) => {
    return { ...state, isLoading: false, isOpenModalDelete: false };
  },
  [actionType.DELETE_PATIENT_FAIL]: (state: PatientState) => {
    return { ...state, isLoading: false };
  },

  [actionType.PATIENT_OPEN_CLOSE_MODAL]: (state: PatientState, payload) => {
    return { ...state, ...payload };
  },

  [GLOBAL_SERVER_ERROR]: (state: PatientState) => {
    return { ...state, isLoading: false };
  }
});
