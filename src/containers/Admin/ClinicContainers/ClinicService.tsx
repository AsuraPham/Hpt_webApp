import { ajax } from "rxjs/observable/dom/ajax";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";
import { SORT_TYPE } from "../../../common/Constants";
import { headers } from "../../../common/AjaxOptions";

const api = `${process.env.REACT_APP_CLIENT_ROOT}`;

export default class ClinicServices {
  static createClinic(request: any) {
    return ajax.post(`${api}/Clinic`, request, headers());
  }

  static getListClinic(request: SearchBaseModel) {
    let param = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&keyword=${request.keyword}`;
    if (request.sort) {
      param = `${param}&sortField=${request.sort.column}&isAsc=${request.sort
        .type === SORT_TYPE.ASC}`;
    }
    return ajax.getJSON(`${api}/Clinic?${param}`, headers());
  }

  static deleteClinic(id: any) {
    return ajax.delete(`${api}/Clinic/${id}`, headers());
  }

  getListDepartment() {
    return ajax.getJSON(`${api}/Department/get-list`, headers());
  }

  getListKindOfRoom() {
    return ajax.getJSON(`${api}/KindOfRoom/get-list`, headers());
  }
}
