import * as React from "react";
import { Modal, Form, Input, Button, Spin, InputNumber } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { REQUIRED } from "../../../common/const/message";

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
}
class CreateServicesModalComponent extends React.Component<
  Props & FormComponentProps
  > {
  constructor(props: Props & FormComponentProps) {
    super(props);
  }

  onSubmit = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.saveAction(values);
    });
  }

  closeModal = () => {
    this.props.closeModal();
  }

  render() {
    const { isOpenModal, isLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };

    return (
      <Modal
        className="form-modal"
        width={680}
        visible={isOpenModal}
        onCancel={this.closeModal}
        title="Thêm mới dịch vụ khám"
        footer={[
          <Button key="submit" type="primary" onClick={this.onSubmit}>
            Thêm
          </Button>
        ]}
        destroyOnClose={true}
      >
        <Spin size="large" spinning={isLoading}>
          <Form
            {...formItemLayout}
            layout="horizontal"
            className="from-create-user"
          >
            <Form.Item label="Tên dịch vụ">
              {getFieldDecorator("serviceName", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Tên dịch vụ" />)}
            </Form.Item>

            <Form.Item label="Đơn giá">
              {getFieldDecorator("price", {
                rules: [{ required: true, message: REQUIRED }]
              })(

                <InputNumber
                  style={{ width: "50%" }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  placeholder="Nhập giá"
                />
              )}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

const CreateServicesModal = Form.create()(CreateServicesModalComponent);
export default CreateServicesModal;
