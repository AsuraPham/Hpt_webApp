import React from "react";
import { Form, Input, Select, Button, Spin, Popconfirm } from "antd";
import { FormComponentProps } from "antd/lib/form";
import Table, { ColumnProps } from "antd/lib/table";
import TextArea from "antd/lib/input/TextArea";
import { get, isEmpty } from "lodash";
import { toastr } from "react-redux-toastr";

import CaseRecordApi from "./CaseRecordServices";
import { ERROR } from "../../../common/components/messages";
import { dateFormat } from "../../../common/utils";
import { formatPrice } from "../../../lib/numberFormatter";

interface Props {
  caseRecordInfo?: any;
}
class SubclinicalResultContainer extends React.Component<Props & FormComponentProps> {

  columns: ColumnProps<any>[] = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 60
    },
    {
      title: "Tên yêu cầu",
      dataIndex: "servicesExamination.serviceName",
      key: "servicesExamination.serviceName",
      width: 150
    },
    {
      title: "Kết quả",
      dataIndex: "result",
      key: "result",
      width: 150
    },
    {
      title: "Kết luận",
      dataIndex: "conclusion",
      key: "conclusion",
      width: 150
    },
    {
      title: "Đơn giá",
      dataIndex: "servicesExamination.price",
      key: "servicesExamination.price",
      render: (text, record: any) => formatPrice(record.servicesExamination.price, "VND"),
      width: 100
    },
    {
      title: "",
      className: "text-right",
      width: 100,
      render: (text, record) => (
        <Popconfirm title="Bạn có muốn xoá" okText="Có" cancelText="Không" onConfirm={() => this.deleteSubclinicalResult(record)}
        >
          <a href="#">Xoá</a>
        </Popconfirm>
      ),
    }
  ];

  caseRecordApi = new CaseRecordApi();

  state = {
    listSubclinicalResult: [],
    subclinicSelected: null,
    listServices: [],
    isLoading: false
  };

  componentDidMount() {
    this.getListServices();
    this.getListSubclinicalResult();
  }

  getListServices = () => {
    this.caseRecordApi.getListServices().toPromise().then((data: any) => {
      if (data && data.hasErrors) {
        toastr.error(ERROR, data.Errors[0].message);
      } else {
        this.setState({ listServices: data.result });
      }
    });
  }

  getListSubclinicalResult = () => {
    const { caseRecordInfo } = this.props;
    if (isEmpty(caseRecordInfo)) { return; }
    this.setState({ isLoading: true }, () => {
      this.caseRecordApi.getListSubclinicalResultByCaseRecord(caseRecordInfo.id).toPromise().then((data: any) => {
        this.setState({ isLoading: false });
        if (data && data.hasErrors) {
          toastr.error(ERROR, data.Errors[0].message);
        } else {
          this.setState({ listSubclinicalResult: data.result });
        }
      });
    });
  }

  createSubclinicalResult = () => {
    const { getFieldDecorator } = this.props.form;
    const { caseRecordInfo } = this.props;
    const { Option } = Select;
    const { subclinicSelected, listServices } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };

    return (
      <>
        <Form {...formItemLayout}>
          <Form.Item label="Ngày khám">
            <Input placeholder="Ngày khám" value={dateFormat(get(caseRecordInfo, "createAt"))} readOnly />
          </Form.Item>

          <Form.Item label="Kết quả">
            {getFieldDecorator("result", {
              initialValue: get(subclinicSelected, "result")
            })(<TextArea placeholder="Kết quả" />)}
          </Form.Item>

          <Form.Item label="Kết luận">
            {getFieldDecorator("conclusion", {
              initialValue: get(subclinicSelected, "conclusion")
            })(<TextArea placeholder="Kết luận" />)}
          </Form.Item>

          <Form.Item label="Yêu cầu khám">
            {getFieldDecorator("servicesExaminationId", {
              rules: [{ required: true, message: "Chọn một dịch vụ" }],
              initialValue: get(subclinicSelected, "servicesExamination.id")
            })(
              <Select placeholder="Chọn một dịch vụ">
                {listServices.map((item: any) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.serviceName} --- {item.price}đ
                    </Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
        </Form>
      </>
    );
  }

  handleClickRowTalbe = (record) => {
    this.setState({ subclinicSelected: record });
  }

  renderTableSubclinicResult = () => {
    const { listSubclinicalResult } = this.state;
    return (
      <Table
        onRow={(record) => ({
          onClick: () => this.handleClickRowTalbe(record)
        })}
        className="mb-30 mt-20 tableCaseRecord"
        columns={this.columns}
        dataSource={listSubclinicalResult}
        rowKey="index"
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    );

  }

  onCreate = () => {
    const form = this.props.form;
    const { caseRecordInfo } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let request = {
        ...values,
        userId: get(caseRecordInfo, "userId"),
        caseRecordId: get(caseRecordInfo, "id")
      };

      this.caseRecordApi.createSubclinicalResult(request).toPromise().then((data: any) => {
        if (data.response && data.response.hasErrors) {
          toastr.error(ERROR);
        } else {
          this.getListSubclinicalResult();
        }
      });
    });
  }

  onUpdate = () => {
    const form = this.props.form;
    const { subclinicSelected } = this.state;
    if (isEmpty(subclinicSelected)) { return; }
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let request = {
        ...values,
        id: get(subclinicSelected, "id")
      };
      this.caseRecordApi.updateSubclinicalResult(request).toPromise().then((data: any) => {
        if (data.response && data.response.hasErrors) {
          toastr.error(ERROR);
        } else {
          this.getListSubclinicalResult();
        }
      });
    });
  }

  onExportResult = () => {
    // 
  }

  deleteSubclinicalResult = (record) => {
    this.caseRecordApi.deleteSubclinicalResult(record.id).toPromise().then((data: any) => {
      this.getListSubclinicalResult();
    });
  }

  renderButton = () => {
    const { subclinicSelected, listSubclinicalResult } = this.state;
    const { caseRecordInfo } = this.props;
    return (
      <div className="text-center">
        <Button type="primary" className="mr-20" onClick={this.onUpdate} >
          Cập nhật kết quả CLS
        </Button>

        <Button type="primary" className="mr-20" onClick={this.onCreate} >
          Thêm kết quả CLS
        </Button>
        {/* 
        <Button type="primary" onClick={this.onExportResult} disabled={isEmpty(listSubclinicalResult)}>
          Xuất kết quả
        </Button> */}
      </div>
    );

  }

  render() {
    const { isLoading } = this.state;
    return (
      <Spin size="large" spinning={isLoading}>
        <div className="card-statistics h-100 card">
          <div className="container">
            <div className="cardTitle">Kết luận</div>
            {this.createSubclinicalResult()}
            {this.renderTableSubclinicResult()}
            {this.renderButton()}
          </div>
        </div>
      </Spin>
    );
  }
}

const SubclinicalResult = Form.create()(SubclinicalResultContainer);
export default SubclinicalResult;