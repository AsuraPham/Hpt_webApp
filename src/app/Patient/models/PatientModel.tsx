export interface PatientItem {
  id: number;
  fullName: string;
  email: string;
  idCard: string;
  address: string;
  folk: string;
  phone: string;
  dateOfBirth: Date;
  sex: string;
  bloodGroup: string;
  profession: string; // nghe nghiep
  dateOfSupplyHealth: Date;
  expirationDateHealth: Date;
  candidateName: string; // doi tuong
  codeHealthInsurance: string; // ma bhyt
}
