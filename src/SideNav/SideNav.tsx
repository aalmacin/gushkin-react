import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './SideNav.module.scss';

function SideNav() {
  const { pathname } = useLocation();
  const isActive = (link: string): boolean => {
    if (pathname !== '/' && pathname.endsWith('/')) {
      const check = pathname.substr(0, pathname.length - 1);
      return check === link;
    }
    return pathname === link;
  };
  return <div className={classes.SideNav}>
    <ul className={classes.SideNavItems}>
      <li className={`${classes.SideNavItem} ${isActive('/') && classes.Active}`}><Link to="/">Home</Link></li>
      <li className={`${classes.SideNavItem} ${isActive('/main/activities') && classes.Active}`}><Link to="/main/activities">Activities</Link></li>
      <li className={`${classes.SideNavItem} ${isActive('/main/store') && classes.Active}`}><Link to="/main/store">Store</Link></li>
    </ul>
  </div>;
}

export default SideNav;
