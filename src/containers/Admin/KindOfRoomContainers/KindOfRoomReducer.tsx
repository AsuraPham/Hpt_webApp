import * as actionType from "./actionType";
import { KindOfRoomState } from "./models/KindOfRoomState";
import { PAGE_SIZE } from "../../../common/Constants";
import { createReducer } from "../../../common/utils";
import { GLOBAL_SERVER_ERROR } from "../../../actionTypes";

const initialState: KindOfRoomState = {
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
  kindOfRooms: []
};
export default createReducer(initialState, {
  [actionType.GET_KINDOFROOM_LIST]: (state: KindOfRoomState, payload: any) => {
    return { ...state, isLoading: true, searchRequest: payload };
  },
  [actionType.GET_KINDOFROOM_LIST_SUCCESS]: (
    state: KindOfRoomState,
    payload: any
  ) => {
    return {
      ...state,
      isLoading: false,
      pagination: payload.pagination,
      kindOfRooms: payload.result
    };
  },
  [actionType.GET_KINDOFROOM_LIST_FAIL]: (state: KindOfRoomState) => {
    return { ...state, isLoading: false };
  },

  [actionType.CREATE_KINDOFROOM]: (state: KindOfRoomState) => {
    return { ...state, isLoading: false };
  },
  [actionType.CREATE_KINDOFROOM_SUCCESS]: (state: KindOfRoomState) => {
    return { ...state, isOpenModal: false, isLoading: false };
  },
  [actionType.CREATE_KINDOFROOM_FAIL]: (state: KindOfRoomState) => {
    return { ...state, isLoading: false };
  },

  // delete
  [actionType.DELETE_KINDOFROOM]: (state: KindOfRoomState) => {
    return { ...state, isLoading: false };
  },
  [actionType.DELETE_KINDOFROOM_SUCCESS]: (state: KindOfRoomState) => {
    return { ...state, isLoading: false, isOpenModalDelete: false };
  },
  [actionType.DELETE_KINDOFROOM_FAIL]: (state: KindOfRoomState) => {
    return { ...state, isLoading: false };
  },

  [actionType.KINDOFROOM_OPEN_CLOSE_MODAL]: (
    state: KindOfRoomState,
    payload
  ) => {
    return { ...state, ...payload };
  },

  [GLOBAL_SERVER_ERROR]: (state: KindOfRoomState) => {
    return { ...state, isLoading: false };
  }
});
