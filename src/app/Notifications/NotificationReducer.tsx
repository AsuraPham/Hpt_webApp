import { NotificationState } from "./models/NotificationState";
import { createReducer } from "../../common/utils";
import { GLOBAL_SERVER_ERROR } from "../../actionTypes";
import * as actionType from "./actionType";
import { NotificationStatisticItem, NotificationStatusModel, NotificationItemModel } from "./models/NotificationModel";
import { PAGE_SIZE } from "../../common/Constants";

const initialState: NotificationState = {
    isLoading: false,
    notificationStatistic: [],
    pagination: {
        current: 1,
        pageSize: PAGE_SIZE,
        total: 0
    },
    searchRequest: {
        pageIndex: 1,
        pageSize: PAGE_SIZE
    },
    notifications: [],
    notificationStatus: [],
    notificationDetail: {},
    isOpenModal: false
};
export default createReducer(initialState, {

    [actionType.GET_NOTIFICATION_STATISTICS]: (state: NotificationState) => {
        return { ...state, isLoading: true };
    },
    [actionType.GET_NOTIFICATION_STATISTICS_SUCCESS]: (state: NotificationState, payload: NotificationStatisticItem[]) => {
        return { ...state, isLoading: false, notificationStatistic: payload };
    },
    [actionType.GET_NOTIFICATION_STATISTICS_FAIL]: (state: NotificationState) => {
        return { ...state, isLoading: false };
    },

    [actionType.GET_LIST_NOTIFICATION]: (state: NotificationState, payload) => {
        return { ...state, isLoading: true, searchRequest: payload };
    },
    [actionType.GET_LIST_NOTIFICATION_SUCCESS]: (state: NotificationState, payload) => {
        return { ...state, isLoading: false, notifications: payload.result, pagination: payload.pagination };
    },
    [actionType.GET_LIST_NOTIFICATION_FAIL]: (state: NotificationState) => {
        return { ...state, isLoading: false };
    },

    [actionType.GET_NOTIFICATION_STATUS]: (state: NotificationState) => {
        return { ...state, isLoading: true };
    },
    [actionType.GET_NOTIFICATION_STATUS_SUCCESS]: (state: NotificationState, payload: NotificationStatusModel) => {
        return { ...state, isLoading: false, notificationStatus: payload };
    },
    [actionType.GET_NOTIFICATION_STATUS_FAIL]: (state: NotificationState) => {
        return { ...state, isLoading: false };
    },

    [actionType.GET_NOTIFICATION_DETAIL]: (state: NotificationState) => {
        return { ...state, isLoading: true };
    },
    [actionType.GET_NOTIFICATION_DETAIL_SUCCESS]: (state: NotificationState, payload: NotificationItemModel) => {
        return { ...state, isLoading: false, notificationDetail: payload };
    },
    [actionType.GET_NOTIFICATION_DETAIL_FAIL]: (state: NotificationState) => {
        return { ...state, isLoading: false };
    },

    [actionType.NOTIFICATION_OPEN_CLOSE_MODAL]: (state: NotificationState, payload) => {
        return { ...state, ...payload };
    },

    [GLOBAL_SERVER_ERROR]: (state: NotificationState) => {
        return { ...state, isLoading: false };
    }
});