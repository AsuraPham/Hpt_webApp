import { PaginationState } from "../../../common/models/Pagination";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";
import { PatientItem } from "./PatientModel";

export interface PatientState {
  isLoading?: boolean;
  isLoadingEdit?: boolean;
  isOpenModal: boolean;
  pagination: PaginationState;
  isOpenModalDelete: boolean;
  isOpenModalEdit: boolean;
  patients?: PatientItem[];
  searchRequest?: SearchBaseModel;
}
