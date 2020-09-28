import classes from "./Activities.module.scss";
import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "components/Loading";
import ActivityForm from "./activityForm";
import { useGetTodaysActions } from "models/Action/useGetTodaysActions";
import { useGetCurrentFunds } from "models/Funds/useGetCurrentFunds";
import { Link } from "react-router-dom";
import ActivityList from "./ActivityList";
import { useGetActivities } from "./graphql/useGetActivities";

function Activities() {
  const { loading: activitiesLoading } = useGetActivities();

  const [isShowActivityForm, setShowActivityForm] = useState(false);
  const { actions: todaysActions } = useGetTodaysActions();

  const todaysFundChanges = todaysActions.reduce(
    (acc, curr) =>
      acc + curr.activity.fundAmt * (curr.activity.positive ? 1 : -1),
    0
  );

  const { currentFunds } = useGetCurrentFunds();

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
      <div className={classes.FundBar}>
        <div>Fund Changes Today: ${todaysFundChanges}</div>
        <div>Current Funds: ${currentFunds}</div>
      </div>
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
