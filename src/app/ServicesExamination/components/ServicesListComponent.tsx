import React from "react";
import { Table } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnProps } from "antd/lib/table";

import { formatPrice } from "../../../lib/numberFormatter";

import { PaginationState } from "../../../common/models/Pagination";
import { SortModel } from "../../../common/models/SearchBaseModel";

import * as actionCreators from "../ServicesAction";

type Props = {
  services?: any[];
  pagination: PaginationState;
  handleTableChange?: any;
  onSearch?: any;
  sort?: SortModel;
  actions: typeof actionCreators;
  isLoading?: boolean;
};
export default class ServicesListComponent extends React.Component<Props, any> {
  columns: ColumnProps<any>[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: true,
      width: 150
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
      sorter: true,
      width: 300
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      sorter: true,
      render: (text, record: any) => formatPrice(record.price, "VND"),
      width: 200
    },
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
    const { services, pagination, handleTableChange } = this.props;
    return (
      <div className="mb-30 col">
        <div className="card-statistics h-100 card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3 col-md-3">
                <h5 className="mb-30">
                  <b>Danh sách dịch vụ</b>
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
                dataSource={services}
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
