import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";

import { State } from "../../../root";
import { iconAdd } from "../../../common/const/image-const";
import * as actionCreators from "./UserAction";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

import CreateUserModalComponent from "./components/CreateUserModalComponent";
import UserListComponent from "./components/UserListComponent";
import { UserState } from "./models/UserState";

import UserApi from "./UserService";

interface Props extends UserState {
  isOpenModal: boolean;
  actions: typeof actionCreators;
  isLoading?: boolean;
  history?: any;
  isOpenModalDelete: boolean;
}

type StateUser = typeof initialState;

const initialState = {
  visible: false,
  listRole: [],
  listClinic: []
};

class RoleContainer extends React.Component<Props, StateUser> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.onSearch("");
    this.getListClinic();
    this.getListRole();
  }

  state = initialState;

  userApi = new UserApi();

  getListRole = () => {
    this.userApi.getListRole()
      .toPromise()
      .then((data: any) => {
        this.setState({ listRole: data.result });
      });
  }

  getListClinic = () => {
    this.userApi.getListClinic()
      .toPromise()
      .then((data: any) => {
        this.setState({ listClinic: data.result });
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

  createUser = value => {
    const { actions } = this.props;
    actions.createUser(value);
  }

  onSearch = e => {
    const { searchRequest, actions } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    actions.getUserList(request);
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
    actions.getUserList(request);
  }

  render() {
    const {
      isOpenModal,
      pagination,
      users,
      isLoading,
      actions,
      isOpenModalDelete
    } = this.props;
    const { listClinic, listRole } = this.state;

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
                  Thêm người dùng
                </button>
              </nav>
            </div>
            <CreateUserModalComponent
              isLoading={isLoading}
              isOpenModal={isOpenModal}
              closeModal={this.closeModal}
              saveAction={this.createUser}
              listClinic={listClinic}
              listRole={listRole}
            />
          </div>
        </div>
        <Spin size="large" spinning={isLoading}>
          <div className="row">
            <UserListComponent
              pagination={pagination}
              actions={actions}
              handleTableChange={this.tableChange}
              onSearch={this.onSearch}
              users={users}
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
  ...state.userState
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators<any>(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleContainer);
