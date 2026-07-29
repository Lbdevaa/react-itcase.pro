import {createContext} from 'react'

import type {CartAction, CartState} from './types'

export type CartContextValue = {
  state: CartState
  dispatch: (action: CartAction) => void
}

export const CartContext = createContext<CartContextValue | null>(null)
