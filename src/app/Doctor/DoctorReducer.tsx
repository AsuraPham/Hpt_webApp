import * as actionType from "./actionType";
import { DoctorState } from "./models/DoctorState";
import { PAGE_SIZE } from "../../common/Constants";
import { createReducer } from "../../common/utils";
import { GLOBAL_SERVER_ERROR } from "../../actionTypes";

const initialState: DoctorState = {
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
  doctors: []
};
export default createReducer(initialState, {
  [actionType.GET_DOCTOR_LIST]: (state: DoctorState, payload: any) => {
    return { ...state, isLoading: true, searchRequest: payload };
  },
  [actionType.GET_DOCTOR_LIST_SUCCESS]: (state: DoctorState, payload: any) => {
    return {
      ...state,
      isLoading: false,
      pagination: payload.pagination,
      doctors: payload.result
    };
  },
  [actionType.GET_DOCTOR_LIST_FAIL]: (state: DoctorState) => {
    return { ...state, isLoading: false };
  },

  [actionType.CREATE_DOCTOR]: (state: DoctorState) => {
    return { ...state, isLoading: true };
  },
  [actionType.CREATE_DOCTOR_SUCCESS]: (state: DoctorState) => {
    return { ...state, isOpenModal: false, isLoading: false };
  },
  [actionType.CREATE_DOCTOR_FAIL]: (state: DoctorState) => {
    return { ...state, isLoading: false };
  },
  // delete
  [actionType.DELETE_DOCTOR]: (state: DoctorState) => {
    return { ...state, isLoading: false };
  },
  [actionType.DELETE_DOCTOR_SUCCESS]: (state: DoctorState) => {
    return { ...state, isLoading: false, isOpenModalDelete: false };
  },
  [actionType.DELETE_DOCTOR_FAIL]: (state: DoctorState) => {
    return { ...state, isLoading: false };
  },

  [actionType.DOCTOR_OPEN_CLOSE_MODAL]: (state: DoctorState, payload) => {
    return { ...state, ...payload };
  },

  [GLOBAL_SERVER_ERROR]: (state: DoctorState) => {
    return { ...state, isLoading: false };
  }
});
