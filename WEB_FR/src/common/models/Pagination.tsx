export interface PaginationModel {
  totalNumberOfRecords: number;
  pageIndex: number;
  pageSize?: number;
}
export interface PaginationState {
  total: number;
  current: number;
  pageSize?: number;
}
export const GetPagination = (meta: { pagination: PaginationModel }): PaginationState => {
  meta = meta || { pagination: {} };
  let pagination: PaginationState = {
    total: meta.pagination.totalNumberOfRecords,
    current: meta.pagination.pageIndex,
    pageSize: meta.pagination.pageSize
  };
  return pagination;
};