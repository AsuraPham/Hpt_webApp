import { ajax } from "rxjs/observable/dom/ajax";
import { headers } from "../../common/AjaxOptions";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";
import { SORT_TYPE } from "../../common/Constants";
const api = `${process.env.REACT_APP_CLIENT_ROOT}`;
export default class DepartmentServices {
  static createDepartment(request: any) {
    return ajax.post(`${api}/Department`, request, headers());
  }

  static getListDepartment(request: SearchBaseModel) {
    let param = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&keyword=${request.keyword}`;
    if (request.sort) {
      param = `${param}&sortField=${request.sort.column}&isAsc=${request.sort
        .type === SORT_TYPE.ASC}`;
    }
    return ajax.getJSON(`${api}/Department?${param}`, headers());
  }

  static deleteDepartment(departmentId: any) {
    return ajax.delete(`${api}/Department/${departmentId}`, headers());
  }
}
