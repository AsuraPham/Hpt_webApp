import * as actionType from "./actionType";
import { PendingMedicalState } from "./models/PendingMedicalState";
import { PAGE_SIZE } from "../../../common/Constants";
import { createReducer } from "../../../common/utils";
import { GLOBAL_SERVER_ERROR } from "../../../actionTypes";

const initialState: PendingMedicalState = {
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
  pendingMedicals: []
};
export default createReducer(initialState, {
  [actionType.GET_PENDING_MEDICAL_LIST]: (state: PendingMedicalState, payload: any) => {
    return { ...state, isLoading: true, searchRequest: payload };
  },
  [actionType.GET_PENDING_MEDICAL_LIST_SUCCESS]: (
    state: PendingMedicalState,
    payload: any
  ) => {
    return {
      ...state,
      isLoading: false,
      pagination: payload.pagination,
      pendingMedicals: payload.result
    };
  },
  [actionType.GET_PENDING_MEDICAL_LIST_FAIL]: (state: PendingMedicalState) => {
    return { ...state, isLoading: false };
  },

  [GLOBAL_SERVER_ERROR]: (state: PendingMedicalState) => {
    return { ...state, isLoading: false };
  }
});
