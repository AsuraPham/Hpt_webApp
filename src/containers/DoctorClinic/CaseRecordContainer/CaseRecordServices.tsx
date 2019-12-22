import { ajax } from "rxjs/observable/dom/ajax";

import { headers } from "../../../common/AjaxOptions";

const api = `${process.env.REACT_APP_CLIENT_ROOT}`;

export default class CaseRecordServices {
  // ket qua can lam sang
  createSubclinicalResult(request: any) {
    return ajax.post(`${api}/SubclinicalResult`, request, headers());
  }

  updateSubclinicalResult(request: any) {
    return ajax.put(`${api}/SubclinicalResult`, request, headers());
  }

  getListSubclinicalResultByCaseRecord(caseRecordId: number) {
    return ajax.getJSON(`${api}/SubclinicalResult/subclinical/${caseRecordId}`, headers());
  }

  deleteSubclinicalResult(subclinicalResultId: number) {
    return ajax.delete(`${api}/SubclinicalResult/${subclinicalResultId}`, headers());
  }

  // don thuoc
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
  // chi tiet don thuoc
  createMedicalBillDetails(request: any) {
    return ajax.post(`${api}/MedicalBillDetails`, request, headers());
  }

  getListMedicalBillDetails(medicalBillId: number) {
    return ajax.getJSON(`${api}/MedicalBillDetails/medicalBill/${medicalBillId}`, headers());
  }

  deleteMedicalBillDetails(serviceId: number, medicalBillId: number) {
    return ajax.delete(`${api}/MedicalBillDetails/service/${serviceId}/medical/${medicalBillId}`, headers());
  }

  // api don thuoc
  createPrescription(request: any) {
    return ajax.post(`${api}/Prescription`, request, headers());
  }

  getPrescriptionByCaseRecord(caseRecordId: number) {
    return ajax.getJSON(`${api}/Prescription/prescription/${caseRecordId}`, headers());
  }

  updatePrescription(request: any) {
    return ajax.put(`${api}/Prescription`, request, headers());
  }

  // chi tiet don thuoc

  createPrescriptionDetails(request: any) {
    return ajax.post(`${api}/PrescriptionDetails`, request, headers());
  }

  getListPrescriptionDetails(prescriptionId: number) {
    return ajax.getJSON(`${api}/PrescriptionDetails/prescription/${prescriptionId}`, headers());
  }

  deletePrescriptionDetails(prescriptionId: number, medicineId: number) {
    return ajax.delete(`${api}/PrescriptionDetails/prescription/${prescriptionId}/medicine/${medicineId}`, headers());
  }
  // list thuoc
  getListMedicine() {
    return ajax.getJSON(`${api}/Medicine`, headers());
  }
}