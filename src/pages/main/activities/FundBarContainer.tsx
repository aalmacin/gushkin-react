import { useGetTodaysActions } from 'graphql/action/useGetTodaysActions';
import React from 'react';
import { FundBar } from './FundBar';
import { useGetCurrentFunds } from './useGetCurrentFunds';

const FundBarContainer = () => {
  const { actions: todaysActions } = useGetTodaysActions();
  const todaysFundChanges = todaysActions.reduce(
    (acc, curr) =>
      acc + curr.activity.fundAmt * (curr.activity.positive ? 1 : -1),
    0
  );

  const { currentFunds } = useGetCurrentFunds();

  return <FundBar todaysFundChanges={todaysFundChanges} currentFunds={currentFunds} />;
};

export default FundBarContainer;