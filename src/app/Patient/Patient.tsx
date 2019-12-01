import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";

import { State } from "../../root";
import { iconAdd } from "../../common/const/image-const";
import * as actionCreators from "./PatientAction";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

import PatientListComponent from "./components/PatientListComponent";
import { PatientState } from "./models/PatientState";
import CreatePatientModalComponent from "./components/CreatePatientModalComponent";

import PatientApi from "./PatientService";

interface Props extends PatientState {
  isOpenModal: boolean;
  actions: typeof actionCreators;
  isLoading: boolean;
  history?: any;
  isOpenModalDelete: boolean;
  isLoadingEdit: boolean;
  isOpenModalEdit: boolean;
}

type StatePatient = typeof initialState;

const initialState = {
  visible: false,
  listClinic: [],
  listCandidate: []
};

class Patient extends React.Component<Props, StatePatient> {
  constructor(props: any) {
    super(props);
  }

  state = initialState;

  componentDidMount() {
    this.onSearch("");
    this.getListClinic();
    this.getListCandidate();
  }

  patientApi = new PatientApi();

  getListClinic = () => {
    this.patientApi.getListClinic()
      .toPromise()
      .then((data: any) => {
        this.setState({ listClinic: data.result });
      });
  }

  getListCandidate = () => {
    this.patientApi.getListCandidate().toPromise().then((data: any) => {
      this.setState({ listCandidate: data.result });
    });
  }

  showModal = () => {
    const { actions } = this.props;
    actions.openCloseModel({ isOpenModal: true });
  }

  closeModal = object => {
    const { actions } = this.props;
    actions.openCloseModel({ isOpenModal: false });
  }

  createPatient = value => {
    const { actions } = this.props;
    actions.createPatient(value);
  }

  onSearch = e => {
    const { searchRequest, actions } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    actions.getPatientList(request);
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
    actions.getPatientList(request);
  }

  render() {
    const {
      pagination,
      patients,
      isLoading,
      actions,
      isOpenModal,
      isOpenModalDelete,
      isLoadingEdit,
      isOpenModalEdit
    } = this.props;
    const { listClinic, listCandidate } = this.state;
    return (
      <div>
        <div className="page-title">
          <div className="row">
            <div className="col-sm-6">
              <h3 className="mb-0 title-page">Bệnh nhân</h3>
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
            <CreatePatientModalComponent
              isLoading={isLoading}
              isOpenModal={isOpenModal}
              closeModal={this.closeModal}
              saveAction={this.createPatient}
              listCandidate={listCandidate}
            ></CreatePatientModalComponent>
          </div>
        </div>
        <Spin size="large" spinning={isLoading}>
          <div className="row">
            <PatientListComponent
              pagination={pagination}
              actions={actions}
              handleTableChange={this.tableChange}
              onSearch={this.onSearch}
              patients={patients}
              isLoading={isLoading}
              isOpenModalDelete={isOpenModalDelete}
              listClinic={listClinic}
              isLoadingEdit={isLoadingEdit}
              isOpenModalEdit={isOpenModalEdit}
              listCandidate={listCandidate}
            />
          </div>
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = (state: State) => ({
  ...state.patientState
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators<any>(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Patient);
