import { combineEpics } from "redux-observable";

import { handleApiError } from "../../../common/handleApiError";
import { GetPagination } from "../../../common/models/Pagination";
import CommonResponse from "../../../common/models/CommonResponse";

import * as actionType from "./actionType";
import * as pendingMedicalAction from "./PendingMedicalAction";
import PendingMedicalService from "./PendingMedicalService";
import { PendingMedicalItem } from "./models/PendingMedicalModel";

const getUserListEpic = (action$: any) =>
  action$.ofType(actionType.GET_PENDING_MEDICAL_LIST).mergeMap((action: any) => {
    return PendingMedicalService.getListPendingMedical(action.payload)
      .map((response: CommonResponse<PendingMedicalItem[]>) => {
        if (!response.hasErrors) {
          let result = {
            pagination: GetPagination(response.meta),
            result: response.result
          };
          return pendingMedicalAction.getPendingMedicalListSuccess(result);
        } else {
          return pendingMedicalAction.getPendingMedicalListFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

export const pendingMedicalEpic = combineEpics(
  getUserListEpic
);
