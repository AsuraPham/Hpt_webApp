import React from "react";
import { Table } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnProps } from "antd/lib/table";

import { formatPrice } from "../../../lib/numberFormatter";
import { dateFormat } from "../../../common/utils";

import { PaginationState } from "../../../common/models/Pagination";
import { SortModel } from "../../../common/models/SearchBaseModel";

import * as actionCreators from "../MedicineAction";

type Props = {
  medicines?: any[];
  pagination: PaginationState;
  handleTableChange?: any;
  onSearch?: any;
  sort?: SortModel;
  actions: typeof actionCreators;
  isLoading?: boolean;
};
export default class MedicineistComponent extends React.Component<Props, any> {
  columns: ColumnProps<any>[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: true,
      width: 100
    },
    {
      title: "Tên thuốc",
      dataIndex: "name",
      key: "name",
      sorter: true,
      width: 300
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      sorter: true,
      render: (text, record: any) => formatPrice(record.price, "VND"),
      width: 150
    },
    {
      title: "Ngày nhập",
      dataIndex: "importDate",
      render: (text, record: any) => dateFormat(record.importDate),
      key: "importDate",
      width: 150
    },
    {
      title: "Ngày sản xuất",
      dataIndex: "dateOfManufacture",
      render: (text, record: any) => dateFormat(record.dateOfManufacture),
      key: "dateOfManufacture",
      width: 150
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expirationDate",
      render: (text, record: any) => dateFormat(record.expirationDate),
      key: "expirationDate",
      width: 150
    },
    {
      title: "Xuất xứ",
      dataIndex: "origin",
      key: "origin",
      width: 150
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      width: 150
    },
    {
      title: "Số lượng",
      dataIndex: "quantityExists",
      key: "quantityExists",
      width: 150
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
    const { medicines, pagination, handleTableChange } = this.props;
    return (
      <div className="mb-30 col">
        <div className="card-statistics h-100 card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3 col-md-3">
                <h5 className="mb-30">
                  <b>Danh sách thuốc</b>
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
                dataSource={medicines}
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
