import React from 'react';
import { GetActionsProvider } from './Action/GetActions.provider';
import { GetTodaysActionsProvider } from './Action/GetTodaysActions.provider';
import { GetCurrentFundsProvider } from './Funds/GetCurrentFunds.provider';

export const ModelProvider: React.FC = ({ children }) => {
  return <GetTodaysActionsProvider>
    <GetActionsProvider>
      <GetCurrentFundsProvider>
        {children}
      </GetCurrentFundsProvider>
    </GetActionsProvider>
  </GetTodaysActionsProvider>;
};