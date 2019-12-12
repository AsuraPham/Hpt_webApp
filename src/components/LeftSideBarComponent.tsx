import * as React from "react";
import "../css/sidebar.css";
import {
  iconDashboard,
  iconDeparment,
  iconDoctor,
  iconPack
} from "../common/const/image-const";
import { NavLink } from "react-router-dom";
import { STATIC_ROUTE, ACCOUNT_INFO, ROLE } from "../common/Constants";
import {
  DASHBOARD,
  DEPARTMENT,
  DOCTORS,
  PATIENT,
  MEDICINE,
  SERVICE,
  CLINIC_MANAGER,
  USER_MANAGER,
  RECEIVE_PATIENT,
  PENDING_MEDICAL,
  MEDICAL,
  PRESCRIPTION
} from "../common/const/menu";
import "./leftSideBar.css";

export default class LeftSideBarComponent extends React.Component {

  render() {
    const accountInfo: any =
      JSON.parse(localStorage.getItem(ACCOUNT_INFO) || "{}") || {};
    return (
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
                {accountInfo.roleName === ROLE.RECEPTIONIST && (
                  <>
                    <li>
                      <NavLink to={STATIC_ROUTE.RECEIVE_PATIENT}>
                        <i className="ti-home">
                          <img className="imageIcon" src={iconDeparment} />
                        </i>
                        <span className="right-nav-text">{RECEIVE_PATIENT}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={STATIC_ROUTE.PENDING_MEDICAL}>
                        <i className="ti-home">
                          <img className="imageIcon" src={iconDeparment} />
                        </i>
                        <span className="right-nav-text">{PENDING_MEDICAL}</span>
                      </NavLink>
                    </li>
                  </>
                )}

                {accountInfo.roleName === ROLE.DOCTORCLINIC && (
                  <li>
                    <NavLink to={STATIC_ROUTE.DOCTOR_MEDICAL} aria-current={true}>
                      <i className="ti-home">
                        <img src={iconPack} />
                      </i>
                      <span className="right-nav-text">{MEDICAL}</span>
                    </NavLink>
                  </li>
                )}

                <li>
                  <NavLink to={STATIC_ROUTE.PATIENT}>
                    <i className="ti-home">
                      <img src={iconPack} />
                    </i>
                    <span className="right-nav-text">{PATIENT}</span>
                  </NavLink>
                </li>

                {accountInfo.roleName === ROLE.PHARMACIST || accountInfo.roleName === ROLE.DOCTORCLINIC && (
                  <>
                    <li>
                      <NavLink to={STATIC_ROUTE.MEDICINE}>
                        <i className="ti-home">
                          <img src={iconPack} />
                        </i>
                        <span className="right-nav-text">{MEDICINE}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={STATIC_ROUTE.PRESCRIPTION}>
                        <i className="ti-home">
                          <img src={iconPack} />
                        </i>
                        <span className="right-nav-text">{PRESCRIPTION}</span>
                      </NavLink>
                    </li>
                  </>
                )}

                {accountInfo.roleName === ROLE.ADMIN && (
                  <>
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
                  </>
                )}

              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
