import { DeviceLocationStatistic } from './DashboardModel';

export interface DashboardState {
    isLoading?: boolean;
    deviceLocationStatistic?: DeviceLocationStatistic[];
}