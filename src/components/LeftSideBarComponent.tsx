import * as React from "react";
import "../css/sidebar.css";
import {
  iconDashboard,
  iconDeparment,
  iconDoctor,
  iconPack,
  bell
} from "../common/const/image-const";
import { NavLink } from "react-router-dom";
import { STATIC_ROUTE } from "../common/Constants";
import {
  DASHBOARD,
  DEPARTMENT,
  DOCTORS,
  PATIENT,
  NOTIFICATION,
  MEDICINE,
  SERVICE,
  CLINIC_MANAGER,
  USER_MANAGER,
  RECEIVE_PATIENT
} from "../common/const/menu";
import "./leftSideBar.css";

export const LeftSideBarComponent = () => (
  <div className="side-menu-fixed">
    <div
      className="scrollarea scrollbar side-menu-bg"
      style={{ overflow: "hidden" }}
    >
      <div className="scrollarea-content saidbar" style={{ margin: 0 }}>
        <div className="saidbar">
          <ul className="nav navbar-nav side-menu" id="sidebarnav">
            <li>
              <NavLink to={STATIC_ROUTE.HOME} aria-current={true}>
                <i className="ti-home">
                  <img src={iconDashboard} />
                </i>
                <span className="right-nav-text">{DASHBOARD}</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={STATIC_ROUTE.RECEIVE_PATIENT}>
                <i className="ti-home">
                  <img className="imageIcon" src={iconDeparment} />
                </i>
                <span className="right-nav-text">{RECEIVE_PATIENT}</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={STATIC_ROUTE.DEPARTMENT}>
                <i className="ti-home">
                  <img className="imageIcon" src={iconDeparment} />
                </i>
                <span className="right-nav-text">{DEPARTMENT}</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={STATIC_ROUTE.DOCTOR} activeClassName="active">
                <i className="ti-home">
                  <img className="imageIcon" src={iconDoctor} />
                </i>
                <span className="right-nav-text">{DOCTORS}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={STATIC_ROUTE.NOTIFICATION}>
                <i className="ti-home">
                  <img src={bell} />
                </i>
                <span className="right-nav-text">{NOTIFICATION}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={STATIC_ROUTE.PATIENT}>
                <i className="ti-home">
                  <img src={iconPack} />
                </i>
                <span className="right-nav-text">{PATIENT}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={STATIC_ROUTE.MEDICINE}>
                <i className="ti-home">
                  <img src={iconPack} />
                </i>
                <span className="right-nav-text">{MEDICINE}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={STATIC_ROUTE.CLINIC_MANAGER}>
                <i className="ti-home">
                  <img src={iconPack} />
                </i>
                <span className="right-nav-text">{CLINIC_MANAGER}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={STATIC_ROUTE.USER_MANAGER}>
                <i className="ti-home">
                  <img src={iconPack} />
                </i>
                <span className="right-nav-text">{USER_MANAGER}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={STATIC_ROUTE.SERVICES}>
                <i className="ti-home">
                  <img src={iconPack} />
                </i>
                <span className="right-nav-text">{SERVICE}</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default LeftSideBarComponent;
