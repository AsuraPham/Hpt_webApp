import { createReducer } from "../../common/utils";
import * as actionType from "./actionType";
import { GLOBAL_SERVER_ERROR } from "../../actionTypes";
import { AuthState, UserModel } from "./models/AuthState";
import { TOKEN_KEY, ACCOUNT_INFO } from "../../common/Constants";
const initialState: AuthState = {
  isLoading: false,
  userInfo: {}
};
export default createReducer(initialState, {
  [actionType.GET_USER_INFO]: (state: AuthState) => {
    return { ...state, isLoading: true };
  },
  [actionType.GET_USER_INFO_SUCCESS]: (state: AuthState, payload: UserModel) => {
    localStorage.setItem(ACCOUNT_INFO, JSON.stringify(payload));
    return { ...state, isLoading: false, userInfo: payload };
  },
  [actionType.GET_USER_INFO_FAIL]: (state: AuthState) => {
    return { ...state, isLoading: false };
  },
  [actionType.SYNC_USER_INFO]: (state: AuthState) => {
    return { ...state, isLoading: true };
  },
  [actionType.SYNC_USER_INFO_SUCCESS]: (state: AuthState) => {
    return { ...state, isLoading: false };
  },
  [actionType.SYNC_USER_INFO_FAIL]: (state: AuthState) => {
    return { ...state, isLoading: false };
  },
  [actionType.LOGOUT]: (state: AuthState) => {
    localStorage.removeItem(TOKEN_KEY);
    return { ...state, isLoading: false };
  },

  [GLOBAL_SERVER_ERROR]: (state: AuthState) => {
    return { ...state, isLoading: false };
  },
});