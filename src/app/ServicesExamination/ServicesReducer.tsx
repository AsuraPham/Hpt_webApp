import * as actionType from "./actionType";
import { ServicesState } from "./models/ServicesState";
import { PAGE_SIZE } from "../../common/Constants";
import { createReducer } from "../../common/utils";
import { GLOBAL_SERVER_ERROR } from "../../actionTypes";

const initialState: ServicesState = {
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
  services: []
};
export default createReducer(initialState, {
  [actionType.GET_SERVICES_LIST]: (state: ServicesState, payload: any) => {
    return { ...state, isLoading: true, searchRequest: payload };
  },
  [actionType.GET_SERVICES_LIST_SUCCESS]: (
    state: ServicesState,
    payload: any
  ) => {
    return {
      ...state,
      isLoading: false,
      pagination: payload.pagination,
      services: payload.result
    };
  },
  [actionType.GET_SERVICES_LIST_FAIL]: (state: ServicesState) => {
    return { ...state, isLoading: false };
  },

  [actionType.CREATE_SERVICES]: (state: ServicesState) => {
    return { ...state, isLoading: false };
  },
  [actionType.CREATE_SERVICES_SUCCESS]: (state: ServicesState) => {
    return { ...state, isOpenModal: false, isLoading: false };
  },
  [actionType.CREATE_SERVICES_FAIL]: (state: ServicesState) => {
    return { ...state, isLoading: false };
  },
  [actionType.SERVICES_OPEN_CLOSE_MODAL]: (
    state: ServicesState,
    payload
  ) => {
    return { ...state, ...payload };
  },

  [GLOBAL_SERVER_ERROR]: (state: ServicesState) => {
    return { ...state, isLoading: false };
  }
});
