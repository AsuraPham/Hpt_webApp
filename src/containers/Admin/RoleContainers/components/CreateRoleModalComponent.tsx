import * as React from "react";
import { Modal, Form, Input, Button, Spin } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { REQUIRED } from "../../../../common/const/message";

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
}
class CreateRoleModalComponent extends React.Component<
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
        title="Thêm mới quyền"
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
            <Form.Item label="Tên quyền">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Tên quyền" />)}
            </Form.Item>

            <Form.Item label="Mô tả">
              {getFieldDecorator("description", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Mô tả" />)}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

const CreateRoleModal = Form.create()(CreateRoleModalComponent);
export default CreateRoleModal;
