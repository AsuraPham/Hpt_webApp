import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";

import { State } from "../../../root";
import { iconAdd } from "../../../common/const/image-const";
import * as actionCreators from "./RoleAction";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

import CreateRoleModalComponent from "./components/CreateRoleModalComponent";
import RoleListComponent from "./components/RoleListComponent";
import { RoleState } from "./models/RoleState";

interface Props extends RoleState {
  isOpenModal: boolean;
  actions: typeof actionCreators;
  isLoading?: boolean;
  history?: any;
  isOpenModalDelete: boolean;
}

class RoleContainer extends React.Component<Props, any> {
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

  createRole = value => {
    const { actions } = this.props;
    actions.createRole(value);
  }

  onSearch = e => {
    const { searchRequest, actions } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    actions.getRoleList(request);
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
    actions.getRoleList(request);
  }

  render() {
    const {
      isOpenModal,
      pagination,
      roles,
      isLoading,
      actions,
      isOpenModalDelete
    } = this.props;
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
                  Thêm quyền
                </button>
              </nav>
            </div>
            <CreateRoleModalComponent
              isLoading={isLoading}
              isOpenModal={isOpenModal}
              closeModal={this.closeModal}
              saveAction={this.createRole}
            />
          </div>
        </div>
        <Spin size="large" spinning={isLoading}>
          <div className="row">
            <RoleListComponent
              pagination={pagination}
              actions={actions}
              handleTableChange={this.tableChange}
              onSearch={this.onSearch}
              roles={roles}
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
  ...state.roleState
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators<any>(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleContainer);
