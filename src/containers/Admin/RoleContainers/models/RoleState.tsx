import { PaginationState } from "../../../../common/models/Pagination";
import { RoleItem } from "./RoleModel";
import { SearchBaseModel } from "../../../../common/models/SearchBaseModel";

export interface RoleState {
  isLoading?: boolean;
  isOpenModal?: boolean;
  isOpenModalDelete?: boolean;
  pagination: PaginationState;
  roles?: RoleItem[];
  searchRequest?: SearchBaseModel;
}
