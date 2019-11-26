import * as actionType from "./actionType";
import { ClinicState } from "./models/ClinicState";
import { PAGE_SIZE } from "../../../common/Constants";
import { createReducer } from "../../../common/utils";
import { GLOBAL_SERVER_ERROR } from "../../../actionTypes";

const initialState: ClinicState = {
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
  clinics: []
};
export default createReducer(initialState, {
  [actionType.GET_CLINIC_LIST]: (state: ClinicState, payload: any) => {
    return { ...state, isLoading: true, searchRequest: payload };
  },
  [actionType.GET_CLINIC_LIST_SUCCESS]: (
    state: ClinicState,
    payload: any
  ) => {
    return {
      ...state,
      isLoading: false,
      pagination: payload.pagination,
      clinics: payload.result
    };
  },
  [actionType.GET_CLINIC_LIST_FAIL]: (state: ClinicState) => {
    return { ...state, isLoading: false };
  },

  [actionType.CREATE_CLINIC]: (state: ClinicState) => {
    return { ...state, isLoading: false };
  },
  [actionType.CREATE_CLINIC_SUCCESS]: (state: ClinicState) => {
    return { ...state, isOpenModal: false, isLoading: false };
  },
  [actionType.CREATE_CLINIC_FAIL]: (state: ClinicState) => {
    return { ...state, isLoading: false };
  },

  // delete
  [actionType.DELETE_CLINIC]: (state: ClinicState) => {
    return { ...state, isLoading: false };
  },
  [actionType.DELETE_CLINIC_SUCCESS]: (state: ClinicState) => {
    return { ...state, isLoading: false, isOpenModalDelete: false };
  },
  [actionType.DELETE_CLINIC_FAIL]: (state: ClinicState) => {
    return { ...state, isLoading: false };
  },

  [actionType.CLINIC_OPEN_CLOSE_MODAL]: (
    state: ClinicState,
    payload
  ) => {
    return { ...state, ...payload };
  },

  [GLOBAL_SERVER_ERROR]: (state: ClinicState) => {
    return { ...state, isLoading: false };
  }
});
