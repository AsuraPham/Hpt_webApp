import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";

import { State } from "../../root";
import { iconAdd } from "../../common/const/image-const";
import * as actionCreators from "./ServicesAction";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

import CreateServicesModalComponent from "./components/CreateServicesModalComponent";
import ServicesListComponent from "./components/ServicesListComponent";
import { ServicesState } from "./models/ServicesState";

interface Props extends ServicesState {
  isOpenModal: boolean;
  actions: typeof actionCreators;
  isLoading?: boolean;
  history?: any;
}

class Services extends React.Component<Props, any> {
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
  }

  closeModal = () => {
    const { actions } = this.props;
    actions.openCloseModel({ isOpenModal: false });
  }

  createServices = value => {
    const { actions } = this.props;
    actions.createServices(value);
  }

  onSearch = e => {
    const { searchRequest, actions } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    actions.getServicesList(request);
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
    actions.getServicesList(request);
  }

  render() {
    const {
      isOpenModal,
      pagination,
      services,
      isLoading,
      actions
    } = this.props;
    return (
      <div>
        <div className="page-title">
          <div className="row">
            <div className="col-sm-6">
              <h3 className="mb-0 title-page">Quản lý dịch vụ</h3>
            </div>
            <div className="col-sm-6">
              <nav className="float-left float-sm-right">
                <button
                  type="button"
                  className="btn btn-pri mr-12 mb-10"
                  onClick={this.showModal}
                >
                  <img src={iconAdd} className="add mr-6" />
                  Thêm dịch vụ
                </button>
              </nav>
            </div>
            <CreateServicesModalComponent
              isLoading={isLoading}
              isOpenModal={isOpenModal}
              closeModal={this.closeModal}
              saveAction={this.createServices}
            ></CreateServicesModalComponent>
          </div>
        </div>
        <Spin size="large" spinning={isLoading}>
          <div className="row">
            <ServicesListComponent
              pagination={pagination}
              actions={actions}
              handleTableChange={this.tableChange}
              onSearch={this.onSearch}
              services={services}
              isLoading={isLoading}
            />
          </div>
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = (state: State) => ({
  ...state.servicesState
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators<any>(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Services);
