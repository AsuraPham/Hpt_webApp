export interface MedicineItem {
  id: number;
  name: string;
  importDate: Date;
  dateOfManufacture: Date;
  expirationDate: Date;
  origin: string;
  quantityExists: number;
  unit: string;
  price: number;
}