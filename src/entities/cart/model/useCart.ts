import {useContext} from 'react'

import {CartContext, type CartContextValue} from './context'

export function useCart(): CartContextValue {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart используется вне CartProvider')
  }

  return context
}
