import { ajax } from "rxjs/observable/dom/ajax";
import { headers } from "../../common/AjaxOptions";
const IDENTITY_API = `${process.env.REACT_APP_IDENTITY_API}`;
export default class AuthServices {
  static getUserInfo() {
    return ajax.getJSON(
      `${IDENTITY_API}admin/UserAdmin/admin-user-info`,
      headers()
    );
  }
  static syncUserInfo() {
    return ajax.getJSON(
      `${IDENTITY_API}admin/UserAdmin/sync-user-info`,
      headers()
    );
  }
}
