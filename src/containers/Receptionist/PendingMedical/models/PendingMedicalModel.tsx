export interface PendingMedicalItem {
  id: number;
  ordinalNumber: number;
  createAt: Date;
  createBy: string;
  patientName: string;
  patientSex: string;
  patientAddress: string;
  patientDateOfBirth: Date;
  clinicName: string;
}
