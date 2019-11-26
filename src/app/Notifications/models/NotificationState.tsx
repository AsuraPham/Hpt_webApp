import { NotificationStatisticItem, NotificationItemModel, NotificationStatusModel } from "./NotificationModel";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";
import { PaginationState } from "../../../common/models/Pagination";

export interface NotificationState {
  isLoading: boolean;
  notificationStatistic?: NotificationStatisticItem[];
  pagination: PaginationState;
  searchRequest?: SearchBaseModel;
  notifications?: NotificationItemModel[];
  notificationStatus?: NotificationStatusModel[];
  notificationDetail: NotificationItemModel;
  isOpenModal: boolean;
}