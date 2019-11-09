import { combineEpics } from "redux-observable";
import { toastr } from "react-redux-toastr";

import { handleApiError } from "../../common/handleApiError";
import { GetPagination } from "../../common/models/Pagination";
import { CREATE_SUCCESS, CREATE_FAIL } from "../../common/const/message";
import CommonResponse from "../../common/models/CommonResponse";
import { PAGE_SIZE } from "../../common/Constants";

import * as actionType from "./actionType";
import * as servicesAction from "./ServicesAction";
import ServicesExaminationService from "./ServicesExaminationService";
import { ServicesItem } from "./models/ServicesModel";
import { ServicesState } from "./models/ServicesState";
import { Observable } from "rxjs";

const getServicesListEpic = (action$: any) =>
  action$.ofType(actionType.GET_SERVICES_LIST).mergeMap((action: any) => {
    return ServicesExaminationService.getListServices(action.payload)
      .map((response: CommonResponse<ServicesItem[]>) => {
        if (!response.hasErrors) {
          let result = {
            pagination: GetPagination(response.meta),
            result: response.result
          };
          return servicesAction.getServicesListSuccess(result);
        } else {
          return servicesAction.getServicesListFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const createServicesEpic = (action$: any) =>
  action$.ofType(actionType.CREATE_SERVICES).mergeMap((action: any) => {
    return ServicesExaminationService.createServices(action.payload)
      .map((result: any) => {
        let response = result.response;
        if (!response.hasErrors) {
          toastr.success("", CREATE_SUCCESS);
          return servicesAction.createServicesSuccess(response.result);
        } else {
          toastr.error("", CREATE_FAIL);
          return servicesAction.createServicesFail(response);
        }
      })
      .catch(error => handleApiError(error));
  });

const saveSuccessEpic = (action$: any, store) =>
  action$.ofType(actionType.CREATE_SERVICES_SUCCESS).mergeMap(() => {
    let state: ServicesState = store.getState().servicesState;
    const searchReq = {
      pageIndex: state.pagination ? state.pagination.current : 1,
      pageSize: PAGE_SIZE,
      keyword: ""
    };
    return Observable.of(servicesAction.getServicesList(searchReq));
  });

export const servicesEpics = combineEpics(
  createServicesEpic,
  getServicesListEpic,
  saveSuccessEpic
);
