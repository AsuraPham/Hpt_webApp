import * as React from "react";
import { userDashboard, cloud } from "../../common/const/image-const";

export default class Dashboard extends React.Component {

  render() {

    return (
      <div>
        <div className="page-title">
          <div className="row">
            <div className="mb-30 col">
              <h3 className="mb-0 title-page">Bảng điều khiển</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="mb-30 col-md-4">
            <div className="card-statistics h-100 card">
              <div className="card-body"><div className="clearfix">
                <div className="float-left">
                  <img className="mt-20 ml-20 mb-10" src={userDashboard} />
                </div>
                <div className="float-right text-right mt-20 mr-20 mb-10">
                  <p className="card-text">Tổng số bệnh nhân</p><h1 className="txt-bold">285</h1>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="mb-30 col-md-4">
            <div className="card-statistics h-100 card">
              <div className="card-body"><div className="clearfix">
                <div className="float-left">
                  <img className="mt-20 ml-20 mb-10" src={cloud} />
                </div>
                <div className="float-right text-right mt-20 mr-20 mb-10">
                  <p className="card-text">Số lượt khám trong tuần</p><h1 className="txt-bold">2313</h1>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="mb-30 col-md-4">
            <div className="card-statistics h-100 card">
              <div className="card-body"><div className="clearfix">
                <div className="float-left">
                  <img className="mt-20 ml-20 mb-10" src={userDashboard} />
                </div>
                <div className="float-right text-right mt-20 mr-20 mb-10">
                  <p className="card-text">Tổng số nhân viên, bác sĩ</p><h1 className="txt-bold">25</h1>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
