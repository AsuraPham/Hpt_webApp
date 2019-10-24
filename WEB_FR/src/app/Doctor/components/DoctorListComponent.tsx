import React from "react";
import { Table } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnProps } from "antd/lib/table";

import { dateFormat } from "../../../common/utils";

import { PaginationState } from "../../../common/models/Pagination";
import { SortModel } from "../../../common/models/SearchBaseModel";

import * as actionCreators from "../DoctorAction";

type Props = {
  doctors?: any[];
  pagination: PaginationState;
  handleTableChange?: any;
  onSearch?: any;
  sort?: SortModel;
  actions: typeof actionCreators;
  isLoading?: boolean;
};
export default class DoctorListComponent extends React.Component<Props, any> {
  columns: ColumnProps<any>[] = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
      key: "id",
      width: 100
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
      width: 300
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
      width: 100
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      render: (text, record: any) => dateFormat(record.dateOfBirth),
      key: "dateOfBirth",
      width: 200
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 300
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200
    },
    {
      title: "Số ĐT",
      dataIndex: "phone",
      key: "phone",
      width: 200
    },
    {
      title: "Trình độ",
      dataIndex: "education",
      key: "education",
      width: 200
    },
    {
      title: "Khoa",
      dataIndex: "departmentName",
      key: "departmentName",
      width: 200
    }
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      selected: {}
    };
  }

  closeModal = object => {
    this.props.actions.openCloseModel(object);
  };

  render() {
    const { doctors, pagination, handleTableChange } = this.props;
    return (
      <div className="mb-30 col">
        <div className="card-statistics h-100 card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3 col-md-3">
                <h5 className="mb-30">
                  <b>Danh sách bác sĩ</b>
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
                dataSource={doctors}
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
