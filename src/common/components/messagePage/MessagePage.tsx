import * as React from "react";
import {
  MESSAGE_KEY_RESET_PASSWORD_SUCCESS,
  MESSAGE_LIST,
  MESSAGE_KEY_CANDIDATE_DOES_NOT_REGISTER_ACCOUNT
} from "./const";
import "./style.css";

interface Props {
  match?: any;
}

class MessagePageComponent extends React.Component<Props, any> {
  messageId: string;
  constructor(props: Props) {
    super(props);
    this.messageId = props.match.params.messageId;
  }

  renderSwitch(messageId: string) {
    switch (messageId) {
      case MESSAGE_KEY_RESET_PASSWORD_SUCCESS:
        const urlLogin = `${window.location.origin}/login`;
        const msg = `${MESSAGE_LIST[messageId]} <a href=${urlLogin}> here</a>`;
        return (
          <p
            className="reset-password-success"
            dangerouslySetInnerHTML={{ __html: msg }}
          ></p>
        );
      case MESSAGE_KEY_CANDIDATE_DOES_NOT_REGISTER_ACCOUNT:
        return (
          <p
            className="candidate-does-not-register"
            dangerouslySetInnerHTML={{ __html: MESSAGE_LIST[messageId] }}
          ></p>
        );
      default:
        return (
          <p
            className="default"
            dangerouslySetInnerHTML={{ __html: MESSAGE_LIST[messageId] }}
          ></p>
        );
    }
  }

  render() {
    return (
      <div className="message-page">
        <div className="content">
          {this.renderSwitch(this.messageId)}
          <div className="back-home-page">
            <a href="/">&#171; Back to homepage</a>
          </div>
        </div>
      </div>
    );
  }
}

export default MessagePageComponent;
