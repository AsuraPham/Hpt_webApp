import { PaginationState } from "../../../../common/models/Pagination";
import { KindOfRoomItem } from "./KindOfRoomModel";
import { SearchBaseModel } from "../../../../common/models/SearchBaseModel";

export interface KindOfRoomState {
  isLoading?: boolean;
  isOpenModal?: boolean;
  isOpenModalDelete?: boolean;
  pagination: PaginationState;
  kindOfRooms?: KindOfRoomItem[];
  searchRequest?: SearchBaseModel;
}
