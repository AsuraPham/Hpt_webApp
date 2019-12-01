import { Drawer, Form, Button, Col, Row, Input, Spin, DatePicker, InputNumber, Select } from "antd";
import * as React from "react";
import { FormComponentProps } from "antd/lib/form";
import { DEFAULT_DATE_FORMAT } from "../../../common/Constants";

import "../../Medicine/medicine.css";
import { dateFormat } from "../../../common/utils";
import moment from "moment";

const { Option } = Select;

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
  patientInfo?: any;
  listClinic: [];
}

class CreatePendingMedicalComponent extends React.Component<Props & FormComponentProps> {
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
    const { isLoading, isOpenModal, patientInfo, listClinic } = this.props;
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };

    return (
      <div>
        <Drawer
          title="Tạo phiếu chờ khám"
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
                  <Form.Item label="Tên bệnh nhân">
                    <Input value={patientInfo.fullName} readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Địa chỉ">
                    <Input value={patientInfo.address} readOnly />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Chứng minh thư">
                    <Input value={patientInfo.idCard} readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Dân tộc">
                    <Input value={patientInfo.folk} readOnly />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} className="createRow">
                <Col span={12}>
                  <Form.Item label="Ngày sinh">
                    <Input value={dateFormat(patientInfo.dateOfBirth)} readOnly />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Ngày nhập">
                    {getFieldDecorator("createAt", { ...config, initialValue: moment(moment(), DEFAULT_DATE_FORMAT) })(
                      <DatePicker
                        placeholder="Chọn ngày nhập"
                        format={DEFAULT_DATE_FORMAT}
                        style={{ width: "100%" }}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Số Thứ tự">
                    {getFieldDecorator("ordinalNumber", {
                      rules: [{ required: true, message: "Nhập Số Thứ tự" }]
                    })(
                      <InputNumber
                        style={{ width: "100%" }}
                        min={0}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        placeholder="Nhập số thứ tự"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phòng khám">
                    {getFieldDecorator("clinicId", {
                      rules: [{ required: true, message: "Chọn phòng khám" }]
                    })(
                      <Select placeholder="Chọn một phòng khám">
                        {listClinic.map((item: any) => {
                          return (
                            <Option value={item.id} key={item.id}>
                              {item.nameClinic} / Số phòng {item.location}
                            </Option>
                          );
                        })}
                      </Select>
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

const CreatePendingMedicalDrawer = Form.create()(CreatePendingMedicalComponent);
export default CreatePendingMedicalDrawer;