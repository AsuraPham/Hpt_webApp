import { PaginationState } from "../../../common/models/Pagination";
import { MedicineItem } from "./MedicineModel";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

export interface MedicineState {
  isLoading?: boolean;
  isLoadingCreate?: boolean;
  isOpenModal?: boolean;
  pagination: PaginationState;
  medicines?: MedicineItem[];
  searchRequest?: SearchBaseModel;
}
