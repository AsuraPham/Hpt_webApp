import { PaginationState } from "../../../../common/models/Pagination";
import { UserItem } from "./UserModel";
import { SearchBaseModel } from "../../../../common/models/SearchBaseModel";

export interface UserState {
  isLoading?: boolean;
  isOpenModal?: boolean;
  isOpenModalDelete?: boolean;
  pagination: PaginationState;
  users?: UserItem[];
  searchRequest?: SearchBaseModel;
}
