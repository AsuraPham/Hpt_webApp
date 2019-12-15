import * as React from "react";
import { Modal, Form, Input, Button, Spin, Select, Radio, DatePicker } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { REQUIRED, EMAIL_NOT_VALID } from "../../../../common/const/message";
import TextArea from "antd/lib/input/TextArea";
import { DEFAULT_DATE_FORMAT } from "../../../../common/Constants";

const { Option } = Select;

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
  listClinic: [];
  listRole: [];
}

class CreateUserModalComponent extends React.Component<
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
    const { isOpenModal, isLoading, listClinic, listRole } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };

    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };

    return (
      <Modal
        className="form-modal"
        width={680}
        visible={isOpenModal}
        onCancel={this.closeModal}
        title="Thêm mới người dùng"
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
            <Form.Item label="Tên người dùng">
              {getFieldDecorator("fullName", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Tên người dùng" />)}
            </Form.Item>

            <Form.Item label="Giới tính">
              {getFieldDecorator("sex", {
                rules: [{ required: true, message: REQUIRED }]
              })(
                <Radio.Group>
                  <Radio value="Nam">Nam</Radio>
                  <Radio value="Nữ">Nữ</Radio>
                  <Radio value="Khác">Khác</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item label="Ngày sinh">
              {getFieldDecorator("dateOfBirth", config)(
                <DatePicker
                  placeholder="Chọn ngày sinh"
                  format={DEFAULT_DATE_FORMAT}
                />
              )}
            </Form.Item>

            <Form.Item label="Tên đăng nhập">
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Nhập đăng nhập" />)}
            </Form.Item>

            <Form.Item label="Mật khẩu">
              {getFieldDecorator("password", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Nhập mật khẩu" type="password" />)}
            </Form.Item>

            <Form.Item label="Địa chỉ">
              {getFieldDecorator("address", {
                rules: [{ required: true, message: REQUIRED }]
              })(<TextArea placeholder="Nhập địa chỉ" />)}
            </Form.Item>

            <Form.Item label="Email">
              {getFieldDecorator("email", {
                rules: [{ required: true, message: REQUIRED },
                { type: "email", message: EMAIL_NOT_VALID }]
              })(<Input placeholder="Nhập Email" />)}
            </Form.Item>

            <Form.Item label="Vị trí">
              {getFieldDecorator("position", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Nhập vị trí" />)}
            </Form.Item>

            <Form.Item label="Số điện thoại">
              {getFieldDecorator("phone", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Nhập SĐT" />)}
            </Form.Item>

            <Form.Item label="Loại quyền">
              {getFieldDecorator("roleId", {
                rules: [{ required: true, message: REQUIRED }]
              })(
                <Select placeholder="Chọn quyền">
                  {listRole.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Tên phòng">
              {getFieldDecorator("clinicId", {
                rules: [{ required: false, message: REQUIRED }]
              })(
                <Select placeholder="Chọn phòng khám">
                  {listClinic.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.nameClinic}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

const CreateUserModal = Form.create()(CreateUserModalComponent);
export default CreateUserModal;
