import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";

import { State } from "../../root";
import { iconAdd } from "../../common/const/image-const";
import * as actionCreators from "./DepartmentAction";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

import CreateDepartmentModalComponent from "./components/CreateDepartmentModalComponent";
import DepartmentListComponent from "./components/DepartmentListComponent";
import { DepartmentState } from "./models/DepartmentState";

interface Props extends DepartmentState {
  isOpenModal: boolean;
  actions: typeof actionCreators;
  isLoading?: boolean;
  history?: any;
}

class Department extends React.Component<Props, any> {
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

  closeModal = () => {
    const { actions } = this.props;
    actions.openCloseModel({ isOpenModal: false });
  };

  createDepartment = value => {
    const { actions } = this.props;
    actions.createDepartment(value);
  };

  onSearch = e => {
    const { searchRequest, actions } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    actions.getDepartmentList(request);
  };

  tableChange = (pagination, {}, sorter) => {
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
    actions.getDepartmentList(request);
  };

  render() {
    const {
      isOpenModal,
      pagination,
      departments,
      isLoading,
      actions
    } = this.props;
    return (
      <div>
        <div className="page-title">
          <div className="row">
            <div className="col-sm-6">
              <h3 className="mb-0 title-page">Khoa khám</h3>
            </div>
            <div className="col-sm-6">
              <nav className="float-left float-sm-right">
                <button
                  type="button"
                  className="btn btn-pri mr-12 mb-10"
                  onClick={this.showModal}
                >
                  <img src={iconAdd} className="add mr-6" />
                  Thêm mới khoa
                </button>
              </nav>
            </div>
            <CreateDepartmentModalComponent
              isLoading={isLoading}
              isOpenModal={isOpenModal}
              closeModal={this.closeModal}
              saveAction={this.createDepartment}
            ></CreateDepartmentModalComponent>
          </div>
        </div>
        <Spin size="large" spinning={isLoading}>
          <div className="row">
            <DepartmentListComponent
              pagination={pagination}
              actions={actions}
              handleTableChange={this.tableChange}
              onSearch={this.onSearch}
              departments={departments}
              isLoading={isLoading}
            />
          </div>
          {/* <div className="row">
            <CreateDepartmentModalComponent
              isLoading={isLoading}
              saveAction={this.createDepartment}
              isOpenModal={isOpenModal}
              closeModal={this.closeModal}
            />
          </div> */}
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = (state: State) => ({
  ...state.departmentState
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators<any>(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Department);
