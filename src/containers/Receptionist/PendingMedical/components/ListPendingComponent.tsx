import React from "react";
import { Table } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnProps } from "antd/lib/table";

import { PaginationState } from "../../../../common/models/Pagination";
import { SortModel } from "../../../../common/models/SearchBaseModel";

import * as actionCreators from "../PendingMedicalAction";
import { dateFormat } from "../../../../common/utils";

type Props = {
  pendingMedicals?: any[];
  pagination: PaginationState;
  handleTableChange?: any;
  onSearch?: any;
  sort?: SortModel;
  actions: typeof actionCreators;
  isLoading?: boolean;
  isOpenModalDelete: boolean;
};
export default class UserListComponent extends React.Component<Props, any> {
  columns: ColumnProps<any>[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: true,
      width: 100
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      render: (text, record: any) => dateFormat(record.createAt),
      key: "createAt",
      width: 150
    },
    {
      title: "STT",
      dataIndex: "ordinalNumber",
      key: "ordinalNumber",
      sorter: true,
      width: 100
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: "patientName",
      key: "patientName",
      sorter: true,
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
      title: "Tên phòng",
      dataIndex: "clinicName",
      key: "clinicNam",
      width: 200
    },
    {
      title: "Người lập phiếu",
      dataIndex: "createBy",
      key: "createBy",
      width: 200
    }
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      selected: {}
    };
  }

  render() {
    const { pendingMedicals, pagination, handleTableChange } = this.props;
    return (
      <div className="mb-30 col">
        <div className="card-statistics h-100 card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3 col-md-3">
                <h5 className="mb-30">
                  <b>Danh sách chờ khám</b>
                </h5>
              </div>
              <div className="col-md-6">
                <Search
                  placeholder="Search..."
                  className="txtSearch input-search"
                  onSearch={this.props.onSearch}
                />
              </div>
            </div>
            <div className="row box-content">
              <Table
                className="mb-30 col"
                columns={this.columns}
                dataSource={pendingMedicals}
                pagination={pagination}
                onChange={handleTableChange}
                rowKey="id"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
