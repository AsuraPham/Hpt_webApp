import React from "react";
import { Table } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnProps } from "antd/lib/table";

import { PaginationState } from "../../../common/models/Pagination";
import { SortModel } from "../../../common/models/SearchBaseModel";

import * as actionCreators from "../DepartmentAction";

type Props = {
  departments?: any[];
  pagination: PaginationState;
  handleTableChange?: any;
  onSearch?: any;
  sort?: SortModel;
  actions: typeof actionCreators;
  isLoading?: boolean;
};
export default class DeviceListComponent extends React.Component<Props, any> {
  columns: ColumnProps<any>[] = [
    {
      title: "Tên khoa",
      dataIndex: "name",
      key: "name",
      sorter: true,
      width: 150
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: status => {
        status === 1 ? (status = "Hoạt động") : (status = "Không hoạt động");
        return status;
      }
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
  }

  render() {
    const { departments, pagination, handleTableChange } = this.props;
    return (
      <div className="mb-30 col">
        <div className="card-statistics h-100 card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3 col-md-3">
                <h5 className="mb-30">
                  <b>Danh sách khoa</b>
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
                dataSource={departments}
                pagination={pagination}
                onChange={handleTableChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
