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
import {
  REQUIRED,
  EMAIL_NOT_VALID,
  SELECT_DATE
} from "../../../common/const/message";
import { DEFAULT_DATE_FORMAT } from "../../../common/Constants";
import { BloodGroup, ListFolk } from "../../../common/const/enum";

const { Option } = Select;

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
  listCandidate: [];
}
class CreatePatientModalComponent extends React.Component<
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
    const { isOpenModal, isLoading, listCandidate } = this.props;
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
      rules: [{ type: "object", required: false, message: SELECT_DATE }]
    };
    const config1 = {
      rules: [{ type: "object", required: true, message: SELECT_DATE }]
    };

    return (
      <Modal
        className="form-modal"
        width={700}
        visible={isOpenModal}
        onCancel={this.closeModal}
        title="Thêm mới bệnh nhân"
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

            <Form.Item label="Chứng minh thư">
              {getFieldDecorator("idCard", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Nhập Chứng minh thư" />)}
            </Form.Item>

            <Form.Item label="Ngày sinh">
              {getFieldDecorator("dateOfBirth", config1)(
                <DatePicker
                  placeholder="Chọn ngày sinh"
                  format={DEFAULT_DATE_FORMAT}
                />
              )}
            </Form.Item>

            <Form.Item label="Mã BHYT">
              {getFieldDecorator("codeHealthInsurance", {
                rules: [{ required: false, message: REQUIRED }]
              })(<Input placeholder="Nhập mã bảo hiểm y tế" />)}
            </Form.Item>

            <Form.Item label="Ngày Cấp BHYT">
              {getFieldDecorator("dateOfSupplyHealth", config)(
                <DatePicker
                  placeholder="Chọn ngày cấp"
                  format={DEFAULT_DATE_FORMAT}
                />
              )}
            </Form.Item>

            <Form.Item label="Ngày hết hạn BHYT">
              {getFieldDecorator("expirationDateHealth", config)(
                <DatePicker
                  placeholder="Chọn ngày hết hạn"
                  format={DEFAULT_DATE_FORMAT}
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

            <Form.Item label="Nghề nghiệp">
              {getFieldDecorator("profession", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Nhập nghề nghiệp" />)}
            </Form.Item>

            <Form.Item label="Số điện thoại">
              {getFieldDecorator("phone", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Nhập SĐT" />)}
            </Form.Item>

            <Form.Item label="Email">
              {getFieldDecorator("email", {
                rules: [
                  { required: false, message: REQUIRED },
                  { type: "email", message: EMAIL_NOT_VALID }
                ]
              })(<Input placeholder="Nhập Email" />)}
            </Form.Item>

            <Form.Item label="Dân tộc">
              {getFieldDecorator("folk", {
                rules: [{ required: true, message: REQUIRED }]
              })(
                <Select placeholder="Chọn một dân tộc">
                  {ListFolk.map(item => {
                    return (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Đối tượng">
              {getFieldDecorator("candidateId", {
                rules: [{ required: false, message: REQUIRED }]
              })(
                <Select placeholder="Chọn đối tượng">
                  {listCandidate.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Nhóm máu">
              {getFieldDecorator("bloodGroup", {
                rules: [{ required: false, message: REQUIRED }]
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

const CreatePatientModal = Form.create()(CreatePatientModalComponent);
export default CreatePatientModal;
