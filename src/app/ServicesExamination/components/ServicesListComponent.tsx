import React from "react";
import { Table, Divider } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnProps } from "antd/lib/table";

import { formatPrice } from "../../../lib/numberFormatter";

import { PaginationState } from "../../../common/models/Pagination";
import { SortModel } from "../../../common/models/SearchBaseModel";

import * as actionCreators from "../ServicesAction";
import DeleteModalComponent from "../../../common/components/DeleteModalComponent";

type Props = {
  services?: any[];
  pagination: PaginationState;
  handleTableChange?: any;
  onSearch?: any;
  sort?: SortModel;
  actions: typeof actionCreators;
  isLoading?: boolean;
  isOpenModalDelete: boolean;
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
    actions.deleteServices(this.state.selected.id);
  }

  closeModal = object => {
    this.props.actions.openCloseModel(object);
  }

  render() {
    const { services, pagination, handleTableChange, isLoading, isOpenModalDelete } = this.props;
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
          message={"Bạn có chắc chắn muốn xoá dịch vụ này?"}
        ></DeleteModalComponent>
      </div>
    );
  }
}
