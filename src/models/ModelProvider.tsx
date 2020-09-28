import React from 'react';
import { GetActionsProvider } from './Action/GetActions.provider';
import { GetTodaysActionsProvider } from './Action/GetTodaysActions.provider';

export const ModelProvider: React.FC = ({ children }) => {
  return <GetTodaysActionsProvider>
    <GetActionsProvider>
      {children}
    </GetActionsProvider>
  </GetTodaysActionsProvider>;
};