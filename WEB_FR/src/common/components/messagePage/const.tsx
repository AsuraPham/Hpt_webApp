export const MESSAGE_KEY_RESET_PASSWORD_SUCCESS = "reset_password_success";
export const MESSAGE_KEY_CANDIDATE_DOES_NOT_REGISTER_ACCOUNT =
  "candidate_does_not_register_account";
export const MESSAGE_LIST = {
  reset_password_success:
    "Your password has been reset successfully.<br/> Please sign in with your new password",
  candidate_does_not_register_account:
    "Thanks for using our system. Have a great day!"
};
export const PASSWORD_MUST_AT_LEAST_8 = "Be at least 8 characters";
export const PASSWORD_MUST_AT_LEAST_ONE_CAPITAL =
  "Have at least one capital letter";
export const PASSWORD_MUST_AT_LEAST_ONE_LETTER = "Have at least one letter";
export const PASSWORD_MUST_AT_LEAST_ONE_NUMBER = "Have at least one number";
export const PASSWORD_MUST_FOLLOW_FORMAT =
  "Please input your password is follow format correct";
export const PASSWORD_VALIDATE_RULE = [
  {
    text: PASSWORD_MUST_AT_LEAST_ONE_LETTER,
    rule: /^(?=.*[a-z])/,
    isValid: false
  },
  {
    text: PASSWORD_MUST_AT_LEAST_ONE_CAPITAL,
    rule: /^(?=.*[A-Z])/,
    isValid: false
  },
  {
    text: PASSWORD_MUST_AT_LEAST_ONE_NUMBER,
    rule: /^(?=.*[0-9])/,
    isValid: false
  },
  {
    text: PASSWORD_MUST_AT_LEAST_8,
    rule: /^(?=.*[a-zA-Z0-9]).{8,}$/,
    isValid: false
  }
];
