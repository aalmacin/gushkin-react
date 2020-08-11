import React, { useMemo } from "react";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import Loading from "complib/Loading";
import { displayNormalMoney, getNumberFromMicroAmount } from "functions/utils.functions";
import HeaderIcon from "pages/main/shared/HeaderIcon";
import classes from "./TodaysActivities.module.scss";
import { useGetTodaysActions } from "models/Action/useGetTodaysActions";
import moment from 'moment-timezone';
import { Action } from "models/Action/Action.types";

const getTotalFundChanges = (actions: Action[]) => {
  return actions.reduce((acc, curr) => {
    const changeMultiplier = curr.activity.positive ? 1 : -1;
    const change = curr.activity.fundAmt * changeMultiplier
    return acc + change
  }, 0)
}

// TODO: Create super provider
function TodaysActivities() {
  const { actions: todaysActions, loading: todaysActionsLoading } = useGetTodaysActions()
  // TODO
  const totalFundChanges = useMemo(() => getTotalFundChanges(todaysActions), [todaysActions])

  if (todaysActionsLoading) {
    return <Loading />
  }


  return (
    <div className={classes.TodaysActivities}>
      <HeaderIcon icon={faListAlt} text="Today's Activities" />

      <ul className={classes.ActivityHistoryList}>
        <li className={`${classes.ActivityHistoryItem} ${classes.ActivityHistoryHeading}`}>
          <span>Time</span>
          <span>Activity</span>
          <span className={classes.Value}>Amount</span>
        </li>
        {todaysActions.map(todayAction =>
          <li key={todayAction.id}>
            <span className={classes.Time}>{moment(todayAction.actionTimestamp).format("HH:mm")}</span>
            <span>{todayAction.activity.description}</span>
            <span className={`${classes.Value} ${todayAction.activity.positive ? classes.PositiveVal : classes.NegativeVal}`}>{`${todayAction.activity.positive ? '+' : '-'} $${displayNormalMoney(todayAction.activity.fundAmt)}`}</span>
          </li>
        )}
      </ul>
      <div className={classes.FundChange}>
        <span>Fund Change: </span>
        <span className={getNumberFromMicroAmount(totalFundChanges) > 0 ? classes.PositiveVal : classes.NegativeVal}>${displayNormalMoney(totalFundChanges)}</span>
      </div>
    </div>
  );
}

export default TodaysActivities;
