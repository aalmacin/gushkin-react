import React, { useState } from 'react';
import classes from './ProfileDropdown.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faHistory } from '@fortawesome/free-solid-svg-icons'
import IconLink from 'components/IconLink';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from 'authentication/LoginButton';
import LogoutButton from 'authentication/LogoutButton';

function ProfileDropdown() {
  const [isShowList, setIsShowList] = useState(false);
  const { isAuthenticated, user } = useAuth0()

  const toggleIsShowList = () => {
    setIsShowList(!isShowList);
  }

  return (
    <div className={classes.Profile} >
      {
        !isAuthenticated ?
          <LoginButton />
          :
          <>
            <div className={`${classes.CurrentUser}  ${isShowList && classes.IsShowList}`} onClick={toggleIsShowList}>
              <span className={classes.Email}>
                {<p>{user ? user?.email : 'Not logged in'}</p>}
              </span>
              <FontAwesomeIcon icon={isShowList ? faAngleUp : faAngleDown} />
            </div>
            {
              isShowList &&
              <ul className={classes.LinkList}>
                <li className={classes.LinkListItem}>
                  <IconLink to="/main/history" icon={faHistory}>History</IconLink>
                </li>
                <li className={classes.LinkListItem}>
                  <LogoutButton />
                </li>
              </ul>
            }
          </>
      }
    </div>
  );
}

export default ProfileDropdown;
