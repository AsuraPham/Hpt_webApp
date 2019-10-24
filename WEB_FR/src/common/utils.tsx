import { PASSWORD_MUST_FOLLOW_FORMAT } from './components/messagePage/const';
import { DEFAULT_DATE_FORMAT, DEFAULT_DATE_TIME_FORMAT } from './Constants';
const momnent = require('moment');
export function createReducer(initialState: any, reducerMap: object) {
  return (state = initialState, action: any) => {
    const reducer = reducerMap[action.type];

    return reducer ? reducer(state, action.payload) : state;
  };
}

export function dynamicColors() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

export function dateFormat(date: Date | String | undefined) {
  return date ? momnent(date).format(DEFAULT_DATE_FORMAT) : '';
}

export function dateTimeFormat(date: Date | String | undefined) {
  return date ? momnent(date).format(DEFAULT_DATE_TIME_FORMAT) : '';
}

export function isMobileNumber(mobileNumber: string) {
  const reg = new RegExp(/^\+?( *\d){8,16} *$/);
  return reg.test(mobileNumber);
}
export function removeSpacesString( mobileNumber: string ) {
  return mobileNumber.replace(/\s/g, '');
}

export function getResultvalidatePassword(dataValidate: any[], password: string) {
  let isPasswordFormatError = '';
  let dataUpdate = dataValidate.map(function (item: any, index: number) {
    const reg = item.rule;
    item.isValid = reg.test(password);
    if (!isPasswordFormatError && !item.isValid) {
      isPasswordFormatError = PASSWORD_MUST_FOLLOW_FORMAT;
    }
    return item;
  });
  return {
    isPasswordFormatError: isPasswordFormatError,
    dataUpdate: dataUpdate
  };
}

export function convertFileSize (bytes: any) {
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
      return '0 Byte';
  }
  let i: number = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 0);
  let value = bytes / Math.pow(1024, i);
  return `${value.toFixed(1)} ${sizes[i]}`;
}