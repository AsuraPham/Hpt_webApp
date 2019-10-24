import * as actionCreators from "../NotificationAction";
import * as React from "react";
import Form, { FormComponentProps } from "antd/lib/form";
import {
  NOTIFICATION_DETAIL_TITLE,
  NOTIFICATION_ID_LABEL,
  CASE_LABEL,
  MESSAGE_LABEL,
  DATE_OF_SENDING_LABEL,
  USER_ID
} from "../../../common/const/label";
import { Modal } from "antd";
import { dateFormat } from "../../../common/utils";
interface Props {
  isLoading?: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
  actions: typeof actionCreators;
  notificationDetail: any;
}
class NotificationDetailModalComponent extends React.Component<
  Props & FormComponentProps
> {
  constructor(props: Props & FormComponentProps) {
    super(props);
  }
  closeModal = () => {
    this.props.closeModal({ isOpenModal: false });
  };
  render() {
    const notificationDetail = this.props.notificationDetail || [];

    return (
      <Modal
        className="form-modal-notification"
        visible={this.props.isOpenModal}
        onCancel={this.closeModal}
        title={NOTIFICATION_DETAIL_TITLE}
        destroyOnClose={true}
        footer={null}
      >
        <div className="form-group row info">
          <label className="col-md-3  col-form-label text-left">
            {NOTIFICATION_ID_LABEL}
          </label>
          <label className="col-md-9  col-form-label txt-right">
            {notificationDetail.notificationId}
          </label>
        </div>
        <div className="form-group row info">
          <label className="col-md-3  col-form-label text-left">
            {CASE_LABEL}
          </label>
          <label className="col-md-9 col-form-label txt-right">
            {notificationDetail.case}
          </label>
        </div>
        <div className="form-group row info">
          <label className="col-md-3  col-form-label text-left">
            {MESSAGE_LABEL}
          </label>
          <label className="col-md-9 col-form-label txt-right">
            {notificationDetail.message}
          </label>
        </div>
        <div className="form-group row info">
          <label className="col-md-3  col-form-label text-left">
            {DATE_OF_SENDING_LABEL}
          </label>
          <label className="col-md-9 col-form-label txt-right">
            {dateFormat(notificationDetail.dateOfSending)}
          </label>
        </div>
        <div className="form-group row">
          <label className="col-md-3 col-form-label text-left">{USER_ID}</label>
          <label className="col-md-9 col-form-label txt-right">
            {notificationDetail.userId}
          </label>
        </div>
      </Modal>
    );
  }
}
const NotificationDetailModal = Form.create()(NotificationDetailModalComponent);
export default NotificationDetailModal;
