import { ajax } from "rxjs/observable/dom/ajax";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";
import { SORT_TYPE } from "../../../common/Constants";
import { headers } from "../../../common/AjaxOptions";

const api = `${process.env.REACT_APP_CLIENT_ROOT}`;

export default class UserServices {
  static createUser(request: any) {
    return ajax.post(`${api}/User/register`, request, headers());
  }

  static getListUser(request: SearchBaseModel) {
    let param = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&keyword=${request.keyword}`;
    if (request.sort) {
      param = `${param}&sortField=${request.sort.column}&isAsc=${request.sort
        .type === SORT_TYPE.ASC}`;
    }
    return ajax.getJSON(`${api}/User?${param}`, headers());
  }

  static deleteUser(id: any) {
    return ajax.delete(`${api}/User/${id}`, headers());
  }

  getListRole() {
    return ajax.getJSON(`${api}/Role`, headers());
  }

  getListClinic() {
    return ajax.getJSON(`${api}/Clinic/get-list`, headers());
  }

}
