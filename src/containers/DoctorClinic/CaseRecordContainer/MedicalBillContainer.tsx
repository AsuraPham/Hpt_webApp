import React from "react";
import { Form, Input, Select, Button, Spin, Popconfirm } from "antd";
import { FormComponentProps } from "antd/lib/form";
import Table, { ColumnProps } from "antd/lib/table";
import TextArea from "antd/lib/input/TextArea";
import { get, isEmpty } from "lodash";
import { toastr } from "react-redux-toastr";

import CaseRecordApi from "./CaseRecordServices";
import { ERROR, SUCCESS } from "../../../common/components/messages";
import { dateFormat } from "../../../common/utils";
import { formatPrice } from "../../../lib/numberFormatter";

interface Props {
  caseRecordInfo?: any;
}
class MedicalBillContainer extends React.Component<Props & FormComponentProps> {

  columns: ColumnProps<any>[] = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 5
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "servicesExamination.serviceName",
      key: "servicesExamination.serviceName",
      width: 100
    },
    {
      title: "Đơn giá",
      dataIndex: "servicesExamination.price",
      key: "servicesExamination.price",
      render: (text, record: any) => formatPrice(record.servicesExamination.price, "VND"),
      width: 50
    },
    {
      title: "",
      className: "text-right",
      width: 10,
      render: (text, record) => (
        <Popconfirm title="Bạn có muốn xoá" okText="Có" cancelText="Không" onConfirm={() => this.deleteMedicalBillDetails(record)}
        >
          <a href="#">Xoá</a>
        </Popconfirm>
      ),
    }
  ];

  caseRecordApi = new CaseRecordApi();

  state = {
    listMedicalBillDetails: [],
    medicalBill: null,
    listServices: [],
    isLoading: false
  };

  componentDidMount() {
    this.getListServices();
    this.getMedicallBill();
  }

  getListServices = () => {
    this.caseRecordApi.getListServices().toPromise().then((data: any) => {
      if (data && data.hasErrors) {
        toastr.error(ERROR, data.Errors[0].message);
      } else {
        this.setState({ listServices: data.result });
      }
    });
  }

  getMedicallBill = () => {
    const { caseRecordInfo } = this.props;
    if (isEmpty(caseRecordInfo)) { return; }
    this.setState({ isLoading: true }, () => {
      this.caseRecordApi.getMedicalBillByCaseRecord(caseRecordInfo.id).toPromise().then((data: any) => {
        this.setState({ isLoading: false, medicalBill: data.result });
        if (data.result === null) {
          this.createMedicalBill();
        }
        this.getListMedicalBillDetails();
      });
    });
  }

  createMedicalBill = () => {
    const { caseRecordInfo } = this.props;
    let request = {
      clinicId: get(caseRecordInfo, "user.clinicId"),
      userId: get(caseRecordInfo, "userId"),
      caseRecordId: get(caseRecordInfo, "id")
    };
    this.caseRecordApi.createMedicalBill(request).toPromise();
  }

  updateMedicalBill = () => {
    const { getFieldDecorator } = this.props.form;
    const { caseRecordInfo } = this.props;
    const { Option } = Select;
    const { medicalBill, listServices } = this.state;

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

    return (
      <>
        <Form {...formItemLayout}>
          <Form.Item label="Ngày khám">
            <Input placeholder="Ngày khám" value={dateFormat(get(caseRecordInfo, "createAt"))} readOnly />
          </Form.Item>

          <Form.Item label="Chuẩn đoán">
            {getFieldDecorator("diagnostic", {
              initialValue: get(medicalBill, "diagnostic")
            })(<TextArea placeholder="Chuẩn đoán" rows={7} />)}
          </Form.Item>

          <Form.Item label="Dịch vụ khám">
            {getFieldDecorator("servicesExaminationId", {
              rules: [{ required: false, message: "Chọn một dịch vụ" }],
              initialValue: get(medicalBill, "servicesExamination.id")
            })(
              <Select placeholder="Chọn một dịch vụ">
                {listServices.map((item: any) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.serviceName} --- {item.price}đ
                    </Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
        </Form>
      </>
    );
  }

  handleClickRowTalbe = (record) => {
    this.setState({ subclinicSelected: record });
  }

  renderTableMedicalBillDetails = () => {
    const { listMedicalBillDetails } = this.state;
    return (
      <Table
        onRow={(record) => ({
          onClick: () => this.handleClickRowTalbe(record)
        })}
        className="mb-30 mt-20 tableCaseRecord"
        columns={this.columns}
        dataSource={listMedicalBillDetails}
        rowKey="index"
        pagination={false}
      />
    );

  }

  getListMedicalBillDetails = () => {
    const { medicalBill } = this.state;
    let medicalBillId = get(medicalBill, "id") || 0;
    if (isEmpty(medicalBill)) { return; }
    this.setState({ isLoading: true }, () => {
      this.caseRecordApi.getListMedicalBillDetails(medicalBillId).toPromise().then((data: any) => {
        this.setState({ isLoading: false });
        if (data && data.hasErrors) {
          toastr.error(ERROR, data.Errors[0].message);
        } else {
          this.setState({ listMedicalBillDetails: data.result });
        }
      });
    });
  }

  onCreateMedicalBillDetail = () => {
    const { medicalBill } = this.state;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let request = {
        servicesExaminationId: values.servicesExaminationId,
        medicalBillId: get(medicalBill, "id")
      };

      this.caseRecordApi.createMedicalBillDetails(request).toPromise().then((data: any) => {
        if (data.response && data.response.hasErrors) {
          toastr.error(ERROR);
        } else {
          this.getListMedicalBillDetails();
        }
      });
    });
  }

  onUpdateMedicalBill = () => {
    const { medicalBill } = this.state;
    const form = this.props.form;
    form.validateFields((err, values) => {
      let request = {
        diagnostic: values.diagnostic,
        id: get(medicalBill, "id")
      };
      this.setState({ isLoading: true }, () => {
        this.caseRecordApi.updateMedicalBill(request).toPromise().then((data: any) => {
          if (data.response && data.response.hasErrors) {
            toastr.error(ERROR);
          } else {
            this.setState({ isLoading: false });
            toastr.success(SUCCESS, "Cập nhật kết quả khám thành công");
          }

        });
      });
    });
  }

  onExportResult = () => {
    // 
  }

  renderButton = () => {
    const { medicalBill } = this.state;
    return (
      <div className="text-center">
        <Button type="primary" className="mr-20" onClick={this.onUpdateMedicalBill} disabled={isEmpty(medicalBill)}>
          Lưu kết quả khám
        </Button>

        <Button type="primary" className="mr-20" onClick={this.onCreateMedicalBillDetail} disabled={isEmpty(medicalBill)}>
          Thêm dịch vụ khám
        </Button>

        <Button type="primary" onClick={this.onExportResult} disabled={isEmpty(medicalBill)}>
          Xuất phiếu khám
        </Button>
      </div>
    );
  }

  deleteMedicalBillDetails = (record) => {
    this.caseRecordApi.deleteMedicalBillDetails(record.servicesExaminationId, record.medicalBillId).toPromise().then((data: any) => {
      this.getListMedicalBillDetails();
    });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <Spin size="large" spinning={isLoading}>
        <div className="card-statistics h-100 card">
          <div className="container">
            <div className="cardTitle">Kết luận</div>
            {this.updateMedicalBill()}
            {this.renderTableMedicalBillDetails()}
            {this.renderButton()}
          </div>
        </div>
      </Spin>
    );
  }
}

const MedicalBill = Form.create()(MedicalBillContainer);
export default MedicalBill;