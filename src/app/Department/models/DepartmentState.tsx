import { PaginationState } from "../../../common/models/Pagination";
import { DepartmentItem } from "./DepartmentModel";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

export interface DepartmentState {
  isLoading?: boolean;
  isOpenModal?: boolean;
  isOpenModalDelete?: boolean;
  pagination: PaginationState;
  departments?: DepartmentItem[];
  searchRequest?: SearchBaseModel;
}
