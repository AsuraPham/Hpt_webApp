import { ajax } from "rxjs/observable/dom/ajax";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";
import { headers } from "../../../common/AjaxOptions";

const api = `${process.env.REACT_APP_CLIENT_ROOT}`;

export default class InfoMedicalServices {

  createCaseRecord(request: any) {
    return ajax.post(`${api}/CaseRecord`, request, headers());
  }

  getListCaseRecordByPatientId(request: SearchBaseModel, patientId: number) {
    let param = `pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&keyword=${request.keyword}`;
    param = `${param}&sortField=createAt&isAsc=false`;
    return ajax.getJSON(`${api}/CaseRecord?patientId=${patientId}&${param}`, headers());
  }
}