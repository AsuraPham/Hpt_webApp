import { PaginationState } from "../../../../common/models/Pagination";
import { PendingMedicalItem } from "./PendingMedicalModel";
import { SearchBaseModel } from "../../../../common/models/SearchBaseModel";

export interface PendingMedicalState {
  isLoading?: boolean;
  isOpenModal?: boolean;
  isOpenModalDelete?: boolean;
  pagination: PaginationState;
  pendingMedicals?: PendingMedicalItem[];
  searchRequest?: SearchBaseModel;
}
