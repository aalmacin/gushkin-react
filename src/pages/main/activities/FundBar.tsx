import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  FundBar: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12,
    fontFamily: "Noto Sans",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: '27px',
    color: '#000000',
    justifyContent: 'space-between'
  }
});

export type FundBarProps = {
  todaysFundChanges: number,
  currentFunds: number;
};

const FundBar: React.FC<FundBarProps> = ({ todaysFundChanges, currentFunds }) => {
  const classes = useStyles();
  return <div className={classes.FundBar}>
    <div>Fund Changes Today: ${todaysFundChanges}</div>
    <div>Current Funds: ${currentFunds}</div>
  </div>;
};

export default FundBar;