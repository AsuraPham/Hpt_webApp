import * as React from "react";
import { DeviceLocationStatistic } from "../models/DashboardModel";
import { refresh } from "../../../common/const/image-const";
import * as d3 from "d3";
import Datamap from "../../../common/components/Datamap";
import { getCountryISO3 } from "../countryCodeISO";
import ReactCountryFlag from "react-country-flag";

// const colors = d3.scale.category10();
interface Prop {
  deviceLocationStatistic?: DeviceLocationStatistic[];
}

function Zoom(datamap: any) {
  // limited zoom level by scaleExtent attribute
  datamap.svg.call(
    d3.behavior
      .zoom()
      .scaleExtent([0.5, 1000])
      .on("zoom", redraw)
  );
  function redraw() {
    datamap.svg
      .selectAll("g")
      .attr(
        "transform",
        "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"
      );
  }
}
class DeviceLocationStatisticComponent extends React.Component<Prop, any> {
  translateX: number = 0;
  translateY: number = 0;
  scaleMap: number = 1.2;

  constructor(props: any) {
    super(props);
  }

  zoomOut = () => {
    let worldMap: any;
    worldMap = document.getElementsByClassName("datamaps-subunits")[0];
    var transform = worldMap.getAttribute("transform");
    if (transform != null && transform.includes("translate")) {
      var arr = transform.split(",");
      this.translateX = Number(arr[0].replace("translate(", ""));
      var arrScale = arr[1].split(")scale(");
      this.translateY = Number(arrScale[0]);
      this.scaleMap = Number(arrScale[1].replace(")", ""));
    }
    // limited zoom level
    if (this.scaleMap > 0.5) {
      let container = document.getElementsByClassName("datamap")[0];
      var center = [
        Number(container.getAttribute("width")) / 2,
        Number(container.getAttribute("height")) / 2
      ];
      var scale = this.scaleMap;
      var translate = [this.translateX, this.translateY];
      var x = translate[0],
        y = translate[1];
      var factor = 1 / 1.2;
      var targetScale = scale * factor;
      x = (x - center[0]) * factor + center[0];
      y = (y - center[1]) * factor + center[1];
      worldMap.setAttribute(
        "transform",
        "translate(" + x + "," + y + ")scale(" + targetScale + ")"
      );
    }
  }
  zoomIn = () => {
    let worldMap: any;
    worldMap = document.getElementsByClassName("datamaps-subunits")[0];
    var transform = worldMap.getAttribute("transform");
    if (transform != null && transform.includes("translate")) {
      var arr = transform.split(",");
      this.translateX = Number(arr[0].replace("translate(", ""));
      var arrScale = arr[1].split(")scale(");
      this.translateY = Number(arrScale[0]);
      this.scaleMap = Number(arrScale[1].replace(")", ""));
    }
    let container = document.getElementsByClassName("datamap")[0];
    var center = [
      Number(container.getAttribute("width")) / 2,
      Number(container.getAttribute("height")) / 2
    ];
    var scale = this.scaleMap;
    var translate = [this.translateX, this.translateY];
    var x = translate[0],
      y = translate[1];
    var factor = 1.2;
    var targetScale = scale * factor;
    x = (x - center[0]) * factor + center[0];
    y = (y - center[1]) * factor + center[1];
    worldMap.setAttribute(
      "transform",
      "translate(" + x + "," + y + ")scale(" + targetScale + ")"
    );
  }
  resetZoom = () => {
    let worldMap: any;
    worldMap = document.getElementsByClassName("datamaps-subunits")[0];
    worldMap.setAttribute("transform", "translate(0,0)scale(1)");
  }
  render() {
    let data = {};
    let locations = this.props.deviceLocationStatistic || [];
    locations.forEach(item => {
      data[getCountryISO3(item.countryCode)] = { fillKey: "Colors" };
    });
    return (
      <div className="mb-30 col">
        <div className="card-statistics h-100 card">
          <div className="card-body pl-0">
            <div
              className="clearfix card-title ml-20 mr-20 pb-15"
              style={{ textTransform: "none" }}
            >
              <div className="float-left mt-20">
                <h5 className="txt-bold">Location of active users</h5>
                <p>Map of the distribution of users around the world</p>
              </div>
              <div className="float-right text-right mt-20">
                <img
                  className=""
                  src={refresh}
                  onClick={() => this.resetZoom()}
                />
              </div>
            </div>
            <div className="row card-body" style={{ marginLeft: 10 }}>
              <div className="col-md-4">
                {locations.map((item, i) => {
                  return (
                    <div key={i} className="row mb-10 mt-20 card-title">
                      <div className="col-md-2">
                        <ReactCountryFlag code={item.countryCode} svg />
                      </div>
                      <div className="col-md-4">{item.countryName}</div>
                      <div className="col-md-3">{item.totalDevices}</div>
                      <div className="col-md-3">{item.percentage}%</div>
                    </div>
                  );
                })}
              </div>
              <div className="col float-right">
                <Datamap
                  scope="world"
                  done={Zoom}
                  data={data}
                  scale={50}
                  fills={{
                    defaultFill: "#f2f2f2",
                    Colors: "#29a8ff"
                  }}
                  geographyConfig={{
                    popupOnHover: false,
                    highlightOnHover: false
                  }}
                  responsive={true}
                  projection="mercator"
                  updateChoroplethOptions={{ reset: false }}
                />
              </div>
              <div>
                <button
                  className="zoom-button"
                  data-zoom="in"
                  onClick={() => this.zoomIn()}
                >
                  +
                </button>
                <br></br>
                <button
                  className="zoom-button"
                  data-zoom="out"
                  onClick={() => this.zoomOut()}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DeviceLocationStatisticComponent;
