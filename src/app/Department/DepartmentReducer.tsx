import * as actionType from "./actionType";
import { DepartmentState } from "./models/DepartmentState";
import { PAGE_SIZE } from "../../common/Constants";
import { createReducer } from "../../common/utils";
import { GLOBAL_SERVER_ERROR } from "../../actionTypes";

const initialState: DepartmentState = {
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
  departments: []
};
export default createReducer(initialState, {
  [actionType.GET_DEPARTMENT_LIST]: (state: DepartmentState, payload: any) => {
    return { ...state, isLoading: true, searchRequest: payload };
  },
  [actionType.GET_DEPARTMENT_LIST_SUCCESS]: (
    state: DepartmentState,
    payload: any
  ) => {
    return {
      ...state,
      isLoading: false,
      pagination: payload.pagination,
      departments: payload.result
    };
  },
  [actionType.GET_DEPARTMENT_LIST_FAIL]: (state: DepartmentState) => {
    return { ...state, isLoading: false };
  },

  [actionType.CREATE_DEPARTMENT]: (state: DepartmentState) => {
    return { ...state, isLoading: true };
  },
  [actionType.CREATE_DEPARTMENT_SUCCESS]: (state: DepartmentState) => {
    return { ...state, isOpenModal: false, isLoading: false };
  },
  [actionType.CREATE_DEPARTMENT_FAIL]: (state: DepartmentState) => {
    return { ...state, isLoading: false };
  },
  [actionType.DEPARTMENT_OPEN_CLOSE_MODAL]: (
    state: DepartmentState,
    payload
  ) => {
    return { ...state, ...payload };
  },

  [GLOBAL_SERVER_ERROR]: (state: DepartmentState) => {
    return { ...state, isLoading: false };
  }
});
