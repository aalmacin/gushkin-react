import { PerformActivity } from "models/Action/Action.mutations";
import classes from './Activities.module.scss'
import React, { useState } from "react";
import {
  faPlus,
  faMinus,
  faRunning,
  faCoins,
  faDollarSign,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonType } from "complib/Button";
import Modal from "complib/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "complib/Loading";
import { displayNormalMoney } from "functions/utils.functions";
import Funds from "pages/main/shared/Funds";
import HeaderIcon from "pages/main/shared/HeaderIcon";
import ActivityForm from "./activity-form";
import Streaks from "./streaks";
import TodaysActivities from "./TodaysActivities";
import { Activity } from "models/Activity/Activity.types";
import { useGetActivities } from "models/Activity/useGetActivities";
import { useMutation } from "@apollo/client";
import { useGetTodaysActions } from "models/Action/useGetTodaysActions";
import { useGetCurrentFunds } from "models/Funds/useGetCurrentFunds";

function Activities() {
  const { activities, loading: activitiesLoading } = useGetActivities()

  const [isShowActivityForm, setShowActivityForm] = useState(false);
  const [isShowStreak, setIsShowStreak] = useState(false);
  const { refetch: refetchTodaysActions } = useGetTodaysActions()
  const { refetch: refetchCurrentFunds } = useGetCurrentFunds()
  const [performActivity] = useMutation(PerformActivity, {
    onCompleted: () => {
      refetchTodaysActions()
      refetchCurrentFunds()
    }
  })

  // TODO: Add real pull
  const activityStreaks: any[] = []
  const isActivitiesActionLoading = false
  const isActivitiesLoaded = true
  const isWishesLoaded = true
  const totalPrice = 0

  const addActivity = (activityId: string) => () => {
    performActivity({
      variables: {
        activityId: parseInt(`${activityId}`)
      }
    })
  };

  const showActivityForm = () => {
    setShowActivityForm(true);
  };

  const closeForm = () => {
    setShowActivityForm(false);
  };

  const toggleIsShowStreaks = () => {
    setIsShowStreak(!isShowStreak);
  }

  const getActivityStreaks = (id: any) => {
    return activityStreaks.find(t => `${t.activityId}` === `${id}`)?.days || []
  }

  if (activitiesLoading) {
    return <Loading />
  }

  return (
    
    // <div className={classes.ActivityPage}>
    //   <div className={classes.ActivitiesSection}>
    //     {isShowActivityForm && (
    //       <Modal>
    //         <ActivityForm closeHandler={closeForm} />
    //       </Modal>
    //     )}
    //     <div className={classes.Heading}>
    //       <HeaderIcon icon={faRunning} text="Activities" />
    //       <div>
    //         <Button
    //           onClick={showActivityForm}
    //           type={ButtonType.primary}
    //           icon={faPlus}
    //         />
    //       </div>
    //     </div>
    //     <div className={classes.ShowStreakToggle}>
    //       <div className={classes.StreakToggler} onClick={toggleIsShowStreaks}>{!isShowStreak ? 'Show' : 'Hide'} Streaks {isShowStreak && <span className={classes.Close}><FontAwesomeIcon icon={faTimes} /></span>}</div>
    //     </div>
    //     {isActivitiesLoaded ? (
    //       <ul className={classes.ActivityList}>
    //         {activities.map((activity: Activity) => (
    //           <li key={activity.id} className={classes.Activity}>
    //             <div className={classes.Action}>
    //               {isActivitiesActionLoading ? <Loading /> : <Button
    //                 isSquare
    //                 type={activity.positive ? ButtonType.secondary : ButtonType.red}
    //                 onClick={addActivity(activity.id)}
    //                 icon={activity.positive ? faPlus : faMinus}
    //               >
    //                 <span className={classes.ActivityAmt}>
    //                   $ {displayNormalMoney(activity.fundAmt)}
    //                 </span>
    //               </Button>
    //               }
    //               <span className={classes.ActivityText}>
    //                 {activity.description}
    //               </span>
    //             </div>
    //             {isShowStreak && <Streaks activityStreaks={getActivityStreaks(activity.id)} positive={activity.positive} />}
    //           </li>
    //         ))}
    //       </ul>
    //     ) : (
    //         <Loading isLoading />
    //       )}
    //   </div>
    //   <div className={classes.ActivityDetailsSection}>
    //     <div className={classes.Funds}>
    //       <HeaderIcon icon={faCoins} text="Current Funds" />
    //       <Funds />
    //     </div>
    //     <div className={classes.TotalPrice}>
    //       <HeaderIcon icon={faDollarSign} text="Total Funds Needed" />

    //       {isWishesLoaded ? (
    //         <>
    //           <p className={classes.Description}>
    //             Total Funds needed to buy all wish items:
    //           </p>

    //           <p className={classes.Money}>
    //             $ {displayNormalMoney(totalPrice)}
    //           </p>
    //         </>
    //       ) : (
    //           <Loading isLoading />
    //         )}
    //     </div>
    //     <TodaysActivities />
    //   </div>
    // </div>
    <div>
      <div>

      </div>
    </div>
  );
}

export default Activities;
