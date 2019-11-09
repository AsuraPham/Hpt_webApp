
import { SearchBaseModel } from "../../common/models/SearchBaseModel";
import { ajax } from "rxjs/observable/dom/ajax";
import { headers } from "../../common/AjaxOptions";
import { SORT_TYPE } from "../../common/Constants";
const NOTIFICATION_HUB_API = `${process.env.REACT_APP_NOTIFICATION_HUB_API}`;

export default class NotifiactionServices {
  static getNotificationStatistic() {
    return ajax.getJSON(`${NOTIFICATION_HUB_API}NotificationHubAdmin/statistic-by-month`, headers());
  }
  static getListNotification(request: SearchBaseModel) {
    let param = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&keyword=${request.keyword}`;
    if (request.sort) {
      param = `${param}&sortField=${request.sort.column}&isAsc=${request.sort.type === SORT_TYPE.ASC}`;
    }
    return ajax.getJSON(`${NOTIFICATION_HUB_API}NotificationHubAdmin?${param}`, headers());
  }
  static getNotificationStatus() {
    return ajax.getJSON(`${NOTIFICATION_HUB_API}NotificationHubAdmin/statistic-by-case`, headers());
  }
  static getNotificationDetail(notifiticationId: any) {
    return ajax.get(`${NOTIFICATION_HUB_API}NotificationHubAdmin/${notifiticationId}`, headers());
  }
}
