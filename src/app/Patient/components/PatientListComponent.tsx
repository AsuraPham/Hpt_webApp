import React from "react";
import { Table, Divider } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnProps } from "antd/lib/table";

import { dateFormat } from "../../../common/utils";
import { toastr } from "react-redux-toastr";

import { PaginationState } from "../../../common/models/Pagination";
import { SortModel } from "../../../common/models/SearchBaseModel";

import * as actionCreators from "../PatientAction";
import DeleteModalComponent from "../../../common/components/DeleteModalComponent";
import CreatePendingMedicalDrawer from "./CreatePendingMedical";

import PatientApi from "../PatientService";
import { ACCOUNT_INFO } from "../../../common/Constants";
import { ERROR, SUCCESS } from "../../../common/components/messages";
import EditPatientDrawer from "./EditPatientDrawerComponent";

type Props = {
  patients?: any[];
  pagination: PaginationState;
  handleTableChange?: any;
  onSearch?: any;
  sort?: SortModel;
  actions: typeof actionCreators;
  isLoading?: boolean;
  isOpenModalDelete: boolean;
  listClinic: any[];
  isOpenModalEdit: boolean;
  isLoadingEdit?: boolean;
  listCandidate: any[];
};
export default class PatientListComponent extends React.Component<Props, any> {
  columns: ColumnProps<any>[] = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
      key: "id",
      width: 90
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
      width: 150
    },
    {
      title: "Chứng minh thư",
      dataIndex: "idCard",
      key: "idCard",
      width: 120
    },
    {
      title: "Dân tộc",
      dataIndex: "folk",
      key: "folk",
      width: 100
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
      width: 120
    },
    {
      title: "Mã BHYT",
      dataIndex: "codeHealthInsurance",
      key: "codeHealthInsurance",
      width: 180
    },
    {
      title: "Ngày cấp BHYT",
      dataIndex: "dateOfSupplyHealth",
      render: (text, record: any) => dateFormat(record.dateOfSupplyHealth),
      key: "dateOfSupplyHealth",
      width: 120
    },
    {
      title: "Ngày hết hạn BHYT",
      dataIndex: "expirationDateHealth",
      render: (text, record: any) => dateFormat(record.expirationDateHealth),
      key: "expirationDateHealth",
      width: 120
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 150
    },
    {
      title: "Nghề nghiệp",
      dataIndex: "profession",
      key: "profession",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 120
    },
    {
      title: "Số ĐT",
      dataIndex: "phone",
      key: "phone",
      width: 120
    },
    {
      title: "Nhóm máu",
      dataIndex: "bloodGroup",
      key: "bloodGroup",
      width: 100
    },
    {
      title: "Đối tượng",
      dataIndex: "candidateName",
      key: "candidateName",
      width: 150
    },
    {
      title: "",
      className: "text-center",
      width: 30,
      // fixed: "right",
      render: (text, record) => (
        <div key={text} className="dropleft">
          <a id="dropdownMenuButton" data-toggle="dropdown" >
            <i className="fa fa-ellipsis-v"></i>
          </a>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" onClick={() => { this.showModalEdit(record); }}>Sửa</a>
            <Divider type="horizontal" />
            <a className="dropdown-item" onClick={() => { this.showModalDelete(record); }}>Xoá</a>
            <Divider type="horizontal" />
            <a className="dropdown-item" onClick={() => { this.showModalPending(record); }}>Tiếp nhận</a>
          </div>
        </div>
      ),
    }
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      selected: {},
      isOpenCreatePending: false,
      isLoadingCreate: false,
      accountInfo: JSON.parse(localStorage.getItem(ACCOUNT_INFO) || "{}") || {}
    };
  }

  patientApi = new PatientApi();

  showModalDelete = (record) => {
    const { actions } = this.props;
    this.setState({ selected: record });
    actions.openCloseModel({ isOpenModalDelete: true });
  }

  showModalEdit = (record) => {
    const { actions } = this.props;
    this.setState({ selected: record });
    actions.openCloseModel({ isOpenModalEdit: true });
  }

  closeModalEdit = () => {
    const { actions } = this.props;
    actions.openCloseModel({ isOpenModalEdit: false });
  }

  showModalPending = (record) => {
    this.setState({ selected: record, isOpenCreatePending: true });
  }

  createPedingMedical = value => {
    const { selected, accountInfo } = this.state;
    const request = { ...value, patientId: selected.id, userId: accountInfo.id };
    this.setState({ isLoadingCreate: true }, () => {
      this.patientApi.createPendingMedical(request).toPromise().then((data: any
      ) => {
        if (data.response && data.response.hasErrors) {
          toastr.error(ERROR, "Tạo mới không thành công");
        } else {
          this.setState({ isOpenCreatePending: false, isLoadingCreate: false });
          toastr.success(SUCCESS, "Tạo mới thành công");
        }

      });
    });
  }
  closeModalCreatePeding = () => {
    this.setState({ isOpenCreatePending: false });
  }

  deleteUser = () => {
    const { actions } = this.props;
    const { selected } = this.state;
    actions.deletePatient(selected.id);
  }

  editPatient = value => {
    const { selected } = this.state;
    const request = { ...value, id: selected.id };
    const { actions } = this.props;
    actions.editPatient(request);
  }

  closeModal = object => {
    const { actions } = this.props;
    actions.openCloseModel(object);
  }

  render() {
    const { patients, pagination, handleTableChange, isOpenModalDelete, isLoading, listClinic, isOpenModalEdit, isLoadingEdit, listCandidate } = this.props;
    const { isOpenCreatePending, isLoadingCreate, selected } = this.state;
    return (
      <div className="mb-30 col">
        <div className="card-statistics h-100 card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3 col-md-3">
                <h5 className="mb-30">
                  <b>Danh sách bệnh nhân</b>
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
                dataSource={patients}
                pagination={pagination}
                onChange={handleTableChange}
                rowKey="id"
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </div>
        <DeleteModalComponent
          delete={this.deleteUser}
          isLoading={isLoading}
          isOpenModalDelete={isOpenModalDelete}
          closeModal={this.closeModal}
          message={"Bạn có chắc chắn muốn xoá bệnh nhân này khỏi danh sách?"}
        />
        {isOpenCreatePending && (
          <CreatePendingMedicalDrawer
            isOpenModal={isOpenCreatePending}
            isLoading={isLoadingCreate}
            saveAction={this.createPedingMedical}
            closeModal={this.closeModalCreatePeding}
            patientInfo={selected}
            listClinic={listClinic} />
        )}

        {isOpenModalEdit && (
          <EditPatientDrawer
            patientInfo={selected}
            isLoading={isLoadingEdit}
            saveAction={this.editPatient}
            isOpenModal={isOpenModalEdit}
            closeModal={this.closeModalEdit}
            listCandidate={listCandidate}
          />
        )}

      </div>
    );
  }
}
