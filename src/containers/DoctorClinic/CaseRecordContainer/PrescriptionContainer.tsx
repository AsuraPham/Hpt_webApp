import React from "react";
import { Form, Input, Button, Spin } from "antd";
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
class PresciptionContainer extends React.Component<Props & FormComponentProps> {

  columns: ColumnProps<any>[] = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 5
    },
    {
      title: "Tên thuốc",
      dataIndex: "servicesExamination.serviceName",
      key: "servicesExamination.serviceName",
      width: 100
    },
    {
      title: "Số lượng",
      dataIndex: "servicesExamination.serviceName",
      key: "servicesExamination.serviceName",
      width: 100
    },
    {
      title: "Cách dùng",
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
    }
  ];

  caseRecordApi = new CaseRecordApi();

  state = {
    listPrescriptionDetails: [],
    prescription: null,   // don thuoc
    listServices: [],
    isLoading: false
  };

  componentDidMount() {
    this.getMedicallBill();
  }

  getMedicallBill = () => {
    const { caseRecordInfo } = this.props;
    if (isEmpty(caseRecordInfo)) { return; }
    this.setState({ isLoading: true }, () => {
      this.caseRecordApi.getMedicalBillByCaseRecord(caseRecordInfo.id).toPromise().then((data: any) => {
        this.setState({ isLoading: false, prescription: data.result });
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
    const { prescription } = this.state;

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

          <Form.Item label="Lời dặn">
            {getFieldDecorator("name", {
              initialValue: get(prescription, "name")
            })(<TextArea placeholder="Lời dặn" rows={7} />)}
          </Form.Item>
        </Form>
      </>
    );
  }

  renderTableSubclinicResult = () => {
    const { prescription } = this.state;
    return (
      <Table
        className="mb-30 mt-20 tableCaseRecord"
        columns={this.columns}
        dataSource={prescription}
        rowKey="id"
        pagination={false}
      />
    );

  }

  getListMedicalBillDetails = () => {
    const { prescription } = this.state;
    let prescriptionId = get(prescription, "id") || 0;
    if (isEmpty(prescription)) { return; }
    this.setState({ isLoading: true }, () => {
      this.caseRecordApi.getListMedicalBillDetails(prescriptionId).toPromise().then((data: any) => {
        this.setState({ isLoading: false });
        if (data && data.hasErrors) {
          toastr.error(ERROR, data.Errors[0].message);
        } else {
          this.setState({ prescription: data.result });
        }
      });
    });
  }

  onCreateMedicalBillDetail = () => {
    const { prescription } = this.state;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let request = {
        servicesExaminationId: values.servicesExaminationId,
        prescriptionId: get(prescription, "id")
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
    const { prescription } = this.state;
    const form = this.props.form;
    form.validateFields((err, values) => {
      let request = {
        diagnostic: values.diagnostic,
        id: get(prescription, "id")
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
    const { prescription } = this.state;
    return (
      <div className="text-center">
        <Button type="primary" className="mr-20" onClick={this.onUpdateMedicalBill} disabled={isEmpty(prescription)}>
          Lưu đơn thuốc
        </Button>

        <Button type="primary" className="mr-20" onClick={this.onCreateMedicalBillDetail} disabled={isEmpty(prescription)}>
          Thêm thuốc
        </Button>

        <Button type="primary" onClick={this.onExportResult} disabled={isEmpty(prescription)}>
          Xuất đơn thuốc
        </Button>
      </div>
    );

  }

  render() {
    const { isLoading } = this.state;
    return (
      <Spin size="large" spinning={isLoading}>
        <div className="card-statistics h-100 card">
          <div className="container">
            <div className="cardTitle">Chi tiết đơn thuốc</div>
            {this.updateMedicalBill()}
            {this.renderTableSubclinicResult()}
            {this.renderButton()}
          </div>
        </div>
      </Spin>
    );
  }
}

const Prescription = Form.create()(PresciptionContainer);
export default Prescription;