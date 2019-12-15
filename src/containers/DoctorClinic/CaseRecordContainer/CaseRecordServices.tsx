import { ajax } from "rxjs/observable/dom/ajax";

import { headers } from "../../../common/AjaxOptions";

const api = `${process.env.REACT_APP_CLIENT_ROOT}`;

export default class CaseRecordServices {

  createSubclinicalResult(request: any) {
    return ajax.post(`${api}/SubclinicalResult`, request, headers());
  }

  updateSubclinicalResult(request: any) {
    return ajax.put(`${api}/SubclinicalResult`, request, headers());
  }

  getListSubclinicalResultByCaseRecord(caseRecordId: number) {
    return ajax.getJSON(`${api}/SubclinicalResult/subclinical/${caseRecordId}`, headers());
  }

  getMedicalBillByCaseRecord(caseRecordId: number) {
    return ajax.getJSON(`${api}/MedicalBill/caseRecord/${caseRecordId}`, headers());
  }

  createMedicalBill(request: any) {
    return ajax.post(`${api}/MedicalBill`, request, headers());
  }

  updateMedicalBill(request: any) {
    return ajax.put(`${api}/MedicalBill`, request, headers());
  }

  getListServices() {
    return ajax.getJSON(`${api}/ServicesExamination`, headers());
  }

  createMedicalBillDetails(request: any) {
    return ajax.post(`${api}/MedicalBillDetails`, request, headers());
  }

  getListMedicalBillDetails(medicalBillId: number) {
    return ajax.getJSON(`${api}/MedicalBillDetails/medicalBill/${medicalBillId}`, headers());
  }

  // api don thuoc
  createPrescription(request: any) {
    return ajax.post(`${api}/MedicalBill`, request, headers());
  }

  updatePrescription(request: any) {
    return ajax.put(`${api}/MedicalBill`, request, headers());
  }

  // chi tiet don thuoc

  createPrescriptionDetails(request: any) {
    return ajax.post(`${api}/MedicalBillDetails`, request, headers());
  }

  getListPrescriptionDetails(prescriptionId: number) {
    return ajax.getJSON(`${api}/MedicalBillDetails/medicalBill/${prescriptionId}`, headers());
  }
}