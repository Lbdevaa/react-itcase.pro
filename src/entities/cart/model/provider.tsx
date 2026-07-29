import {useEffect, useMemo, useReducer, type ReactNode} from 'react'

import {readCart, writeCart} from '../lib/storage'

import {CartContext} from './context'
import {cartReducer} from './reducer'

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({children}: CartProviderProps) {
  // Ленивая инициализация: корзина восстанавливается из localStorage до первого рендера.
  const [state, dispatch] = useReducer(cartReducer, undefined, readCart)

  useEffect(() => {
    writeCart(state)
  }, [state])

  const value = useMemo(() => ({state, dispatch}), [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
