import { ajax } from "rxjs/observable/dom/ajax";
import { headAllowAnonymous } from "../../common/AjaxOptions";

const api = `${process.env.REACT_APP_CLIENT_ROOT}`;

export default class SignInService {

  signIn(request: any) {
    return ajax.post(`${api}/User/authenticate`, request, headAllowAnonymous());
  }

}
