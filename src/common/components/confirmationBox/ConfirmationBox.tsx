import * as React from "react";
import Button from "../button/Button";

import "./confirmationBoxStyle.css";

export interface ConfirmationBoxProps {
  title: string;
  content: string;
  onCancel?: any;
  onConfirm?: any;
}

class ConfirmationBox extends React.Component<ConfirmationBoxProps> {
  constructor(props: ConfirmationBoxProps) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }
  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }
  render() {
    return (
      <div id="testModal">
        <div className={"modal show"}>
          <div className={"modal-dialog"}>
            <div className={"modal-content"}>
              <button
                type="button"
                onClick={this.onCancel}
                className={"close"}
                aria-label={"Close"}
              >
                <span aria-hidden="true">×</span>
              </button>
              <div className={"modal-body"}>
                <div className={"ic-title"}>{this.props.title}</div>
                <p>{this.props.content}</p>
                <div className={"btn-box"}>
                  <Button
                    name="Cancel"
                    className="no-icon"
                    type="button-cancel"
                    onClick={this.onCancel}
                  ></Button>
                  <Button
                    name="Confirm"
                    className="no-icon"
                    type="button-info"
                    onClick={this.onConfirm}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"modal-backdrop fade show"}></div>
      </div>
    );
  }
}

export default ConfirmationBox;
