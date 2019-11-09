import { ajax } from "rxjs/observable/dom/ajax";
import { headers } from "../../common/AjaxOptions";
const DEVICE_API = `${process.env.REACT_APP_DEVICE_MANAGEMENT_API}`;
export default class DashboardServices {
  static getDeviceLocationStatistic() {
    return ajax.getJSON(
      `${DEVICE_API}admin/DeviceAdmin/device-location-statistic`,
      headers()
    );
  }
}
