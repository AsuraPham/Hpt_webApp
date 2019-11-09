import * as React from "react";
import { Spin } from "antd";
import NotificationStatisticComponent from "./components/NotificationStatisticComponent";
import NotificationListComponent from "./components/NotificationListComponent";
import { connect } from "react-redux";
import { State } from "../../root";
import { bindActionCreators } from "redux";
import * as actionCreators from "./NotificationAction";
import { NotificationState } from "./models/NotificationState";
import { PAGE_SIZE, SORT_TYPE } from "../../common/Constants";
import { SearchBaseModel } from "../../common/models/SearchBaseModel";

interface Props extends NotificationState {
  actions: typeof actionCreators;
}
class Notifications extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getNotificationStatistics();
    let request = {
      pageIndex: 1,
      pageSize: PAGE_SIZE,
      keyword: "",
      sort: {
        column: "notificationId",
        type: SORT_TYPE.ASC
      }

    };
    this.props.actions.getListNotification(request);
    this.props.actions.getNotificationStatus();
  }

  tableChange = (pagination, filters, sorter) => {
    let searchRequest: SearchBaseModel = this.props.searchRequest || {};
    const pageIndex = pagination.current;
    let request = {
      ...searchRequest,
      pageIndex: pageIndex
    };
    if (sorter.field) {
      request = {
        ...request, sort: {
          column: sorter.field,
          type: sorter.order
        }
      };
    }
    this.props.actions.getListNotification(request);
  }

  onSearch = (e) => {
    let request = {
      ...this.props.searchRequest,
      pageIndex: 1,
      keyword: e
    };
    this.props.actions.getListNotification(request);
  }

  render() {
    return (
      <div>
        <Spin size="large" spinning={this.props.isLoading}>
          <div className="page-title">
            <div className="row">
              <div className="col-sm-6">
                <h3 className="mb-0 title-page">Notifications</h3>
              </div>
            </div>
          </div>
          <NotificationStatisticComponent
            notificationStatistic={this.props.notificationStatistic}
            notificationStatus={this.props.notificationStatus}
          />
          <div className="row">
            <NotificationListComponent
              notifications={this.props.notifications}
              onSearch={this.onSearch}
              pagination={this.props.pagination}
              handleTableChange={this.tableChange}
              isLoading={this.props.isLoading}
              actions={this.props.actions}
              notificationDetail={this.props.notificationDetail}
              isOpenModal={this.props.isOpenModal}
            />
          </div>
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = (state: State) => ({
  ...state.notificationState
});
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators<any>(actionCreators, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);