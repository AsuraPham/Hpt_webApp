import * as React from 'react';
import '../css/topbar.css';
import { logo, menuic, avatar } from '../common/const/image-const';
import { STATIC_ROUTE } from '../common/Constants';

const TopBarComponet = (props: { toogleClass: any; }) => {
  return(
  <nav className='admin-header navbar navbar-default col-lg-12 col-12 p-0 fixed-top d-flex flex-row'>
    <div className='text-left navbar-brand-wrapper'>
      <a className='navbar-brand brand-logo' href={STATIC_ROUTE.HOME}>
        <img src={logo} alt='Logo' />
      </a><a className='navbar-brand brand-logo-mini' href='#/'><img src='assets/images/logo-icon-dark.png' alt='' /></a></div>
    <ul className='nav navbar-nav mr-auto'>
      <li className='nav-item'><a className='button-toggle-nav inline-block ml-20 pull-left' onClick={props.toogleClass}>
        <i className='zmdi zmdi-menu ti-align-right'>
          <img src={menuic} alt='menuic' />
        </i></a></li>
    </ul>
    <ul className='nav navbar-nav ml-auto'>
      <li className='nav-item fullscreen'><a id='btnFullscreen' className='nav-link'><i className='ti-fullscreen'></i></a></li>
      <li className='nav-item dropdown mr-30'>
        <a className='nav-link nav-pill user-avatar' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'>
          <img src={avatar} alt='avatar' /></a>
        <div className='dropdown-menu dropdown-menu-right'>
          <div className='dropdown-header'>
            <div className='media'>
              <div className='media-body'>
                <h5 className='mt-0 mb-0'>{""}</h5>
                <span className='txt-email-user'>{""}</span>
              </div>
            </div>
          </div>
          <div className='dropdown-divider'></div>
          <a className='dropdown-item' href='#' onClick={() =>{}} >
            <i className='text-danger ti-unlock'></i>Logout</a>
        </div>
      </li>
    </ul>
  </nav>
);
}

export default TopBarComponet;
