import { ajax } from "rxjs/observable/dom/ajax";

import { headers } from "../../common/AjaxOptions";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";
import { SORT_TYPE } from "../../common/Constants";

const api = `${process.env.REACT_APP_CLIENT_ROOT}`;

export default class PatientServices {
  static createPatient(request: any) {
    return ajax.post(`${api}/Patient`, request, headers());
  }

  static getListPatient(request: SearchBaseModel) {
    let param = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&keyword=${request.keyword}`;
    if (request.sort) {
      param = `${param}&sortField=${request.sort.column}&isAsc=${request.sort
        .type === SORT_TYPE.ASC}`;
    }
    return ajax.getJSON(`${api}/Patient?${param}`, headers());
  }

  static deletePatient(patientId: any) {
    return ajax.delete(`${api}/Patient/${patientId}`, headers());
  }

  static editPatient(request: any) {
    return ajax.put(`${api}/Patient`, request, headers());
  }

  getListClinic() {
    return ajax.getJSON(`${api}/Clinic/get-list`, headers());
  }

  createPendingMedical(request: any) {
    return ajax.post(`${api}/PendingMedicalBill`, request, headers());
  }

  getListCandidate() {
    return ajax.getJSON(`${api}/Candidate/get-list`, headers());
  }

}
