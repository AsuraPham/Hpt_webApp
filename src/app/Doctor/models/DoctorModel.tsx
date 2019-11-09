export interface DoctorItem {
  id: number;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  dateOfBirth: Date;
  sex: string;
  education: string;
  departmentName: string;
}

export interface AddDoctorItem {
  fullName: string;
  email: string;
  address: string;
  phone: string;
  shortBiography: string;
  specialist: string;
  dateOfBirth: Date;
  sex: string;
  bloodGroup: string;
  education: string;
  departmentId: number;
}
