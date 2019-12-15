import * as React from "react";
import { Modal, Form, Input, Button, Spin, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { REQUIRED } from "../../../../common/const/message";

const { Option } = Select;

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
  listKindOfRoom: [];
  listDepartment: [];
}
class CreateClinicModalComponent extends React.Component<
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
    const { isOpenModal, isLoading, listDepartment, listKindOfRoom } = this.props;
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
        title="Thêm mới phòng"
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
            <Form.Item label="Tên phòng">
              {getFieldDecorator("nameClinic", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Tên loại phòng" />)}
            </Form.Item>

            <Form.Item label="Số phòng">
              {getFieldDecorator("location", {
                rules: [{ required: true, message: REQUIRED }]
              })(<Input placeholder="Tên loại phòng" />)}
            </Form.Item>

            <Form.Item label="Loại phòng">
              {getFieldDecorator("kindOfRoomId", {
                rules: [{ required: true, message: REQUIRED }]
              })(
                <Select placeholder="Chọn một loại phòng">
                  {listKindOfRoom.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.nameKindOfRoom}
                      </Option>
                    );
                  })}
                </Select>
              )}
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
          </Form>
        </Spin>
      </Modal>
    );
  }
}

const CreateClinicModal = Form.create()(CreateClinicModalComponent);
export default CreateClinicModal;
