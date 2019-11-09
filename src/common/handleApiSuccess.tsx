// import { Observable } from 'rxjs';
import { toastr } from 'react-redux-toastr';
import { ERROR, SUCCESS } from '../common/components/messages';
export function handleApiSuccess(response: any, fnSuccess: Function, fnError: Function, message?: string) {
  if (!response.hasErrors && response.result) {
    if (message) {
      toastr.error(SUCCESS, message);
    }
    return fnSuccess(response.result);
  } else {
    toastr.error(ERROR, message ? message : response.errors[0].message);
    return fnError(response);
  }
}