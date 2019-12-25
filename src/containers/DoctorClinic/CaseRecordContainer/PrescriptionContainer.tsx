import React from "react";
import { Form, Input, Button, Spin, Popconfirm } from "antd";
import { FormComponentProps } from "antd/lib/form";
import Table, { ColumnProps } from "antd/lib/table";
import TextArea from "antd/lib/input/TextArea";
import { get, isEmpty } from "lodash";
import { toastr } from "react-redux-toastr";

import AddMedicineModal from "./AddMedicine";

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
      width: 60
    },
    {
      title: "Tên thuốc",
      dataIndex: "medicine.name",
      key: "medicine.name",
      width: 150
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 100
    },
    {
      title: "Cách dùng",
      dataIndex: "usage",
      key: "usage",
      width: 150
    },
    {
      title: "Đơn giá",
      dataIndex: "medicine.price",
      key: "medicine.price",
      render: (text, record: any) => formatPrice(record.medicine.price, "VND"),
      width: 100
    },
    {
      title: "",
      className: "text-right",
      width: 100,
      render: (text, record) => (
        <Popconfirm title="Bạn có muốn xoá" okText="Có" cancelText="Không" onConfirm={() => this.deletePrescriptionDetails(record)}
        >
          <a href="#">Xoá</a>
        </Popconfirm>
      ),
    }
  ];

  caseRecordApi = new CaseRecordApi();

  state = {
    listPrescriptionDetails: [],
    prescription: {},   // don thuoc
    listServices: [],
    isLoading: false,
    isOpenAddMedicine: false,
    listMedicine: [],
    isLoadingCreate: false
  };

  componentDidMount() {
    this.getPresciption();
    this.getListMedicine();
  }

  getPresciption = () => {
    const { caseRecordInfo } = this.props;
    if (isEmpty(caseRecordInfo)) { return; }
    this.setState({ isLoading: true }, () => {
      this.caseRecordApi.getPrescriptionByCaseRecord(caseRecordInfo.id).toPromise().then((data: any) => {
        this.setState({ isLoading: false, prescription: data.result });
        if (data.result === null) {
          this.createPresciption();
        }
        this.getListPresciptionDetails();
      });
    });
  }

  createPresciption = () => {
    const { caseRecordInfo } = this.props;
    let request = {
      clinicId: get(caseRecordInfo, "user.clinicId"),
      userId: get(caseRecordInfo, "userId"),
      caseRecordId: get(caseRecordInfo, "id"),
      createdAt: get(caseRecordInfo, "createAt")
    };
    this.caseRecordApi.createPrescription(request).toPromise();
  }

  updatePresciption = () => {
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

  renderTablePrescriptionDetails = () => {
    const { listPrescriptionDetails } = this.state;
    return (
      <Table
        className="mb-30 mt-20 tableCaseRecord"
        columns={this.columns}
        dataSource={listPrescriptionDetails}
        rowKey="index"
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    );

  }

  getListPresciptionDetails = () => {
    const { prescription } = this.state;
    let prescriptionId = get(prescription, "id") || 0;
    if (isEmpty(prescription)) { return; }
    this.setState({ isLoading: true }, () => {
      this.caseRecordApi.getListPrescriptionDetails(prescriptionId).toPromise().then((data: any) => {
        this.setState({ isLoading: false });
        if (data && data.hasErrors) {
          toastr.error(ERROR, data.Errors[0].message);
        } else {
          this.setState({ listPrescriptionDetails: data.result });
        }
      });
    });
  }

  onCreatePresciptionDetail = value => {
    const { prescription } = this.state;
    const request = { ...value, prescriptionId: get(prescription, "id") };
    this.setState({ isLoadingCreate: true }, () => {
      this.caseRecordApi.createPrescriptionDetails(request).toPromise().then((data: any
      ) => {
        if (data.response && data.response.hasErrors) {
          toastr.error(ERROR, "Tạo mới không thành công");
        } else {
          this.setState({ isOpenAddMedicine: false, isLoadingCreate: false });
          toastr.success(SUCCESS, "Tạo mới thành công");
          this.getListPresciptionDetails();
        }

      });
    });
  }

  onUpdatePresciption = () => {
    const { prescription } = this.state;
    const form = this.props.form;
    form.validateFields((err, values) => {
      let request = {
        name: values.name,
        id: get(prescription, "id")
      };
      this.setState({ isLoading: true }, () => {
        this.caseRecordApi.updatePrescription(request).toPromise().then((data: any) => {
          if (data.response && data.response.hasErrors) {
            toastr.error(ERROR);
          } else {
            this.setState({ isLoading: false });
            toastr.success(SUCCESS, "Cập nhật đơn thuốc thành công");
          }

        });
      });
    });
  }

  onExportResult = () => {
    // 
  }

  getListMedicine = () => {
    this.caseRecordApi.getListMedicine().toPromise().then((data: any) => {
      this.setState({ listMedicine: data.result });
    });
  }

  showModalAddMedicine = () => {
    this.setState({ isOpenAddMedicine: true });
  }

  closeModalAddMedicine = () => {
    this.setState({ isOpenAddMedicine: false });
  }

  renderButton = () => {
    const { prescription } = this.state;
    return (
      <div className="text-center">
        <Button type="primary" className="mr-20" onClick={this.onUpdatePresciption}>
          Lưu đơn thuốc
        </Button>

        <Button type="primary" className="mr-20" onClick={this.showModalAddMedicine}>
          Thêm thuốc
        </Button>

        {/* <Button type="primary" onClick={this.onExportResult} disabled={isEmpty(prescription)}>
          Xuất đơn thuốc
        </Button> */}
      </div>
    );
  }

  deletePrescriptionDetails = (record) => {
    this.caseRecordApi.deletePrescriptionDetails(record.prescriptionId, record.medicineId).toPromise().then((data: any) => {
      this.getListPresciptionDetails();
    });
  }

  render() {
    const { isLoading, isOpenAddMedicine, prescription, listMedicine, isLoadingCreate } = this.state;
    return (
      <Spin size="large" spinning={isLoading}>
        <div className="card-statistics h-100 card">
          <div className="container">
            <div className="cardTitle">Chi tiết đơn thuốc</div>
            {this.updatePresciption()}
            {this.renderTablePrescriptionDetails()}
            {this.renderButton()}
          </div>
        </div>
        {isOpenAddMedicine && (
          <AddMedicineModal
            isOpenModal={isOpenAddMedicine}
            isLoading={isLoadingCreate}
            closeModal={this.closeModalAddMedicine}
            prescriptionInfo={prescription}
            listMedicine={listMedicine}
            saveAction={this.onCreatePresciptionDetail}
          />
        )}
      </Spin>
    );
  }
}

const Prescription = Form.create()(PresciptionContainer);
export default Prescription;