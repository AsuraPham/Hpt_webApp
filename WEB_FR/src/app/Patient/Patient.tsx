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

interface Props extends PatientState {
  isOpenModal: boolean;
  actions: typeof actionCreators;
  isLoading: boolean;
  history?: any;
}

class Patient extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    this.onSearch("");
  }

  showModal = () => {
    const { actions } = this.props;
    actions.openCloseModel({ isOpenModal: true });
  };

  closeModal = object => {
    const { actions } = this.props;
    actions.openCloseModel({ isOpenModal: false });
  };

  createPatient = value => {
    const { actions } = this.props;
    actions.createPatient(value);
  };

  onSearch = e => {
    const { searchRequest, actions } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    actions.getPatientList(request);
  };

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
  };

  render() {
    const {
      pagination,
      patients,
      isLoading,
      actions,
      isOpenModal
    } = this.props;
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
