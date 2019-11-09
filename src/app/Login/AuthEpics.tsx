import { combineEpics } from "redux-observable";
import AuthServices from "./AuthServices";

import * as actionType from "./actionType";
import * as userAction from "./AuthAction";
import { handleApiError } from "../../common/handleApiError";
import CommonResponse from "../../common/models/CommonResponse";
import { Observable } from "rxjs";
import { push } from "react-router-redux";
import { STATIC_ROUTE } from "../../common/Constants";

const syncUserInfoEpic = (action$: any) =>
  action$.ofType(actionType.SYNC_USER_INFO).mergeMap(() => {
    return AuthServices.syncUserInfo()
      .map((response: CommonResponse<any>) => {
        if (!response.hasErrors) {
          return userAction.syncUserInfoSuccess(response.result);
        } else {
          return userAction.syncUserInfoFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const getUserInfoEpic = (action$: any) =>
  action$.ofType(actionType.GET_USER_INFO).mergeMap(() => {
    return AuthServices.getUserInfo()
      .map((response: CommonResponse<any>) => {
        if (!response.hasErrors) {
          return userAction.getUserInfoSuccess(response.result);
        } else {
          return userAction.getUserInfoFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const syncUserInfoSuccessEpic = (action$: any) =>
  action$.ofType(actionType.SYNC_USER_INFO_SUCCESS).mergeMap(() => {
    return Observable.of(
      push(`${STATIC_ROUTE.HOME}`),
      userAction.getUserInfo()
    );
  });
const logoutEpic = (action$: any) =>
  action$
    .ofType(actionType.LOGOUT)
    .mergeMap(() => Observable.of(push(`${STATIC_ROUTE.LOGIN}`)));
export const authEpics = combineEpics(
  getUserInfoEpic,
  syncUserInfoEpic,
  syncUserInfoSuccessEpic,
  logoutEpic
);
