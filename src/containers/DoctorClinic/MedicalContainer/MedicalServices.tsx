import { ajax } from "rxjs/observable/dom/ajax";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";
import { headers } from "../../../common/AjaxOptions";

const api = `${process.env.REACT_APP_CLIENT_ROOT}`;

export default class MedicalServices {

  getListPendingByClinicId(request: SearchBaseModel, clinicId: number) {
    let param = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&keyword=${request.keyword}`;
    param = `${param}&sortField=createAt&isAsc=true`;
    return ajax.getJSON(`${api}/PendingMedicalBill/getListByClinicId?clinicId=${clinicId}&${param}`, headers());
  }
}
