import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";

import { State } from "../../root";
import { iconAdd } from "../../common/const/image-const";
import * as actionCreators from "./DoctorAction";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

import DoctorListComponent from "./components/DoctorListComponent";
import { DoctorState } from "./models/DoctorState";
import CreateDoctorModal from "./components/CreateDoctorModalComponent";

import DoctorApi from "./DoctorService";

interface Props extends DoctorState {
  isOpenModal: boolean;
  actions: typeof actionCreators;
  isLoading: boolean;
  history?: any;
  isOpenModalDelete: boolean;
}

type StateDoctor = typeof initialState;

const initialState = {
  visible: false,
  listDepartment: []
};

class Doctor extends React.Component<Props, StateDoctor> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.onSearch("");
    this.getListDepartment();
  }

  state = initialState;

  DoctorApi = new DoctorApi();

  getListDepartment = () => {
    this.DoctorApi.getListDepartment()
      .toPromise()
      .then((data: any) => {
        this.setState({ listDepartment: data.result });
      });
  }

  showModal = () => {
    const { actions } = this.props;
    actions.openCloseModel({ isOpenModal: true });
  }

  closeModal = () => {
    const { actions } = this.props;
    actions.openCloseModel({ isOpenModal: false });
  }

  createDoctor = value => {
    const { actions } = this.props;
    actions.createDoctor(value);
  }

  onSearch = e => {
    const { searchRequest, actions } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    actions.getDoctorList(request);
  }

  tableChange = (pagination, filters, sorter) => {
    let searchRequest: SearchBaseModel = this.props.searchRequest || {};
    const pageIndex = pagination.current;
    const { actions } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: pageIndex
    };
    if (sorter.field) {
      request = {
        ...request,
        sort: {
          column: sorter.field,
          type: sorter.order
        }
      };
    }
    actions.getDoctorList(request);
  }

  render() {
    const { pagination, doctors, isLoading, actions, isOpenModal, isOpenModalDelete } = this.props;
    const { listDepartment } = this.state;
    return (
      <div>
        <div className="page-title">
          <div className="row">
            <div className="col-sm-6">
              <h3 className="mb-0 title-page">Bác sĩ</h3>
            </div>
            <div className="col-sm-6">
              <nav className="float-left float-sm-right">
                <button
                  type="button"
                  className="btn btn-pri mr-12 mb-10"
                  onClick={this.showModal}
                >
                  <img src={iconAdd} className="add mr-6" />
                  Thêm mới
                </button>
              </nav>
            </div>
            <CreateDoctorModal
              isLoading={isLoading}
              isOpenModal={isOpenModal}
              closeModal={this.closeModal}
              saveAction={this.createDoctor}
              listDepartment={listDepartment}
            ></CreateDoctorModal>
          </div>
        </div>
        <Spin size="large" spinning={isLoading}>
          <div className="row">
            <DoctorListComponent
              pagination={pagination}
              actions={actions}
              handleTableChange={this.tableChange}
              onSearch={this.onSearch}
              doctors={doctors}
              isLoading={isLoading}
              isOpenModalDelete={isOpenModalDelete}
            />
          </div>
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = (state: State) => ({
  ...state.doctorState
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators<any>(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Doctor);
