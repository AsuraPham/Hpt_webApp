import React from "react";

import { SearchBaseModel } from "../../../common/models/SearchBaseModel";
import Table, { ColumnProps } from "antd/lib/table";
import PendingMedicalApi from "../PendingMedical/PendingMedicalService";

type StatePendingMedical = typeof initialState;

const initialState = {
  visible: false,
  pendingCount: []
};

export default class PendingMedicalContainers extends React.Component<any, StatePendingMedical> {
  columns: ColumnProps<any>[] = [
    {
      title: "Tên phòng",
      dataIndex: "clinicName",
      key: "clinicName",
      width: 200
    },
    {
      title: "Số lượng chờ",
      dataIndex: "pendingCount",
      key: "pendingCount",
      width: 200
    }
  ];

  pendingMedicalApi = new PendingMedicalApi();

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.onSearch("");
  }

  state = initialState;

  onSearch = e => {
    const { searchRequest } = this.props;
    let request = {
      ...searchRequest,
      pageIndex: 1,
      keyword: e
    };
    this.getListPendingCoutMedical(request);
  }

  tableChange = (pagination, { }, sorter) => {
    let searchRequest: SearchBaseModel = this.props.searchRequest || {};
    const pageIndex = pagination.current;
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
    this.getListPendingCoutMedical(request);
  }

  getListPendingCoutMedical = (request) => {
    this.pendingMedicalApi.getPendingCount()
      .toPromise()
      .then((data: any) => {
        this.setState({ pendingCount: data.result });
      });
  }

  render() {
    const {
      pagination,
    } = this.props;

    const { pendingCount } = this.state;

    return (
      <div>
        <div className="page-title">
          <div className="row">
            <div className="col-sm-6">
            </div>
          </div>
        </div>
        <div className="row">
          <div className="mb-30 col">
            <div className="card-statistics h-100 card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="mb-30">
                      <b>Phòng khám có bệnh nhân chờ</b>
                    </h5>
                  </div>
                </div>
                <div className="row box-content">
                  <Table
                    className="mb-30 col"
                    columns={this.columns}
                    dataSource={pendingCount}
                    pagination={pagination}
                    onChange={this.tableChange}
                    rowKey="id"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}