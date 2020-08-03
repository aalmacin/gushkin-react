import React from "react";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import Loading from "complib/Loading";
import { convertEpochToHour, displayNormalMoney, getNumberFromMicroAmount } from "functions/utils.functions";
import HeaderIcon from "pages/main/shared/HeaderIcon";
import classes from "./TodaysActivities.module.scss";

function TodaysActivities() {
  // TODO
  const todaysActivities: any[] = []
  const isTodaysActivitiesLoaded = false
  const totalFundChanges = 0

  if (!isTodaysActivitiesLoaded) {
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
        {todaysActivities.map(todayActivity =>
          <li key={todayActivity.timestamp} className={classes.ActivityHistoryItem}>
            <span className={classes.Time}>{convertEpochToHour(todayActivity.timestamp)}</span>
            <span>{todayActivity.description}</span>
            <span className={`${classes.Value} ${todayActivity.positive ? classes.PositiveVal : classes.NegativeVal}`}>{`${todayActivity.positive ? '+' : '-'} $${displayNormalMoney(todayActivity.fundAmt)}`}</span>
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
