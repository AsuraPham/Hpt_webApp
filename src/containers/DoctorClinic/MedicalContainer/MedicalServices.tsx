import { ajax } from "rxjs/observable/dom/ajax";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";
import { SORT_TYPE } from "../../../common/Constants";
import { headers } from "../../../common/AjaxOptions";

const api = `${process.env.REACT_APP_CLIENT_ROOT}`;

export default class MedicalServices {

  getListPendingByClinicId(request: SearchBaseModel, clinicId: number) {
    let param = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&keyword=${request.keyword}`;
    if (request.sort) {
      param = `${param}&sortField=${request.sort.column}&isAsc=${request.sort
        .type === SORT_TYPE.ASC}`;
    }
    return ajax.getJSON(`${api}/PendingMedicalBill/getListByClinicId?${clinicId}&${param}`, headers());
  }
}
