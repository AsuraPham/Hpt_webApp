import { PaginationState } from "../../../common/models/Pagination";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";
import { DoctorItem } from "./DoctorModel";

export interface DoctorState {
  isLoading?: boolean;
  isOpenModal: boolean;
  pagination: PaginationState;
  doctors?: DoctorItem[];
  searchRequest?: SearchBaseModel;
}
