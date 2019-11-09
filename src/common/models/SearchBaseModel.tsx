export interface SearchBaseModel {
  pageSize?: number;
  keyword?: string;
  pageIndex?: number;
  sort?: SortModel;
}

export interface SortModel {
  column?: string;
  type?: string;
}