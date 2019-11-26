import React from "react";
import { Table, Divider } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnProps } from "antd/lib/table";

import { PaginationState } from "../../../../common/models/Pagination";
import { SortModel } from "../../../../common/models/SearchBaseModel";

import * as actionCreators from "../KindOfRoomAction";
import DeleteModalComponent from "../../../../common/components/DeleteModalComponent";

type Props = {
  kindOfRooms?: any[];
  pagination: PaginationState;
  handleTableChange?: any;
  onSearch?: any;
  sort?: SortModel;
  actions: typeof actionCreators;
  isLoading?: boolean;
  isOpenModalDelete: boolean;
};
export default class KindOfRoomListComponent extends React.Component<Props, any> {
  columns: ColumnProps<any>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Tên loại phòng",
      dataIndex: "nameKindOfRoom",
      key: "nameKindOfRoom"
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

  deleteKindOfRoom = () => {
    const { actions } = this.props;
    const { selected } = this.state;
    actions.deleteKindOfRoom(selected.id);
  }

  closeModal = object => {
    const { actions } = this.props;
    actions.openCloseModel(object);
  }

  render() {
    const { kindOfRooms, pagination, handleTableChange, isLoading, isOpenModalDelete } = this.props;
    return (
      <div className="mb-30 col">
        <div className="card-statistics h-100 card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3 col-md-3">
                <h5 className="mb-30">
                  <b>Danh sách loại phòng</b>
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
                dataSource={kindOfRooms}
                pagination={pagination}
                onChange={handleTableChange}
                rowKey="id"
              />
            </div>
          </div>
        </div>

        <DeleteModalComponent
          delete={this.deleteKindOfRoom}
          isLoading={isLoading}
          isOpenModalDelete={isOpenModalDelete}
          closeModal={this.closeModal}
          message={"Bạn có chắc chắn muốn xoá loại phòng này?"}
        ></DeleteModalComponent>
      </div>
    );
  }
}
