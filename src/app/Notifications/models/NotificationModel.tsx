export interface NotificationStatisticItem {
  month?: string;
  count?: number;
}
export interface NotificationStatusModel {
  case?: string;
  numberOfNotification?: number;
}
export interface NotificationItemModel {
  id?: string;
  case?: string;
  message?: string;
  dateOfSending?: string;
  userId?: string;
  notificationId?: number;
}