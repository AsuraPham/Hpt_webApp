import * as React from "react";
import { Modal, Form, Input, Button, Spin, InputNumber, AutoComplete, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";

import { REQUIRED } from "../../../common/const/message";

const { Option } = AutoComplete;

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
  prescriptionInfo?: any;
  listMedicine?: any;
}
class AddMedicine extends React.Component<
  Props & FormComponentProps
  > {
  constructor(props: Props & FormComponentProps) {
    super(props);
  }
  state = {
    medicineDatasource: this.props.listMedicine
  };

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

  handleSearchMedicine = (value) => {
    const { listMedicine } = this.props;
    if (value) {
      const medicines = listMedicine || [];
      const q = value.toLocaleLowerCase();
      this.setState({
        medicineDatasource: value ? medicines.filter(u => {
          let name = u.name || "";
          return name.toLocaleLowerCase().indexOf(q) >= 0;
        }) : [],
      });
    } else {
      this.setState({ medicineDatasource: listMedicine });
    }
  }

  renderMedicineOption = (item: any) => {
    return (
      <Option key={item.id} value={item.name}>
        {item.name} ---- {item.price}đ
    </Option>
    );
  }

  onSelectMedicine = (value, object) => {
    const { form } = this.props;
    form.setFieldsValue({ medicineId: Number(object.key) });
  }

  render() {
    const { isOpenModal, isLoading } = this.props;
    const { medicineDatasource } = this.state;
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
        title="Thêm mới thuốc cho bệnh nhân"
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
            <Form.Item label="Tên thuốc">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: REQUIRED }]
              })
                (<AutoComplete
                  style={{ width: "100%" }}
                  dataSource={medicineDatasource.map(this.renderMedicineOption)}
                  onSearch={this.handleSearchMedicine}
                  onSelect={this.onSelectMedicine}
                  placeholder="Chọn thuốc hoặc gõ để tìm kiếm"
                  optionLabelProp="value"
                >
                  <Input suffix={<Icon type="search" />} />
                </AutoComplete>)}
            </Form.Item>
            <Form.Item {...formItemLayout}>
              {getFieldDecorator("medicineId")(<Input type="hidden" />)}
            </Form.Item>

            <Form.Item label="Số lượng">
              {getFieldDecorator("quantity", {
                rules: [{ required: true, message: "Nhập Số lượng" }]
              })(
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  placeholder="Nhập số lượng"
                />
              )}
            </Form.Item>

            <Form.Item label="Cách sử dụng">
              {getFieldDecorator("usage", {
                rules: [{ required: true, message: REQUIRED }]
              })(
                <TextArea placeholder="Nhập mô tả" autoSize={{ minRows: 5 }} />
              )}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

const AddMedicineModal = Form.create()(AddMedicine);
export default AddMedicineModal;
