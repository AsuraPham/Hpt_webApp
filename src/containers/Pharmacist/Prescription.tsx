import React from "react";
import Search from "antd/lib/input/Search";
import { Table, Spin, Button, Badge } from "antd";
import { dateFormat } from "../../common/utils";
import { PAGE_SIZE, ACCOUNT_INFO } from "../../common/Constants";
import { ColumnProps } from "antd/lib/table";
import { GetPagination } from "../../common/models/Pagination";
import PrescriptionDetailsDrawerComponent from "./PrescriptionDetails";
import get from "lodash/get";

import PrescriptionServices from "./PrescriptionServices";

export default class PharmacistPrescription extends React.Component<any, any> {

  columns: ColumnProps<any>[] = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 60
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: "patient.fullName",
      key: "patient.fullName",
      width: 150
    },
    {
      title: "Giới tính",
      dataIndex: "patient.sex",
      key: "patient.sex",
      width: 100
    },
    {
      title: "Ngày sinh",
      dataIndex: "patient.dateOfBirth",
      render: (text, record: any) => dateFormat(record.patient.dateOfBirth),
      key: "patient.dateOfBirth",
      width: 120
    },
    {
      title: "Địa chỉ",
      dataIndex: "patient.address",
      key: "patient.address",
      width: 150
    },
    {
      title: "Ngày khám",
      dataIndex: "createdAt",
      render: (text, record: any) => dateFormat(record.createdAt),
      key: "createdAt",
      width: 120
    },
    {
      title: "Trạng Thái",
      dataIndex: "statusPay",
      key: "statusPay",
      width: 200,
      render: (text, record) => (
        this.renderStatusBadge(record)
      ),
    },
    {
      title: "",
      width: 100,
      render: (text, record) => (
        <a onClick={() => { this.showModalDetails(record); }} style={{ color: "blue" }}>Chi tiết</a>
      ),
    }
  ];

  prescriptionApi = new PrescriptionServices();

  state = {
    listPrescription: [],
    accountInfo: JSON.parse(localStorage.getItem(ACCOUNT_INFO) || "{}") || {},
    pagination: {
      current: 1,
      pageSize: PAGE_SIZE,
      total: 0
    },
    searchRequest: {
      pageIndex: 1,
      pageSize: PAGE_SIZE,
      keyword: ""
    },
    isLoading: true,
    isOpenDetailsModal: false,
    prescritionSelected: {}
  };

  componentDidMount() {
    this.onSearch("");
    setInterval(() => {
      this.onSearch("");
      // tslint:disable-next-line:align  10p call api 1 lan
    }, 600000);
  }

  showModalDetails = (record) => {
    this.setState({ prescritionSelected: record, isOpenDetailsModal: true });
  }

  closeModalDetails = () => {
    this.setState({ isOpenDetailsModal: false });
  }

  onSearch = e => {
    const { searchRequest } = this.state;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    this.getListPrescription(request);
  }

  tableChange = (pagination, { }) => {
    const { searchRequest } = this.state;
    const pageIndex = pagination.current;
    let request = {
      ...searchRequest,
      pageIndex: pageIndex
    };
    this.getListPrescription(request);
  }

  getListPrescription = (request) => {
    this.prescriptionApi.getListPrescription(request).toPromise().then((data: any) => {
      this.setState({ listPrescription: data.result, pagination: GetPagination(data.meta), isLoading: false });
    });
  }

  renderListPrescription = () => {
    const { listPrescription, pagination } = this.state;
    return (
      <div className="mb-30 col">
        <div className="card-statistics h-100 card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <h5 className="mb-30">
                  <b>Danh sách cấp thuốc</b>
                </h5>
              </div>
              <div className="col-md-6">
                <Search
                  placeholder="Search..."
                  className="txtSearch input-search"
                  onSearch={this.onSearch}
                />
              </div>
            </div>
            <div className="row box-content">
              <Table
                className="mb-30 col"
                columns={this.columns}
                dataSource={listPrescription}
                pagination={pagination}
                onChange={this.tableChange}
                rowKey="index"
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderStatusBadge = (record) => {
    if (record.statusPay === 0) {
      return <span style={{ color: "orange" }}>Chưa thanh toán / Nhận thuốc </span>;
    }
    return <span style={{ color: "green" }}>Đã thanh toán / Nhận thuốc </span>;
  }

  changeStatusPrescription = () => {
    const { prescritionSelected } = this.state;
    let request = {
      statusPay: 1,
      id: get(prescritionSelected, "id")
    };

    this.prescriptionApi.changeStatusPrescription(request).toPromise().then((data: any) => {
      this.onSearch("");
      this.setState({ isOpenDetailsModal: false });
    });
  }

  render() {
    const { isLoading, isOpenDetailsModal, prescritionSelected } = this.state;
    return (
      <>
        <Spin size="large" spinning={isLoading}>
          <div className="row">
            {this.renderListPrescription()}
          </div>
        </Spin>

        {isOpenDetailsModal && (
          <PrescriptionDetailsDrawerComponent
            isOpenModal={isOpenDetailsModal}
            saveAction={this.changeStatusPrescription}
            closeModal={this.closeModalDetails}
            prescritionDetails={prescritionSelected}
          />
        )}
      </>
    );
  }
}