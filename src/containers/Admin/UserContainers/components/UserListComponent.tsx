import React from "react";
import { Table, Divider } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnProps } from "antd/lib/table";

import { PaginationState } from "../../../../common/models/Pagination";
import { SortModel } from "../../../../common/models/SearchBaseModel";

import * as actionCreators from "../UserAction";
import DeleteModalComponent from "../../../../common/components/DeleteModalComponent";
import { dateFormat } from "../../../../common/utils";

type Props = {
  users?: any[];
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
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
      width: 200
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
      width: 100
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateDateOfBirth",
      render: (text, record: any) => dateFormat(record.dateDateOfBirth),
      key: "dateDateOfBirth",
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
      width: 150
    },
    {
      title: "Vị trí",
      dataIndex: "position",
      key: "position",
      width: 200
    },
    {
      title: "Tên phòng",
      dataIndex: "clinicName",
      key: "clinicNam",
      width: 200
    },
    {
      title: "Tên quyền",
      dataIndex: "roleName",
      key: "roleName",
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
    const { selected } = this.state;
    actions.deleteUser(selected.id);
  }

  closeModal = object => {
    const { actions } = this.props;
    actions.openCloseModel(object);
  }

  render() {
    const { users, pagination, handleTableChange, isLoading, isOpenModalDelete } = this.props;
    return (
      <div className="mb-30 col">
        <div className="card-statistics h-100 card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3 col-md-3">
                <h5 className="mb-30">
                  <b>Danh sách người dùng</b>
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
                dataSource={users}
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
          message={"Bạn có chắc chắn muốn xoá người dùng này?"}
        ></DeleteModalComponent>
      </div>
    );
  }
}
