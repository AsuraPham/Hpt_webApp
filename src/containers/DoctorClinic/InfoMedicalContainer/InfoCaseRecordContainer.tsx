import React from "react";

import "../InfoMedicalContainer/styles.module.css";
import SubclinicalResultContainer from "../CaseRecordContainer/SubclinicalResultContainer";
import MedicalBillContainer from "../CaseRecordContainer/MedicalBillContainer";
import PresciptionContainer from "../CaseRecordContainer/PrescriptionContainer";
import { Tabs, notification } from "antd";
import { isEmpty, get } from "lodash";

interface Props {
  caseRecordInfo?: any;
}

export default class InfoCaseRecordContainer extends React.Component<Props, any> {
  componentDidMount() {
    const { caseRecordInfo } = this.props;
    if (isEmpty(caseRecordInfo)) {
      this.openNotificationWithIcon("warning");
    }
  }

  openNotificationWithIcon = type => {
    notification[type]({
      message: "Thông báo",
      description:
        "Bạn chưa chọn bệnh án nào trong danh sách hoặc chưa lập mới 1 bệnh án",
    });
  }

  render() {
    const { TabPane } = Tabs;
    const { caseRecordInfo } = this.props;
    return (
      <div className="card-statistics h-100 card">
        <div className="container">
          <div className="cardTitle">Bệnh án</div>
          <Tabs className="tab-border">
            <TabPane tab={<span><i className="fa fa-home"></i> Phiếu khám bệnh</span>} key="1" >
              <MedicalBillContainer caseRecordInfo={caseRecordInfo} key={get(caseRecordInfo, "id")} />
            </TabPane>
            <TabPane tab={<span><i className="fa fa-user"></i> Khám cận lâm sàng</span>} key="2">
              <SubclinicalResultContainer caseRecordInfo={caseRecordInfo} key={get(caseRecordInfo, "id")} />
            </TabPane>

            <TabPane tab={<span><i className="fa fa-picture-o"></i> Đơn thuốc</span>} key="3">
              <PresciptionContainer caseRecordInfo={caseRecordInfo} key={get(caseRecordInfo, "id")} />
            </TabPane>
          </Tabs>
        </div>
      </div >
    );
  }
}