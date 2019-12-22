import React from "react";
import MedicalContainer from "../../../containers/DoctorClinic/MedicalContainer/MedicalContainer";
import { Tabs } from "antd";
import InfoMedicalContainer from "../../../containers/DoctorClinic/InfoMedicalContainer/InfoMedicalContainer";

export default class Medical extends React.Component<any, any> {
  newTabIndex: number;

  constructor(props: any) {
    super(props);
    this.newTabIndex = 0;
    const panes = [{
      title: "Danh sách khám",
      content: <MedicalContainer onAdd={this.add} />,
      key: "1",
      closable: false,
    }];
    this.state = {
      activeKey: panes[0].key,
      panes
    };
  }

  add = (record) => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: "Khám bệnh", content: <InfoMedicalContainer patientInfo={record} onRemove={this.handleRemoveTab} />, key: activeKey
    });
    this.setState({ panes, activeKey });
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  handleRemoveTab = () => {
    const { activeKey } = this.state;
    this.remove(activeKey);
    this.onChange("1");
  }

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  }

  render() {
    const { TabPane } = Tabs;
    return (
      <>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}>

          {this.state.panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>

      </>
    );
  }
}