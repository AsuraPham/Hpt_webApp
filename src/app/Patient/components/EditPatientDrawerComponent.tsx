import { Drawer, Form, Button, Col, Row, Input, Spin, DatePicker, Select, Radio } from "antd";
import * as React from "react";
import { FormComponentProps } from "antd/lib/form";
import { DEFAULT_DATE_FORMAT } from "../../../common/Constants";

import "../../Medicine/medicine.css";
import { REQUIRED, EMAIL_NOT_VALID } from "../../../common/const/message";
import { dateFormat } from "../../../common/utils";
import moment from "moment";
import { ListFolk, BloodGroup } from "../../../common/const/enum";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
  patientInfo?: any;
  listCandidate: [];
}

class EditPatientDrawerComponent extends React.Component<Props & FormComponentProps> {
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
    const { isLoading, isOpenModal, patientInfo, listCandidate } = this.props;
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };

    return (
      <div>
        <Drawer
          title="Cập nhật thông tin bệnh nhân"
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
                  <Form.Item label="Họ tên">
                    {getFieldDecorator("fullName", {
                      rules: [{ required: true, message: REQUIRED }],
                      initialValue: patientInfo.fullName
                    })(<Input placeholder="Họ và tên" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Chứng minh thư">
                    {getFieldDecorator("idCard", {
                      rules: [{ required: true, message: REQUIRED }],
                      initialValue: patientInfo.idCard
                    })(<Input placeholder="Nhập Chứng minh thư" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Giới tính">
                    {getFieldDecorator("sex", {
                      rules: [{ required: true, message: REQUIRED }],
                      initialValue: patientInfo.sex
                    })(
                      <Radio.Group>
                        <Radio value="Nam">Nam</Radio>
                        <Radio value="Nữ">Nữ</Radio>
                        <Radio value="Khác">Khác</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Nghề nghiệp">
                    {getFieldDecorator("profession", {
                      rules: [{ required: true, message: REQUIRED }],
                      initialValue: patientInfo.profession
                    })(<Input placeholder="Nhập nghề nghiệp" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Địa chỉ">
                    {getFieldDecorator("address", {
                      rules: [{ required: true, message: REQUIRED }],
                      initialValue: patientInfo.address
                    })(<TextArea placeholder="Nhập địa chỉ" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} className="createRow">
                <Col span={8}>
                  <Form.Item label="Ngày sinh">
                    {getFieldDecorator("dateOfBirth", { ...config, initialValue: moment(`${dateFormat(patientInfo.dateOfBirth)}`, DEFAULT_DATE_FORMAT) })(
                      <DatePicker
                        placeholder="Chọn ngày sinh"
                        format={DEFAULT_DATE_FORMAT}
                        style={{ width: "100%" }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Số điện thoại">
                    {getFieldDecorator("phone", {
                      rules: [{ required: true, message: REQUIRED }],
                      initialValue: patientInfo.phone
                    })(<Input placeholder="Nhập SĐT" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Email">
                    {getFieldDecorator("email", {
                      rules: [
                        { required: false, message: REQUIRED },
                        { type: "email", message: EMAIL_NOT_VALID },
                      ],
                      initialValue: patientInfo.email
                    })(<Input placeholder="Nhập Email" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} className="createRow">
                <Col span={8}>
                  <Form.Item label="Mã BHYT">
                    {getFieldDecorator("codeHealthInsurance", {
                      rules: [{ required: true, message: REQUIRED }],
                      initialValue: patientInfo.codeHealthInsurance
                    })(<Input placeholder="Nhập mã bảo hiểm y tế" />)}
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Ngày Cấp BHYT">
                    {getFieldDecorator("dateOfSupplyHealth", {
                      ...config, initialValue: moment(`${dateFormat(patientInfo.dateOfSupplyHealth)}`, DEFAULT_DATE_FORMAT)
                    })(
                      <DatePicker
                        placeholder="Chọn ngày cấp"
                        format={DEFAULT_DATE_FORMAT}
                        style={{ width: "100%" }}
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Ngày hết hạn BHYT">
                    {getFieldDecorator("expirationDateHealth", { ...config, initialValue: moment(`${dateFormat(patientInfo.expirationDateHealth)}`, DEFAULT_DATE_FORMAT) })(
                      <DatePicker
                        placeholder="Chọn ngày hết hạn"
                        format={DEFAULT_DATE_FORMAT}
                        style={{ width: "100%" }}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} className="createRow">
                <Col span={8}>
                  <Form.Item label="Dân tộc">
                    {getFieldDecorator("folk", {
                      rules: [{ required: true, message: REQUIRED }],
                      initialValue: patientInfo.folk
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
                </Col>
                <Col span={8}>
                  <Form.Item label="Nhóm máu">
                    {getFieldDecorator("bloodGroup", {
                      rules: [{ required: false, message: REQUIRED }],
                      initialValue: patientInfo.bloodGroup
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
                </Col>

                <Col span={8}>
                  <Form.Item label="Đối tượng">
                    {getFieldDecorator("candidateId", {
                      rules: [{ required: false, message: "Chọn đối tượng" }],
                      initialValue: patientInfo.candidateId
                    })(
                      <Select placeholder="Chọn một đối tượng">
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
              Cập nhật
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const EditPatientDrawer = Form.create()(EditPatientDrawerComponent);
export default EditPatientDrawer;