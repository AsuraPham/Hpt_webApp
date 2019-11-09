import * as React from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Spin,
  DatePicker,
  Select,
  Radio
} from "antd";
import { FormComponentProps } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";
import { REQUIRED } from "../../../common/const/message";
import { DATE_FORMAT_DD_MM_YYY } from "../../../common/Constants";
import { BloodGroup } from "../../../common/const/enum";

const { Option } = Select;

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
  listDepartment: [];
}
class CreateDoctorModalComponent extends React.Component<
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
    const { isOpenModal, isLoading, listDepartment } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
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
        width={700}
        visible={isOpenModal}
        onCancel={this.closeModal}
        title="Thêm mới bác sĩ"
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
            <Form.Item label="Họ tên">
              {getFieldDecorator("fullName", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Họ và tên" />)}
            </Form.Item>

            <Form.Item label="Ngày sinh">
              {getFieldDecorator("dateOfBirth", config)(
                <DatePicker
                  placeholder="Chọn ngày sinh"
                  format={DATE_FORMAT_DD_MM_YYY}
                />
              )}
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

            <Form.Item label="Địa chỉ">
              {getFieldDecorator("address", {
                rules: [{ required: true, message: REQUIRED }]
              })(<TextArea placeholder="Nhập địa chỉ" />)}
            </Form.Item>

            <Form.Item label="Số điện thoại">
              {getFieldDecorator("phone", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Nhập SĐT" />)}
            </Form.Item>

            <Form.Item label="Trình độ">
              {getFieldDecorator("education", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Nhập trình độ" />)}
            </Form.Item>

            <Form.Item label="Tiểu sử ngắn">
              {getFieldDecorator("shortBiography", {
                rules: [{ required: false, message: REQUIRED }]
              })(<TextArea placeholder="Nhập tiểu sử" />)}
            </Form.Item>

            <Form.Item label="Chuyên môn">
              {getFieldDecorator("specialist", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Nhập chuyên môn" />)}
            </Form.Item>

            <Form.Item label="Chuyên Khoa">
              {getFieldDecorator("departmentId", {
                rules: [{ required: true, message: REQUIRED }]
              })(
                <Select placeholder="Chọn một khoa">
                  {listDepartment.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Email">
              {getFieldDecorator("email", {
                rules: [{ required: false, message: REQUIRED }]
              })(<Input placeholder="Nhập Email" />)}
            </Form.Item>

            <Form.Item label="Nhóm máu">
              {getFieldDecorator("bloodGroup", {
                rules: [{ required: true, message: REQUIRED }]
              })(
                <Select placeholder="Chọn một nhóm máu">
                  {BloodGroup.map(item => {
                    return (
                      <Option value={item} key={item}>
                        {item}
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

const CreateDoctorModal = Form.create()(CreateDoctorModalComponent);
export default CreateDoctorModal;
