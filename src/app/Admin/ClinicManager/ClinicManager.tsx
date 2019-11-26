import { Tabs } from "antd";
import React from "react";
import KindOfRoomContainer from "../../../containers/Admin/KindOfRoomContainers/KindOfRoomContainers";
import ClinicContainers from "../../../containers/Admin/ClinicContainers/ClinicContainers";

export default class ClinicManager extends React.Component {

  onChange = () => {
    // console.log("xx");
  }
  render() {
    const { TabPane } = Tabs;
    return (
      <>
        <Tabs type="card" onChange={this.onChange} >
          <TabPane tab="Phòng khám" key="1" >
            <ClinicContainers />
          </TabPane>
          <TabPane tab="Loại phòng" key="2">
            <KindOfRoomContainer />
          </TabPane>
        </Tabs>
      </>
    );
  }
}