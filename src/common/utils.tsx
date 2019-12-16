import { DEFAULT_DATE_FORMAT, DEFAULT_DATE_TIME_FORMAT } from "./Constants";
const momnent = require("moment");
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
  return "rgb(" + r + "," + g + "," + b + ")";
}

export function dateFormat(date: Date | String | undefined) {
  return date ? momnent(date).format(DEFAULT_DATE_FORMAT) : "";
}

export function dateTimeFormat(date: Date | String | undefined) {
  return date ? momnent(date).format(DEFAULT_DATE_TIME_FORMAT) : "";
}

export function isMobileNumber(mobileNumber: string) {
  const reg = new RegExp(/^\+?( *\d){8,16} *$/);
  return reg.test(mobileNumber);
}
export function removeSpacesString(mobileNumber: string) {
  return mobileNumber.replace(/\s/g, "");
}

export function convertFileSize(bytes: any) {
  let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) {
    return "0 Byte";
  }
  let i: number = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 0);
  let value = bytes / Math.pow(1024, i);
  return `${value.toFixed(1)} ${sizes[i]}`;
}