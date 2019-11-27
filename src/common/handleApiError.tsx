import { toastr } from "react-redux-toastr";
import { ERROR } from "../common/components/messages";
import { handleServerError } from "../actionTypes";
import { Observable } from "rxjs";
import { HTTP_STATUS_UNAUTHORIZED } from "./Constants";

export function handleApiError(error: any) {
  if (error && error.status === HTTP_STATUS_UNAUTHORIZED) { // login, token expired
    localStorage.removeItem("token");
    return Observable.of();
  }
  const errors = error.response && error.response.errors ? error.response.errors : [];
  if (errors && errors.length > 0) {
    toastr.error(ERROR, errors[0].message);
  } else {
    toastr.error(ERROR, error.message);
  }
  return Observable.of(handleServerError(error));
}