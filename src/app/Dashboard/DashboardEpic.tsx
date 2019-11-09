
import { handleApiError } from "../../common/handleApiError";
import * as actionType from "./actionType";
import * as deviceAction from "./DashboardAction";
import DashboardServices from "./DashboardServices";
import { combineEpics } from "redux-observable";
const deviceActiveStatisticEpic = (action$: any) => action$.ofType(actionType.GET_DEVICE_LOCATION_STATISTIC).mergeMap(() => {
    return DashboardServices.getDeviceLocationStatistic()
        .map((response: any) => {
            if (!response.hasErrors) {
                return deviceAction.getDeviceLocationStatisticSuccess(response.result);
            } else {
                return deviceAction.getDeviceLocationStatisticFail(response);
            }
        }).catch(error => handleApiError(error));
});

export const dashboardEpics = combineEpics(
    deviceActiveStatisticEpic
);