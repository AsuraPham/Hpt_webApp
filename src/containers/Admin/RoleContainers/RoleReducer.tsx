import * as actionType from "./actionType";
import { RoleState } from "./models/RoleState";
import { PAGE_SIZE } from "../../../common/Constants";
import { createReducer } from "../../../common/utils";
import { GLOBAL_SERVER_ERROR } from "../../../actionTypes";

const initialState: RoleState = {
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
  roles: []
};
export default createReducer(initialState, {
  [actionType.GET_ROLE_LIST]: (state: RoleState, payload: any) => {
    return { ...state, isLoading: true, searchRequest: payload };
  },
  [actionType.GET_ROLE_LIST_SUCCESS]: (
    state: RoleState,
    payload: any
  ) => {
    return {
      ...state,
      isLoading: false,
      pagination: payload.pagination,
      roles: payload.result
    };
  },
  [actionType.GET_ROLE_LIST_FAIL]: (state: RoleState) => {
    return { ...state, isLoading: false };
  },

  [actionType.CREATE_ROLE]: (state: RoleState) => {
    return { ...state, isLoading: false };
  },
  [actionType.CREATE_ROLE_SUCCESS]: (state: RoleState) => {
    return { ...state, isOpenModal: false, isLoading: false };
  },
  [actionType.CREATE_ROLE_FAIL]: (state: RoleState) => {
    return { ...state, isLoading: false };
  },

  // delete
  [actionType.DELETE_ROLE]: (state: RoleState) => {
    return { ...state, isLoading: false };
  },
  [actionType.DELETE_ROLE_SUCCESS]: (state: RoleState) => {
    return { ...state, isLoading: false, isOpenModalDelete: false };
  },
  [actionType.DELETE_ROLE_FAIL]: (state: RoleState) => {
    return { ...state, isLoading: false };
  },

  [actionType.ROLE_OPEN_CLOSE_MODAL]: (
    state: RoleState,
    payload
  ) => {
    return { ...state, ...payload };
  },

  [GLOBAL_SERVER_ERROR]: (state: RoleState) => {
    return { ...state, isLoading: false };
  }
});
