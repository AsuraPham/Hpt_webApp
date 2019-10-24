import * as actionType from './actionType';

export const getDeviceLocationStatistic = () => ({ type: actionType.GET_DEVICE_LOCATION_STATISTIC });
export const getDeviceLocationStatisticSuccess = (payload: any) => ({ type: actionType.GET_DEVICE_LOCATION_STATISTIC_SUCCESS, payload });
export const getDeviceLocationStatisticFail = (payload: any) => ({ type: actionType.GET_DEVICE_LOCATION_STATISTIC_FAIL, payload });
