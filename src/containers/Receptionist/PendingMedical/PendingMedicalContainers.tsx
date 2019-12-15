import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";

import { State } from "../../../root";
import * as actionCreators from "./PendingMedicalAction";
import { SearchBaseModel } from "../../../common/models/SearchBaseModel";

import ListPendingComponent from "./components/ListPendingComponent";
import { PendingMedicalState } from "./models/PendingMedicalState";

interface Props extends PendingMedicalState {
  isOpenModal: boolean;
  actions: typeof actionCreators;
  isLoading?: boolean;
  history?: any;
  isOpenModalDelete: boolean;
}

type StatePendingMedical = typeof initialState;

const initialState = {
  visible: false
};

class PendingMedicalContainers extends React.Component<Props, StatePendingMedical> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.onSearch("");
  }

  state = initialState;

  onSearch = e => {
    const { searchRequest, actions } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    actions.getPendingMedicalList(request);
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
    actions.getPendingMedicalList(request);
  }

  render() {
    const {
      pagination,
      pendingMedicals,
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
          </div>
        </div>
        <Spin size="large" spinning={isLoading}>
          <div className="row">
            <ListPendingComponent
              pagination={pagination}
              actions={actions}
              handleTableChange={this.tableChange}
              onSearch={this.onSearch}
              pendingMedicals={pendingMedicals}
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
  ...state.pendingMedicalState
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators<any>(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingMedicalContainers);
