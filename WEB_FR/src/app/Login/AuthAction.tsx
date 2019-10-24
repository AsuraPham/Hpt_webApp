import * as actionType from './actionType';

export const syncUserInfo = () => ({ type: actionType.SYNC_USER_INFO });
export const syncUserInfoSuccess = (payload: any) => ({ type: actionType.SYNC_USER_INFO_SUCCESS, payload });
export const syncUserInfoFail = (payload: any) => ({ type: actionType.SYNC_USER_INFO_FAIL, payload });

export const getUserInfo = () => ({ type: actionType.GET_USER_INFO });
export const getUserInfoSuccess = (payload: any) => ({ type: actionType.GET_USER_INFO_SUCCESS, payload });
export const getUserInfoFail = (payload: any) => ({ type: actionType.GET_USER_INFO_FAIL, payload });

export const logout = () => ({ type: actionType.LOGOUT });