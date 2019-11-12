import { PaginationState } from "../../../common/models/Pagination";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";
import { PatientItem } from "./PatientModel";

export interface PatientState {
  isLoading?: boolean;
  isOpenModal: boolean;
  pagination: PaginationState;
  isOpenModalDelete: boolean;
  patients?: PatientItem[];
  searchRequest?: SearchBaseModel;
}
