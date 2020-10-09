import classes from "./Activities.module.scss";
import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "components/Loading";
import { Link } from "react-router-dom";
import ActivityList from "./activities/ActivityListContainer";
import { useGetActivities } from "./activities/graphql/useGetActivities";
import FundBar from "./activities/FundBarContainer";
import ActivityForm from "./activities/ActivityForm";

function Activities() {
  const { loading: activitiesLoading } = useGetActivities();

  const [isShowActivityForm, setShowActivityForm] = useState(false);

  // TODO: Add real pull
  const isActivitiesLoaded = true;

  const showActivityForm = () => {
    setShowActivityForm(true);
  };

  const closeForm = () => {
    setShowActivityForm(false);
  };

  if (activitiesLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.ActivityPage}>
      <FundBar />
      <div className={classes.ActivityBody}>
        <div className={classes.ActivityNav}>
          <div className={classes.NavItems}>
            <Link className={classes.ActiveNavItem} to="/main/activities">
              Home
            </Link>
            <Link to="/main/activities/today">Todays Activities</Link>
            <Link to="/main/activities/streaks">Streaks</Link>
          </div>
          <div className={classes.CreateActivity}>
            {isShowActivityForm && (
              <Modal>
                <ActivityForm closeHandler={closeForm} />
              </Modal>
            )}
            <button onClick={showActivityForm}>
              <FontAwesomeIcon icon={faPlus} /> Create Activity
            </button>
          </div>
        </div>
        {isActivitiesLoaded ? <ActivityList /> : <Loading isLoading />}
      </div>
    </div>
  );
}

export default Activities;
