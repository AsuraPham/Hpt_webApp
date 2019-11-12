import { PaginationState } from "../../../common/models/Pagination";
import { ServicesItem } from "./ServicesModel";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

export interface ServicesState {
  isLoading?: boolean;
  isOpenModal?: boolean;
  isOpenModalDelete?: boolean;
  pagination: PaginationState;
  services?: ServicesItem[];
  searchRequest?: SearchBaseModel;
}
