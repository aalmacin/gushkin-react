import React, { useState } from 'react';
import classes from './MainNav.module.scss';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';

import { faRunning, faHome, faStore, faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import IconLink from 'complib/IconLink/IconLink';
import Logo from './Logo.png'
import Button, { ButtonType } from 'complib/Button';
import { useAuth0 } from '@auth0/auth0-react';

function MainNav() {
  const { isAuthenticated } = useAuth0()
  const [isShow, setIsShow] = useState(false)

  const toggleShow = () => {
    setIsShow(!isShow)
  }

  return (
    <div className={classes.MainNav}>
      <div className={classes.LogoSection}>
        <div className={classes.Logo}>
          <img src={Logo} alt="Main Gushkin Logo" />
        </div>
      </div>
      <div className={classes.Toggle}>
        <Button type={ButtonType.icon} onClick={toggleShow} icon={faAlignJustify} />
      </div>
      <ul className={`${classes.LinkList} ${isShow ? classes.IsShow : classes.IsNotShow}`}>
        <li className={classes.LinkListItem}>
          <IconLink icon={faHome} to="/home">Home</IconLink>
        </li>
        {isAuthenticated &&
          <>
            <li className={classes.LinkListItem}>
              <IconLink icon={faRunning} to="/main">Activities</IconLink>
            </li>
            <li className={classes.LinkListItem}>
              <IconLink icon={faStore} to="/main/store">Store</IconLink>
            </li>
          </>
        }
      </ul>
      <div className={classes.ProfileSection}>
        <ProfileDropdown />
      </div>
    </div>
  );
}

export default MainNav;
