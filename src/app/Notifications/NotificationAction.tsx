import {
  NotificationStatisticItem,
  NotificationStatusModel
} from "./models/NotificationModel";
import * as actionType from "./actionType";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

export const getNotificationStatistics = () => ({
  type: actionType.GET_NOTIFICATION_STATISTICS
});
export const getNotificationStatisticsSuccess = (
  payload: NotificationStatisticItem[]
) => ({ type: actionType.GET_NOTIFICATION_STATISTICS_SUCCESS, payload });
export const getNotificationStatisticsFail = (payload: any) => ({
  type: actionType.GET_NOTIFICATION_STATISTICS_FAIL,
  payload
});

export const getListNotification = (payload: SearchBaseModel) => ({
  type: actionType.GET_LIST_NOTIFICATION,
  payload
});
export const getListNotificationSuccess = (payload: any) => ({
  type: actionType.GET_LIST_NOTIFICATION_SUCCESS,
  payload
});
export const getListNotificationFail = (payload: any) => ({
  type: actionType.GET_LIST_NOTIFICATION_FAIL,
  payload
});

export const getNotificationStatus = () => ({
  type: actionType.GET_NOTIFICATION_STATUS
});
export const getNotificationStatusSuccess = (
  payload: NotificationStatusModel[]
) => ({ type: actionType.GET_NOTIFICATION_STATUS_SUCCESS, payload });
export const getNotificationStatusFail = (payload: any) => ({
  type: actionType.GET_NOTIFICATION_STATUS_FAIL,
  payload
});

export const getNotificationDetail = (payload: any) => ({
  type: actionType.GET_NOTIFICATION_DETAIL,
  payload
});
export const getNotificationDetailSuccess = (payload: any) => ({
  type: actionType.GET_NOTIFICATION_DETAIL_SUCCESS,
  payload
});
export const getNotificationDetailFail = (payload: any) => ({
  type: actionType.GET_NOTIFICATION_DETAIL_FAIL,
  payload
});

export const openCloseModel = (payload: any) => ({
  type: actionType.NOTIFICATION_OPEN_CLOSE_MODAL,
  payload
});
