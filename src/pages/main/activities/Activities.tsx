import classes from "./Activities.module.scss";
import React, { useState } from "react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Modal from "complib/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "complib/Loading";
import { displayNormalMoney } from "functions/utils.functions";
import ActivityForm from "./activity-form";
import Streaks from "./streaks";
import { Activity } from "models/Activity/Activity.types";
import { useGetActivities } from "models/Activity/useGetActivities";
import { useMutation } from "@apollo/client";
import { useGetTodaysActions } from "models/Action/useGetTodaysActions";
import { useGetCurrentFunds } from "models/Funds/useGetCurrentFunds";
import { Link } from "react-router-dom";
import { useToast } from "complib/Toast/useToast";
import ActivityList from "./ActivityList";

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
  const activityStreaks: any[] = [];
  const isActivitiesLoaded = true;
  const isWishesLoaded = true;
  const totalPrice = 0;

  const showActivityForm = () => {
    setShowActivityForm(true);
  };

  const closeForm = () => {
    setShowActivityForm(false);
  };

  const getActivityStreaks = (id: any) => {
    return (
      activityStreaks.find((t) => `${t.activityId}` === `${id}`)?.days || []
    );
  };

  if (activitiesLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.ActivityPage}>
      <div className={classes.FundBar}>
        <div>Fund Changes Today: ${displayNormalMoney(todaysFundChanges)}</div>
        <div>Current Funds: ${displayNormalMoney(currentFunds)}</div>
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
