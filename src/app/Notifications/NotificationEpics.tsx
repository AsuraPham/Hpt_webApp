import { handleApiError } from "../../common/handleApiError";
import { combineEpics } from "redux-observable";
import * as actionType from "./actionType";
import CommonResponse from "../../common/models/CommonResponse";
import NotifiactionServices from "./NotificationServices";
import { NotificationStatisticItem, NotificationItemModel, NotificationStatusModel } from "./models/NotificationModel";
import * as notificationAction from "./NotificationAction";
import { GetPagination } from "../../common/models/Pagination";

const getNotificationStatisticEpic = (action$: any) => action$.ofType(actionType.GET_NOTIFICATION_STATISTICS).mergeMap(() => {
    return NotifiactionServices.getNotificationStatistic()
        .map((response: CommonResponse<NotificationStatisticItem[]>) => {
            if (!response.hasErrors) {
                return notificationAction.getNotificationStatisticsSuccess(response.result);
            } else {
                return notificationAction.getNotificationStatisticsFail(response);
            }
        }).catch(error => handleApiError(error));
});

const getListNotificationEpic = (action$: any) => action$.ofType(actionType.GET_LIST_NOTIFICATION)
    .mergeMap((action) => NotifiactionServices.getListNotification(action.payload)
        .map((response: CommonResponse<NotificationItemModel[]>) => {
            if (!response.hasErrors) {
                let result = {
                    pagination: GetPagination(response.meta),
                    result: response.result
                };
                return notificationAction.getListNotificationSuccess(result);
            } else {
                return notificationAction.getListNotificationFail(response);
            }
        }).catch(error => handleApiError(error)));

const getNotificationStatusEpic = (action$: any) => action$.ofType(actionType.GET_NOTIFICATION_STATUS).mergeMap(() => {
    return NotifiactionServices.getNotificationStatus()
        .map((response: CommonResponse<NotificationStatusModel[]>) => {
            if (!response.hasErrors) {
                return notificationAction.getNotificationStatusSuccess(response.result);
            } else {
                return notificationAction.getNotificationStatisticsFail(response);
            }
        }).catch(error => handleApiError(error));
});

const getNotificationDetailEpic = (action$: any) => action$.ofType(actionType.GET_NOTIFICATION_DETAIL).mergeMap((action: any) => {
    return NotifiactionServices.getNotificationDetail(action.payload)
        .map((result: any) => {
            let response = result.response;
            if (!response.hasErrors) {
                return notificationAction.getNotificationDetailSuccess(response.result);
            } else {
                return notificationAction.getNotificationDetailFail(response);
            }
        }).catch(error => handleApiError(error));
});

export const notificationEpic = combineEpics(
    getNotificationStatisticEpic,
    getListNotificationEpic,
    getNotificationStatusEpic,
    getNotificationDetailEpic
);
