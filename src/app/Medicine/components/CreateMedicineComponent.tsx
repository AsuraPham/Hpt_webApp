import { Drawer, Form, Button, Col, Row, Input, Spin, DatePicker, InputNumber } from "antd";
import * as React from "react";
import { FormComponentProps } from "antd/lib/form";
import { DEFAULT_DATE_FORMAT } from "../../../common/Constants";

import "../medicine.css";

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
}

class CreateMedicineComponent extends React.Component<Props & FormComponentProps> {
  constructor(props: Props & FormComponentProps) {
    super(props);
  }

  onClose = () => {
    this.props.closeModal();
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

  render() {
    const { isLoading, isOpenModal } = this.props;
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };

    return (
      <div>
        <Drawer
          title="Thêm mới thuốc"
          width={720}
          onClose={this.onClose}
          visible={isOpenModal}
          className="dramwerForm"
          destroyOnClose
        >
          <Spin size="large" spinning={isLoading}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Tên thuốc">
                    {getFieldDecorator("name", {
                      rules: [{ required: true, message: "Nhập tên thuốc" }],
                    })(<Input placeholder="Nhập tên thuốc" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Xuất xứ">
                    {getFieldDecorator("origin", {
                      rules: [{ required: true, message: "Nhập xuất xứ" }],
                    })(<Input placeholder="Nhập xuất xứ" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} className="createRow">
                <Col span={8}>
                  <Form.Item label="Đơn vị">
                    {getFieldDecorator("unit", {
                      rules: [{ required: true, message: "Nhập đơn vị" }],
                    })(<Input placeholder="Nhập đơn vị" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Số lượng">
                    {getFieldDecorator("quantityExists", {
                      rules: [{ required: true, message: "Nhập Số lượng" }]
                    })(
                      <InputNumber
                        style={{ width: "100%" }}
                        min={0}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        placeholder="Nhập số lượng"
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Đơn giá">
                    {getFieldDecorator("price", {
                      rules: [{ required: true, message: "Nhập giá" }]
                    })(
                      <InputNumber
                        style={{ width: "100%" }}
                        min={0}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        placeholder="Nhập giá"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="createRow">
                <Col span={8}>
                  <Form.Item label="Ngày nhập">
                    {getFieldDecorator("importDate", config)(
                      <DatePicker
                        placeholder="Chọn ngày nhập"
                        format={DEFAULT_DATE_FORMAT}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Ngày sản xuất">
                    {getFieldDecorator("dateOfManufacture", config)(
                      <DatePicker
                        placeholder="Chọn ngày sản xuất"
                        format={DEFAULT_DATE_FORMAT}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Ngày hết hạn">
                    {getFieldDecorator("expirationDate", config)(
                      <DatePicker
                        placeholder="Chọn ngày hết hạn"
                        format={DEFAULT_DATE_FORMAT}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
          <div
            className="formFooter"
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Huỷ
            </Button>
            <Button onClick={this.onSubmit} key="submit" type="primary">
              Tạo mới
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const CreateMedicineDrawer = Form.create()(CreateMedicineComponent);
export default CreateMedicineDrawer;