import React from "react";
import { dateFormat } from "../../../common/utils";
import Table, { ColumnProps } from "antd/lib/table";
import { toastr } from "react-redux-toastr";

import InfoMedicalApi from "./InfoMedicalServices";
import { PAGE_SIZE, ACCOUNT_INFO, DEFAULT_DATE_FORMAT } from "../../../common/Constants";
import { GetPagination } from "../../../common/models/Pagination";
import { ERROR } from "../../../common/components/messages";
import { Form, Input, Button, DatePicker, Spin } from "antd";
import { FormComponentProps } from "antd/lib/form";
import moment from "moment";

import InfoCaseRecordContainer from "./InfoCaseRecordContainer";

import "../InfoMedicalContainer/styles.module.css";
import { get } from "lodash";

interface Props {
  patientInfo?: any;
}

class InfoMedicalContainer extends React.Component<Props & FormComponentProps> {

  columns: ColumnProps<any>[] = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 10
    },
    {
      title: "Ngày lập",
      dataIndex: "createAt",
      render: (text, record: any) => dateFormat(record.createAt),
      key: "createAt",
      width: 50
    },
    {
      title: "Người lập phiếu",
      dataIndex: "user.fullName",
      key: "user.fullName",
      width: 50
    }
  ];

  ref = React.createRef();

  infoMedicalApi = new InfoMedicalApi();

  state = {
    listCaseRecords: [],
    accountInfo: JSON.parse(localStorage.getItem(ACCOUNT_INFO) || "{}") || {},
    pagination: {
      current: 1,
      pageSize: PAGE_SIZE,
      total: 0
    },
    searchRequest: {
      pageIndex: 1,
      pageSize: PAGE_SIZE,
      keyword: ""
    },
    isLoading: true,
    selectedCase: null,
  };

  componentDidMount() {
    const { searchRequest } = this.state;
    this.getListCaseRecordMedical(searchRequest);
  }

  getListCaseRecordMedical = (request) => {
    const { patientInfo } = this.props;
    this.infoMedicalApi.getListCaseRecordByPatientId(request, patientInfo.patientId).toPromise().then((data: any) => {
      if (data && data.hasErrors) {
        toastr.error(ERROR, data.Errors[0].message);
      } else {
        this.setState({ listCaseRecords: data.result, pagination: GetPagination(data.meta), isLoading: false });
      }
    });
  }

  tableChange = (pagination, { }) => {
    const { searchRequest } = this.state;
    const pageIndex = pagination.current;
    let request = {
      ...searchRequest,
      pageIndex: pageIndex
    };
    this.getListCaseRecordMedical(request);
  }

  renderPatientInfo = () => {
    const { patientInfo } = this.props;
    return (
      <>
        <div className="cardTitle">Thông tin bệnh nhân</div>
        <div className="row">
          <div className="col-md-6">
            <h6 className="textInfo">Họ tên : {patientInfo.patientName}</h6>
          </div>
          <div className="col-md-6">
            <h6 className="textInfo">Số thứ tự : {patientInfo.ordinalNumber}</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h6 className="textInfo">Ngày sinh : {dateFormat(patientInfo.patientDateOfBirth)}</h6>
          </div>
          <div className="col-md-6">
            <h6 className="textInfo">Giới tính : {patientInfo.patientSex}</h6>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h6 className="textInfo">Địa chỉ: {patientInfo.patientAddress}</h6>
          </div>
        </div>
      </>
    );
  }

  handleCaseRecord = (record) => {
    this.setState({ selectedCase: record });
  }

  rederCaseRecord = () => {
    const { listCaseRecords, pagination, selectedCase } = this.state;
    return (
      <>
        <div className="cardTitle mt-20">Danh sách bệnh án</div>
        <Table
          onRow={(record) => ({
            onClick: () => this.handleCaseRecord(record)
          })}
          className="mb-30 tableCaseRecord"
          rowClassName={(record) => record.id === get(selectedCase, "id") ? "isActive" : ""}
          columns={this.columns}
          dataSource={listCaseRecords}
          pagination={pagination}
          onChange={this.tableChange}
          rowKey="id"
        />
        <div className="text-center">
          <Button type="primary" key="submit" style={{ width: "unset" }} onClick={this.onSubmit}>
            Lập bệnh án
          </Button>
          <Button type="primary" className="ml-10" style={{ width: "unset" }} onClick={this.onClickMedicalDone}>
            Hoàn tất khám
          </Button>
        </div>
      </>
    );

  }

  onSubmit = () => {
    const form = this.props.form;
    const { patientInfo } = this.props;
    const { accountInfo, searchRequest } = this.state;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let request = {
        createAt: values.createAt,
        patientId: patientInfo.patientId,
        userId: accountInfo.id
      };
      this.infoMedicalApi.createCaseRecord(request).toPromise().then((data: any) => {
        if (data.response && data.response.hasErrors) {
          toastr.error(ERROR);
        } else {
          this.getListCaseRecordMedical(searchRequest);
        }
      });
    });
  }

  createNewCaseRecord = () => {
    const { getFieldDecorator } = this.props.form;
    const { accountInfo } = this.state;
    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <>
        <Form {...formItemLayout}>
          <div className="cardTitle mt-20">Thông tin bệnh án</div>
          <Form.Item label="Người lập">
            <Input placeholder="Người lập" value={accountInfo.fullName} readOnly />
          </Form.Item>

          <Form.Item label="Ngày lập">
            {getFieldDecorator("createAt", { ...config, initialValue: moment(moment(), DEFAULT_DATE_FORMAT) })(
              <DatePicker
                placeholder="Chọn ngày nhập"
                format={DEFAULT_DATE_FORMAT}
                style={{ width: "100%" }}
              />
            )}
          </Form.Item>

        </Form>
      </>
    );
  }

  onClickMedicalDone = () => {
    // 
  }

  render() {
    const { selectedCase, isLoading } = this.state;
    return (
      <Spin size="large" spinning={isLoading}>
        <div className="row">
          <div className="col-md-4">
            <div className="card-statistics h-100 card">
              <div className="card-body container">
                {this.renderPatientInfo()}
                {this.createNewCaseRecord()}
                {this.rederCaseRecord()}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <InfoCaseRecordContainer caseRecordInfo={selectedCase} />
          </div>
        </div>
      </Spin>
    );
  }
}

const InfoList = Form.create()(InfoMedicalContainer);
export default InfoList;
