import { PaginationState } from "../../../common/models/Pagination";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";
import { PatientItem } from "./PatientModel";

export interface PatientState {
  isLoading?: boolean;
  isOpenModal: boolean;
  pagination: PaginationState;
  patients?: PatientItem[];
  searchRequest?: SearchBaseModel;
}
