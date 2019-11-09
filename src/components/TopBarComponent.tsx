import * as React from "react";

import { logoAdmin, menuic, avatar } from "../common/const/image-const";
import adalContext from "../common/authConfig";
import { ACCOUNT_INFO, STATIC_ROUTE } from "../common/Constants";

import "../css/topbar.css";

const accountInfo: any =
  JSON.parse(localStorage.getItem(ACCOUNT_INFO) || "{}") || {};

export const TopBarComponet = ({ userInfo, toogleClass }) => (
  <nav className="admin-header navbar navbar-default col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div className="text-left navbar-brand-wrapper">
      <a className="navbar-brand brand-logo" href={STATIC_ROUTE.HOME}>
        <img src={logoAdmin} alt="Logo" />
      </a>
      <a className="navbar-brand brand-logo-mini" href="#/">
        <img src="assets/images/logo-icon-dark.png" alt="" />
      </a>
    </div>
    <ul className="nav navbar-nav mr-auto">
      <li className="nav-item">
        <a
          className="button-toggle-nav inline-block ml-20 pull-left"
          onClick={toogleClass}
        >
          <i className="zmdi zmdi-menu ti-align-right">
            <img src={menuic} alt="menuic" />
          </i>
        </a>
      </li>
    </ul>
    <ul className="nav navbar-nav ml-auto">
      <li className="nav-item fullscreen">
        <a id="btnFullscreen" className="nav-link">
          <i className="ti-fullscreen"></i>
        </a>
      </li>
      <li className="nav-item dropdown mr-30">
        <a
          className="nav-link nav-pill user-avatar"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src={
              (userInfo ? userInfo.profileUrl : accountInfo.profileUrl) ||
              avatar
            }
            alt="avatar"
          />
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <div className="dropdown-header">
            <div className="media">
              <div className="media-body">
                <h5 className="mt-0 mb-0">
                  {userInfo && userInfo.fullName
                    ? userInfo.fullName
                    : accountInfo.fullName}
                </h5>
                <span className="txt-email-user">
                  {userInfo && userInfo.email
                    ? userInfo.email
                    : accountInfo.email}
                </span>
              </div>
            </div>
          </div>
          <div className="dropdown-divider"></div>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => adalContext.LogOut()}
          >
            <i className="text-danger ti-unlock">Log out</i>
          </a>
        </div>
      </li>
    </ul>
  </nav>
);
export default TopBarComponet;
