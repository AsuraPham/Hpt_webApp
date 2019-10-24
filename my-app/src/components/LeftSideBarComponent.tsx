import * as React from 'react';
import '../css/sidebar.css';
import { iconDashboard, iconDevice, iconUsers, iconPack, bell } from '../common/const/image-const';
import { NavLink } from 'react-router-dom'
import { STATIC_ROUTE } from '../common/Constants';
import { DASHBOARD, DEVICE, USERS, SOFTWARE_PACKAGES, NOTIFICATION } from '../common/const/menu';
export const LeftSideBarComponent = () => (
  <div className='side-menu-fixed'>
    <div className='scrollarea scrollbar side-menu-bg' style={{ overflow: 'hidden' }}>
      <div className='scrollarea-content saidbar' style={{ margin: 0 }}>
        <div className='saidbar'>
          <ul className='nav navbar-nav side-menu' id='sidebarnav'>
            <li><NavLink to={STATIC_ROUTE.HOME} aria-current={true}><i className='ti-home'>
              <img src={iconDashboard} /></i><span className='right-nav-text'>{DASHBOARD}</span></NavLink></li>
            <li><NavLink to={STATIC_ROUTE.DEVICE} >
              <i className='ti-home'><img src={iconDevice} /></i>
              <span className='right-nav-text'>{DEVICE}</span></NavLink></li>
            <li><NavLink to={STATIC_ROUTE.USER} activeClassName='active'><i className='ti-home'><img src={iconUsers} />
            </i><span className='right-nav-text'>{USERS}</span></NavLink></li>
            <li><NavLink to={STATIC_ROUTE.NOTIFICATION} ><i className='ti-home'><img src={bell} />
            </i><span className='right-nav-text'>{NOTIFICATION}</span></NavLink></li>
            <li><NavLink to={STATIC_ROUTE.SOFTWARE}><i className='ti-home'><img src={iconPack} /></i><span className='right-nav-text'>
              {SOFTWARE_PACKAGES}</span></NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default LeftSideBarComponent;