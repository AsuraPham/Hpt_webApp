import * as React from "react";
import { Bar, Pie } from "react-chartjs-2";

import { NotificationStatisticItem, NotificationStatusModel } from "../models/NotificationModel";

interface Props {
  notificationStatistic?: NotificationStatisticItem[];
  notificationStatus?: NotificationStatusModel[];
}

export const NotificationStatisticComponent = (props: Props) => {
  const getRangeReport = () => {
    let notificationStatistic: NotificationStatisticItem[] = props.notificationStatistic || [];
    if (notificationStatistic.length > 0) {
      let first = notificationStatistic[0].month;
      let last = notificationStatistic[notificationStatistic.length - 1].month;
      return `${first} - ${last}`;
    }
    return "";
  };
  const getMonths = () => {
    let notificationStatistic: NotificationStatisticItem[] = props.notificationStatistic || [];
    return notificationStatistic.map(item => item.month);
  };

  const notificationData = () => {
    let notificationStatistic: NotificationStatisticItem[] = props.notificationStatistic || [];
    return notificationStatistic.map(item => item.count);
  };
  const statisticByCaseDate = () => {
    let notificationStatus: NotificationStatusModel[] = props.notificationStatus || [];
    return notificationStatus.map(item => item.numberOfNotification);
  };
  const getCases = () => {
    let notificationStatus: NotificationStatusModel[] = props.notificationStatus || [];
    return notificationStatus.map(item => item.case);
  };
  const backgroundColors = () => {
    let arr: string[] = [];
    for (let i = 12; i > 0; i--) {
      arr.push("#3cd2b1");
    }
    return arr;
  };
  const dataNotificationStatus = {
    labels: getCases(),
    datasets: [{
      data: statisticByCaseDate(),
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#6610f2"
      ],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#6610f2"
      ],

    }], text: ""
  };
  const notificationStatisticsData = {
    labels: getMonths(),
    datasets: [
      {
        label: "Notification sending",
        data: notificationData(),
        backgroundColor: backgroundColors()
      }
    ]
  };
  const barOption = {
    legend: {
      display: false,
    },
    layout: {
      padding: {
        top: 20
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0
        }
      }]
    }
  };
  const pieOpiton = {
    responsive: true,
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 10,
        padding: 20,
        fontSize: 12
      }
    }
  };

  return (
    <div className="row">
      <div className="mb-30 col-md-8">
        <div className="card">
          <div className="card-body">
            <div className="clearfix">
              <div className="float-left">
                <h4 className="card-title no-border">Notification Statistics</h4><p className="card-text">{getRangeReport()}</p>
              </div>
            </div>
            <Bar
              data={notificationStatisticsData}
              options={barOption}
              width={100}
              height={30}
            />
          </div>
        </div>
      </div>
      <div className="mb-30 col-md-4">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title no-border">Notification status</h4>
            <p>&nbsp;</p>
            <Pie data={dataNotificationStatus}
              options={pieOpiton}
              width={100}
              height={63} />
          </div>
        </div>
      </div>
    </div>);
};

export default NotificationStatisticComponent;