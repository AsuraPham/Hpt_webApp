// Common
export const GLOBAL_SERVER_ERROR = "SERVER_ERROR";
export const handleServerError = (payload: any) => ({
  type: GLOBAL_SERVER_ERROR,
  payload
});

// Waggle
export const GET_LIST_WAGGLE = "GET_LIST_WAGGLE";
export const GET_LIST_WAGGLE_SUCCESS = "GET_LIST_WAGGLE_SUCCESS";
export const GET_LIST_WAGGLE_FAIL = "GET_LIST_WAGGLE_FAIL";
