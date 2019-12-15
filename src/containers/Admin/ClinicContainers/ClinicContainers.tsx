import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";

import { State } from "../../../root";
import { iconAdd } from "../../../common/const/image-const";
import * as actionCreators from "./ClinicAction";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

import CreateClinicModalComponent from "./components/CreateClinicModalComponent";
import ClinicListComponent from "./components/ClinicListComponent";
import { ClinicState } from "./models/ClinicState";

import ClinicApi from "./ClinicService";

interface Props extends ClinicState {
  isOpenModal: boolean;
  actions: typeof actionCreators;
  isLoading?: boolean;
  history?: any;
  isOpenModalDelete: boolean;
}

type StateClinic = typeof initialState;

const initialState = {
  visible: false,
  listDepartment: [],
  listKindOfRoom: []
};

class ClinicContainer extends React.Component<Props, StateClinic> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.onSearch("");
    this.getListDepartment();
    this.getListKindOfRoom();
  }

  state = initialState;

  clinicApi = new ClinicApi();

  getListDepartment = () => {
    this.clinicApi.getListDepartment()
      .toPromise()
      .then((data: any) => {
        this.setState({ listDepartment: data.result });
      });
  }

  getListKindOfRoom = () => {
    this.clinicApi.getListKindOfRoom()
      .toPromise()
      .then((data: any) => {
        this.setState({ listKindOfRoom: data.result });
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

  createClinic = value => {
    const { actions } = this.props;
    actions.createClinic(value);
  }

  onSearch = e => {
    const { searchRequest, actions } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    actions.getClinicList(request);
  }

  tableChange = (pagination, { }, sorter) => {
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
    actions.getClinicList(request);
  }

  render() {
    const {
      isOpenModal,
      pagination,
      clinics,
      isLoading,
      actions,
      isOpenModalDelete
    } = this.props;
    const { listDepartment, listKindOfRoom } = this.state;

    return (
      <div>
        <div className="page-title">
          <div className="row">
            <div className="col-sm-6">
            </div>
            <div className="col-sm-6">
              <nav className="float-left float-sm-right">
                <button
                  type="button"
                  className="btn btn-pri mr-12 mb-10"
                  onClick={this.showModal}
                >
                  <img src={iconAdd} className="add mr-6" />
                  Thêm mới phòng
                </button>
              </nav>
            </div>
            <CreateClinicModalComponent
              isLoading={isLoading}
              isOpenModal={isOpenModal}
              closeModal={this.closeModal}
              saveAction={this.createClinic}
              listDepartment={listDepartment}
              listKindOfRoom={listKindOfRoom}
            ></CreateClinicModalComponent>
          </div>
        </div>
        <Spin size="large" spinning={isLoading}>
          <div className="row">
            <ClinicListComponent
              pagination={pagination}
              actions={actions}
              handleTableChange={this.tableChange}
              onSearch={this.onSearch}
              clinics={clinics}
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
  ...state.clinicState
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators<any>(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClinicContainer);
