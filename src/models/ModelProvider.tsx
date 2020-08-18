import React from 'react'
import { GetActionsProvider } from './Action/GetActions.provider'
import { GetTodaysActionsProvider } from './Action/GetTodaysActions.provider'
import { GetActivitiesProvider } from './Activity/GetActivities.provider'
import { GetWishesProvider } from './Wish/GetWishes.provider'
import { CartProvider } from './Cart/Cart.provider'
import { GetCurrentFundsProvider } from './Funds/GetCurrentFunds.provider'

export const ModelProvider: React.FC = ({ children }) => {
  return <GetTodaysActionsProvider>
    <GetActionsProvider>
      <GetWishesProvider>
        <GetActivitiesProvider>
          <CartProvider>
            <GetCurrentFundsProvider>
              {children}
            </GetCurrentFundsProvider>
          </CartProvider>
        </GetActivitiesProvider>
      </GetWishesProvider>
    </GetActionsProvider>
  </GetTodaysActionsProvider>
}