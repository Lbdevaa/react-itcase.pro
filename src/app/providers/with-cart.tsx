import type {ReactNode} from 'react'

import {CartProvider} from 'entities/cart'

export function withCart(children: ReactNode) {
  return <CartProvider>{children}</CartProvider>
}
