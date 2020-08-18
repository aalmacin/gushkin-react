import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './SideNav.module.scss';

function SideNav() {
  return <div className={classes.SideNav}>
    <ul className={classes.SideNavItems}>
      <li className={classes.SideNavItem}><Link to="/">Home</Link></li>
      <li className={classes.SideNavItem}><Link to="/main/activities">Activities</Link></li>
      <li className={classes.SideNavItem}><Link to="/main/store">Store</Link></li>
    </ul>
  </div>
}

export default SideNav;
