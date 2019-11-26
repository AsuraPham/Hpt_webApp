import * as actionType from "./actionType";
import { UserState } from "./models/UserState";
import { PAGE_SIZE } from "../../../common/Constants";
import { createReducer } from "../../../common/utils";
import { GLOBAL_SERVER_ERROR } from "../../../actionTypes";

const initialState: UserState = {
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
  users: []
};
export default createReducer(initialState, {
  [actionType.GET_USER_LIST]: (state: UserState, payload: any) => {
    return { ...state, isLoading: true, searchRequest: payload };
  },
  [actionType.GET_USER_LIST_SUCCESS]: (
    state: UserState,
    payload: any
  ) => {
    return {
      ...state,
      isLoading: false,
      pagination: payload.pagination,
      users: payload.result
    };
  },
  [actionType.GET_USER_LIST_FAIL]: (state: UserState) => {
    return { ...state, isLoading: false };
  },

  [actionType.CREATE_USER]: (state: UserState) => {
    return { ...state, isLoading: false };
  },
  [actionType.CREATE_USER_SUCCESS]: (state: UserState) => {
    return { ...state, isOpenModal: false, isLoading: false };
  },
  [actionType.CREATE_USER_FAIL]: (state: UserState) => {
    return { ...state, isLoading: false };
  },

  // delete
  [actionType.DELETE_USER]: (state: UserState) => {
    return { ...state, isLoading: false };
  },
  [actionType.DELETE_USER_SUCCESS]: (state: UserState) => {
    return { ...state, isLoading: false, isOpenModalDelete: false };
  },
  [actionType.DELETE_USER_FAIL]: (state: UserState) => {
    return { ...state, isLoading: false };
  },

  [actionType.USER_OPEN_CLOSE_MODAL]: (
    state: UserState,
    payload
  ) => {
    return { ...state, ...payload };
  },

  [GLOBAL_SERVER_ERROR]: (state: UserState) => {
    return { ...state, isLoading: false };
  }
});
