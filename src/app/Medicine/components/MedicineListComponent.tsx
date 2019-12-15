import React from "react";
import { Table, Divider } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnProps } from "antd/lib/table";

import { formatPrice } from "../../../lib/numberFormatter";
import { dateFormat } from "../../../common/utils";

import { PaginationState } from "../../../common/models/Pagination";
import { SortModel } from "../../../common/models/SearchBaseModel";

import * as actionCreators from "../MedicineAction";
import DeleteModalComponent from "../../../common/components/DeleteModalComponent";

type Props = {
  medicines?: any[];
  pagination: PaginationState;
  handleTableChange?: any;
  onSearch?: any;
  sort?: SortModel;
  actions: typeof actionCreators;
  isLoading?: boolean;
  isOpenModalDelete: boolean;
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
    },
    {
      title: "",
      className: "text-center",
      width: 30,
      render: (text, record) => (
        <div key={text} className="dropleft">
          <a id="dropdownMenuButton" data-toggle="dropdown" >
            <i className="fa fa-ellipsis-v"></i>
          </a>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item">Sửa</a>
            <Divider type="horizontal" />
            <a className="dropdown-item" onClick={() => { this.showModalDelete(record); }}>Xoá</a>
          </div>
        </div>
      ),
    }

  ];

  constructor(props: any) {
    super(props);
    this.state = {
      selected: {}
    };
  }

  showModalDelete = (record) => {
    const { actions } = this.props;
    this.setState({ selected: record });
    actions.openCloseModel({ isOpenModalDelete: true });
  }

  deleteUser = () => {
    const { actions } = this.props;
    actions.deleteMedicine(this.state.selected.id);
  }

  closeModal = object => {
    const { actions } = this.props;
    actions.openCloseModel(object);
  }

  render() {
    const { medicines, pagination, handleTableChange, isLoading, isOpenModalDelete } = this.props;
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
                rowKey="id"
              />
            </div>
          </div>
        </div>

        <DeleteModalComponent
          delete={this.deleteUser}
          isLoading={isLoading}
          isOpenModalDelete={isOpenModalDelete}
          closeModal={this.closeModal}
          message={"Bạn có chắc chắn muốn xoá loại thuốc này?"}
        ></DeleteModalComponent>
      </div>
    );
  }
}
