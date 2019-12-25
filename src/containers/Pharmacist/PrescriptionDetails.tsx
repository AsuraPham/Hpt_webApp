import { Drawer, Form, Button } from "antd";
import * as React from "react";
import { dateFormat } from "../../common/utils";
import get from "lodash/get";
import Table, { ColumnProps } from "antd/lib/table";
import { formatPrice } from "../../lib/numberFormatter";
import { toastr } from "react-redux-toastr";
import PrescriptionServices from "./PrescriptionServices";
import { ERROR } from "../../common/components/messages";
import isEmpty from "lodash/isEmpty";
import Total from "../../helpers/total";

interface Props {
  isLoading: boolean;
  isOpenModal: boolean;
  saveAction?: any;
  closeModal?: any;
  prescritionDetails?: any;
  listCandidate: [];
}

class PrescriptionDetailsDrawerComponent extends React.Component<Props, any> {

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
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (text, record: any) => formatPrice(record.medicine.price * record.quantity, "VND"),
      width: 100
    },
  ];

  prescriptionApi = new PrescriptionServices();

  state = {
    listPrescriptionDetails: []
  };

  componentDidMount() {
    this.getListPresciptionDetails();
  }

  getListPresciptionDetails = () => {
    const { prescritionDetails } = this.props;
    let prescriptionId = get(prescritionDetails, "id") || 0;
    this.setState({ isLoading: true }, () => {
      this.prescriptionApi.getListPrescriptionDetails(prescriptionId).toPromise().then((data: any) => {
        this.setState({ isLoading: false });
        if (data && data.hasErrors) {
          toastr.error(ERROR, data.Errors[0].message);
        } else {
          this.setState({ listPrescriptionDetails: data.result });
        }
      });
    });
  }

  onClose = () => {
    this.props.closeModal();
  }

  renderPatientInfo = () => {
    const { prescritionDetails } = this.props;
    return (
      <>
        <div className="cardTitle">Thông tin bệnh nhân</div>
        <div className="row">
          <div className="col-md-6">
            <h6 className="textInfo">Họ tên : {get(prescritionDetails, "patient.fullName")}</h6>
          </div>
          <div className="col-md-6">
            <h6 className="textInfo">Ngày khám: {dateFormat(prescritionDetails.createdAt)}</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h6 className="textInfo">Ngày sinh : {dateFormat(get(prescritionDetails, "patient.dateOfBirth"))}</h6>
          </div>
          <div className="col-md-6">
            <h6 className="textInfo">Giới tính : {get(prescritionDetails, "patient.sex")}</h6>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h6 className="textInfo">Địa chỉ: {get(prescritionDetails, "patient.address")}</h6>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h6 className="textInfo">Lời dặn của bác sĩ: {prescritionDetails.userId}</h6>
          </div>
        </div>
      </>
    );
  }

  renderTablePrescriptionDetails = () => {
    const { listPrescriptionDetails } = this.state;

    return (
      <>
        <div className="cardTitle mt-30">Danh sách thuốc</div>
        <Table
          className="mb-30 mt-20 tableCaseRecord"
          columns={this.columns}
          dataSource={listPrescriptionDetails}
          rowKey="index"
          pagination={false}
          scroll={{ x: "max-content" }}
        />
        <h5>Tổng Tiền:  {formatPrice(Total(listPrescriptionDetails), "VND")}</h5>
      </>
    );

  }

  render() {
    const { isOpenModal, saveAction, prescritionDetails } = this.props;

    return (
      <div>
        <Drawer
          title="Chi tiết đơn thuốc của bệnh nhân"
          width={720}
          onClose={this.onClose}
          visible={isOpenModal}
          className="dramwerForm"
          destroyOnClose
        >
          {this.renderPatientInfo()}
          {this.renderTablePrescriptionDetails()}
          <div
            className="formFooter"
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Đóng
            </Button>
            {prescritionDetails.statusPay === 0 && (
              <Button type="primary" onClick={saveAction}>
                Nhận thuốc
              </Button>
            )}

          </div>
        </Drawer>
      </div>
    );
  }
}

const PrescriptionDetails = Form.create()(PrescriptionDetailsDrawerComponent);
export default PrescriptionDetails;