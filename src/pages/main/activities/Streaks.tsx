import { ActionCount } from "graphql/action/Action.types";
import React from "react";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles<{ count: number, positive: boolean; }>(({ count, positive }) => ({
  ActivityStreak: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',

    '@media (max-width: 43rem)': {
      flexDirection: 'column-reverse',
    },
  },
  StreakMsg: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',

    '@media (max-width: 43rem)': {
      marginTop: '2rem',
      marginBottom: '1rem',
    },

    Heading: {
      fontSize: '2rem',
    }
  },
  StreakList: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '2rem',

    '@media (max-width: 43rem)': {
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    },


    StreakListItem: {
      fontSize: '1rem',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '2rem',
      alignItems: 'center',

      '@media (max-width: 43rem)': {
        marginTop: '2rem',
        flexDirection: 'column-reverse',
      }
    },

    DayCount: {
      marginTop: '1rem',
      padding: '1rem',

      '@media (max-width: 43rem)': {
        marginBottom: '1rem',
      },

      backgroundColor: positive && count > 0 && '',
    },
    Positive: {
    },

    Negative: {
      backgroundColor: 'getColor(red)',
    }
  }
}));

export interface StreaksProps {
  readonly positive: boolean,
  activityStreaks: ActionCount[];
}

const Streaks: React.FC<StreaksProps> = ({ positive, activityStreaks = [] }) => {
  const classes = useStyles({ count, positive });
  const getActivityClass = (count: number, positive: boolean) => {
    if (positive) {
      return count > 0 ? classes.Positive : classes.Negative;
    } else {
      return count > 0 ? classes.Negative : classes.Positive;
    }
  };

  return (
    <div className={classes.ActivityStreak}>
      <div className={classes.StreakMsg}>
        <h3 className={classes.Heading}>Streak</h3>
      </div>
      <div className={classes.StreakList}>
        {
          activityStreaks.map(activityStreak =>
            <div className={classes.StreakListItem} key={activityStreak.day} >
              <span className={classes.Day}>{activityStreak.day}</span>
              <div className={`${classes.DayCount} ${getActivityClass(activityStreak.count, positive)}`}>
                <span className={classes.Count}>{activityStreak.count}</span>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Streaks;
