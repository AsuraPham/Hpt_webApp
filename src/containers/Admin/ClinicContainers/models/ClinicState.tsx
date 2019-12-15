import { PaginationState } from "../../../../common/models/Pagination";
import { ClinicItem } from "./ClinicModel";
import { SearchBaseModel } from "../../../../common/models/SearchBaseModel";

export interface ClinicState {
  isLoading?: boolean;
  isOpenModal?: boolean;
  isOpenModalDelete?: boolean;
  pagination: PaginationState;
  clinics?: ClinicItem[];
  searchRequest?: SearchBaseModel;
}
