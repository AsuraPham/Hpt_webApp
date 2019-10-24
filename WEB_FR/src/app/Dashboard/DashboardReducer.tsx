import * as actionType from './actionType';
import { createReducer } from '../../common/utils';
import { GLOBAL_SERVER_ERROR } from '../../actionTypes';
import { DashboardState } from './models/DashboardState';

const initialState: DashboardState = {
    isLoading: false,
    deviceLocationStatistic: []
};
export default createReducer(initialState, {
    [actionType.GET_DEVICE_LOCATION_STATISTIC]: (state: DashboardState) => {
        return { ...state, isLoading: true };
    },
    [actionType.GET_DEVICE_LOCATION_STATISTIC_SUCCESS]: (state: DashboardState, payload: any) => {
        return { ...state, isLoading: false, deviceLocationStatistic: payload };
    },
    [actionType.GET_DEVICE_LOCATION_STATISTIC_FAIL]: (state: DashboardState) => {
        return { ...state, isLoading: false };
    },
    [GLOBAL_SERVER_ERROR]: (state: DashboardState) => {
        return { ...state, isLoading: false };
    },
});