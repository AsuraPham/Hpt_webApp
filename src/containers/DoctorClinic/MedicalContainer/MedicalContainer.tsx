import React from "react";
import { dateFormat } from "../../../common/utils";
import Table, { ColumnProps } from "antd/lib/table";
import Search from "antd/lib/input/Search";

import MedicalServices from "./MedicalServices";
import { GetPagination } from "../../../common/models/Pagination";
import { ACCOUNT_INFO, PAGE_SIZE } from "../../../common/Constants";
import { Spin, Button } from "antd";

interface Props {
  onAdd?: any;
}
export default class MedicalContainer extends React.Component<Props, any> {

  columns: ColumnProps<any>[] = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 100
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: "patientName",
      key: "patientName",
      width: 200
    },
    {
      title: "Giới tính",
      dataIndex: "patientSex",
      key: "patientSex",
      width: 100
    },
    {
      title: "Ngày sinh",
      dataIndex: "patientDateOfBirth",
      render: (text, record: any) => dateFormat(record.patientDateOfBirth),
      key: "patientDateOfBirth",
      width: 200
    },
    {
      title: "Địa chỉ",
      dataIndex: "patientAddress",
      key: "patientAddress",
      width: 200
    },
    {
      title: "Ngày khám",
      dataIndex: "createAt",
      render: (text, record: any) => dateFormat(record.createAt),
      key: "createAt",
      width: 150
    },
    {
      title: "Người lập phiếu",
      dataIndex: "createBy",
      key: "createBy",
      width: 200
    },
    {
      title: "",
      width: 50,
      render: (text, record) => this.renderButton(text, record),
    }
  ];

  pendingMedicalApi = new MedicalServices();

  state = {
    pendingMedicals: [],
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
    isLoading: true
  };

  componentDidMount() {
    this.onSearch("");
    setInterval(() => {
      this.onSearch("");
      // tslint:disable-next-line:align  10p call api 1 lan
    }, 600000);
  }

  addRecord = (record) => {
    const { onAdd } = this.props;
    onAdd(record);
  }

  onSearch = e => {
    const { searchRequest } = this.state;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    this.getListPendingMedical(request);
  }

  tableChange = (pagination, { }) => {
    const { searchRequest } = this.state;
    const pageIndex = pagination.current;
    let request = {
      ...searchRequest,
      pageIndex: pageIndex
    };
    this.getListPendingMedical(request);
  }

  getListPendingMedical = (request) => {
    const { accountInfo } = this.state;
    this.pendingMedicalApi.getListPendingByClinicId(request, accountInfo.clinicId).toPromise().then((data: any) => {
      this.setState({ pendingMedicals: data.result, pagination: GetPagination(data.meta), isLoading: false });
    });
  }

  renderButton = (text, record) => {
    if (record.status === 0) {
      return (
        <Button key={text} style={{ width: "unset" }}
          type="primary" onClick={() => { this.addRecord(record); }}>Khám</Button>
      );
    }
    if (record.status === 1) {
      return (
        <Button key={text} style={{ width: "unset" }}
          type="danger" onClick={() => { this.addRecord(record); }}>Đang khám</Button>
      );
    }
    return (
      <Button key={text} style={{ width: "unset" }} onClick={() => { this.addRecord(record); }}>Đã khám</Button>
    );
  }

  renderListPendingMedical = () => {
    const { pendingMedicals, pagination, accountInfo } = this.state;
    return (
      <div className="mb-30 col">
        <div className="card-statistics h-100 card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <h5 className="mb-30">
                  <b>Danh sách khám {accountInfo.clinicName}</b>
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
                dataSource={pendingMedicals}
                pagination={pagination}
                onChange={this.tableChange}
                rowKey="id"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <Spin size="large" spinning={isLoading}>
          <div className="row">
            {this.renderListPendingMedical()}
          </div>
        </Spin>
      </>
    );
  }
}