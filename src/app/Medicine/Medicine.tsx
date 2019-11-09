import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";

import { State } from "../../root";
import { iconAdd } from "../../common/const/image-const";
import * as actionCreators from "./MedicineAction";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

import CreateMedicineComponent from "./components/CreateMedicineComponent";
import MedicineListComponent from "./components/MedicineListComponent";
import { MedicineState } from "./models/MedicineState";

interface Props extends MedicineState {
  isOpenModal: boolean;
  actions: typeof actionCreators;
  isLoading?: boolean;
  isLoadingCreate?: boolean;
  history?: any;
}

class Medicine extends React.Component<Props, any> {
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

  createMedicine = value => {
    const { actions } = this.props;
    actions.createMedicine(value);
  }

  onSearch = e => {
    const { searchRequest, actions } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    actions.getMedicineList(request);
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
    actions.getMedicineList(request);
  }

  render() {
    const {
      isOpenModal,
      pagination,
      medicines,
      isLoadingCreate,
      isLoading,
      actions
    } = this.props;
    return (
      <div>
        <div className="page-title">
          <div className="row">
            <div className="col-sm-6">
              <h3 className="mb-0 title-page">Quản lý thuốc</h3>
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
            <CreateMedicineComponent
              isLoading={isLoadingCreate}
              isOpenModal={isOpenModal}
              closeModal={this.closeModal}
              saveAction={this.createMedicine}
            ></CreateMedicineComponent>
          </div>
        </div>
        <Spin size="large" spinning={isLoading}>
          <div className="row">
            <MedicineListComponent
              pagination={pagination}
              actions={actions}
              handleTableChange={this.tableChange}
              onSearch={this.onSearch}
              medicines={medicines}
              isLoading={isLoading}
            />
          </div>
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = (state: State) => ({
  ...state.medicineState
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators<any>(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Medicine);
