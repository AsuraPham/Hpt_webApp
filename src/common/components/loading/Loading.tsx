import * as React from "react";
import "./style.css";
import { Spin } from "antd";

interface Props {
  loading?: boolean;
}
export default ({ loading = false }: Props) => {
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-overlay"></div>
        <div className="loading-content">
          <Spin tip="Loading..." size="large" spinning={true}></Spin>
        </div>
      </div>
    );
  }
  return null;
};
