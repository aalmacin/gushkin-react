import React from 'react'
import { GetActionsProvider } from './Action/GetActions.provider'
import { GetTodaysActionsProvider } from './Action/GetTodaysActions.provider'
import { GetActivitiesProvider } from './Activity/GetActivities.provider'
import { GetWishesProvider } from './Wish/GetWishes.provider'
import { GetCurrentFundsProvider } from './Funds/GetCurrentFunds.provider'

export const ModelProvider: React.FC = ({ children }) => {
  return <GetTodaysActionsProvider>
    <GetActionsProvider>
      <GetWishesProvider>
        <GetActivitiesProvider>
          <GetCurrentFundsProvider>
            {children}
          </GetCurrentFundsProvider>
        </GetActivitiesProvider>
      </GetWishesProvider>
    </GetActionsProvider>
  </GetTodaysActionsProvider>
}