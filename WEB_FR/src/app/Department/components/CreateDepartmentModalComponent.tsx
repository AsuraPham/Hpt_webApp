import * as React from "react";
import { Modal, Form, Input, Button, Spin, Radio } from "antd";
import { FormComponentProps } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";

import { REQUIRED } from "../../../common/const/message";

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
}
class CreateDepartmentModalComponent extends React.Component<
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
  };

  closeModal = () => {
    this.props.closeModal();
  };

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
        title="Thêm mới khoa"
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
            <Form.Item label="Tên khoa">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Tên khoa" />)}
            </Form.Item>

            <Form.Item label="Mô tả">
              {getFieldDecorator("description", {
                rules: [{ required: true, message: REQUIRED }]
              })(
                <TextArea placeholder="Nhập mô tả" autoSize={{ minRows: 5 }} />
              )}
            </Form.Item>

            <Form.Item label="Trạng Thái">
              {getFieldDecorator("status", {
                rules: [{ required: true, message: REQUIRED }]
              })(
                <Radio.Group defaultValue={1}>
                  <Radio value={1}>Hoạt Động</Radio>
                  <Radio value={0}>Không hoạt động</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

const CreateDepartmentModal = Form.create()(CreateDepartmentModalComponent);
export default CreateDepartmentModal;
