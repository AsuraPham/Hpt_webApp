import { Tabs } from "antd";
import React from "react";
import RoleContainers from "../../../containers/Admin/RoleContainers/RoleContainers";
import UserContainers from "../../../containers/Admin/UserContainers/UserContainers";

export default class UserManager extends React.Component {

  onChange = () => {
    // console.log("xx");
  }
  render() {
    const { TabPane } = Tabs;
    return (
      <>
        <Tabs type="card" onChange={this.onChange} >
          <TabPane tab="Quản lý người dùng" key="1" >
            <UserContainers />
          </TabPane>
          <TabPane tab="Quản lý quyền" key="2">
            <RoleContainers />
          </TabPane>
        </Tabs>
      </>
    );
  }
}