import React from 'react'
import { GetActionsProvider } from './Action/GetActions.provider'
import { GetTodaysActionsProvider } from './Action/GetTodaysActions.provider'
import { GetActivitiesProvider } from './Activity/GetActivities.provider'
import { GetWishesProvider } from './Wish/GetWishes.provider'
import { CartProvider } from './Cart/Cart.provider'

export const ModelProvider: React.FC = ({ children }) => {
  return <GetTodaysActionsProvider>
    <GetActionsProvider>
      <GetWishesProvider>
        <GetActivitiesProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </GetActivitiesProvider>
      </GetWishesProvider>
    </GetActionsProvider>
  </GetTodaysActionsProvider>
}