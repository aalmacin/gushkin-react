import React from 'react';
import { GetActionsProvider } from './Action/GetActions.provider';
import { GetTodaysActionsProvider } from './Action/GetTodaysActions.provider';
import { GetActivitiesProvider } from './Activity/GetActivities.provider';
import { GetCurrentFundsProvider } from './Funds/GetCurrentFunds.provider';

export const ModelProvider: React.FC = ({ children }) => {
  return <GetTodaysActionsProvider>
    <GetActionsProvider>
      <GetActivitiesProvider>
        <GetCurrentFundsProvider>
          {children}
        </GetCurrentFundsProvider>
      </GetActivitiesProvider>
    </GetActionsProvider>
  </GetTodaysActionsProvider>;
};