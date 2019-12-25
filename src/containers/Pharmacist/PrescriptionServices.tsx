import { ajax } from "rxjs/observable/dom/ajax";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";
import { headers } from "../../common/AjaxOptions";

const api = `${process.env.REACT_APP_CLIENT_ROOT}`;

export default class MedicalServices {

  getListPrescription(request: SearchBaseModel) {
    let param = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&keyword=${request.keyword}`;
    param = `${param}&sortField=createdAt&isAsc=false`;
    return ajax.getJSON(`${api}/Prescription?${param}`, headers());
  }

  getListPrescriptionDetails(prescriptionId: number) {
    return ajax.getJSON(`${api}/PrescriptionDetails/prescription/${prescriptionId}`, headers());
  }

  changeStatusPrescription(request: any) {
    return ajax.put(`${api}/Prescription`, request, headers());
  }
}
