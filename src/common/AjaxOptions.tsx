import { TOKEN_KEY } from "./Constants";
export function headers() {
  let tokenResult = localStorage.getItem(TOKEN_KEY);
  return {
    Authorization: tokenResult ? `Bearer ${tokenResult}` : `Bearer {}`,
    "Content-Type": "application/json"
  };
}

export function headAllowAnonymous() {
  return {
    "Accept": "application/json",
    "Content-Type": "application/json"
  };
}

export function ajaxOption() {
  return {
    headers: headers(),
    responseType: "json",
    "Access-Control-Allow-Origin": "*"
  };
}
