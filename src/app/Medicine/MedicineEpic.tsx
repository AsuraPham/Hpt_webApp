import { combineEpics } from "redux-observable";
import { toastr } from "react-redux-toastr";

import { handleApiError } from "../../common/handleApiError";
import { GetPagination } from "../../common/models/Pagination";
import { CREATE_SUCCESS, CREATE_FAIL } from "../../common/const/message";
import CommonResponse from "../../common/models/CommonResponse";
import { PAGE_SIZE } from "../../common/Constants";

import * as actionType from "./actionType";
import * as medicineAction from "./MedicineAction";
import MedicineService from "./MedicineService";
import { MedicineItem } from "./models/MedicineModel";
import { MedicineState } from "./models/MedicineState";
import { Observable } from "rxjs";

const getMedicineListEpic = (action$: any) =>
  action$.ofType(actionType.GET_MEDICINE_LIST).mergeMap((action: any) => {
    return MedicineService.getListMedicine(action.payload)
      .map((response: CommonResponse<MedicineItem[]>) => {
        if (!response.hasErrors) {
          let result = {
            pagination: GetPagination(response.meta),
            result: response.result
          };
          return medicineAction.getMedicineListSuccess(result);
        } else {
          return medicineAction.getMedicineListFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const createMedicineEpic = (action$: any) =>
  action$.ofType(actionType.CREATE_MEDICINE).mergeMap((action: any) => {
    return MedicineService.createMedicine(action.payload)
      .map((result: any) => {
        let response = result.response;
        if (!response.hasErrors) {
          toastr.success("", CREATE_SUCCESS);
          return medicineAction.createMedicineSuccess(response.result);
        } else {
          toastr.error("", CREATE_FAIL);
          return medicineAction.createMedicineFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const saveSuccessEpic = (action$: any, store) =>
  action$.ofType(actionType.CREATE_MEDICINE_SUCCESS).mergeMap(() => {
    let state: MedicineState = store.getState().medicineState;
    const searchReq = {
      pageIndex: state.pagination ? state.pagination.current : 1,
      pageSize: PAGE_SIZE,
      keyword: ""
    };
    return Observable.of(medicineAction.getMedicineList(searchReq));
  });

export const medicineEpics = combineEpics(
  createMedicineEpic,
  getMedicineListEpic,
  saveSuccessEpic
);
