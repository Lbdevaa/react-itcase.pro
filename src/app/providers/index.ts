import type {ReactNode} from 'react'

import {withCart} from './with-cart'
import {withRouter} from './with-router'

/** Порядок важен: корзина живёт внутри роутера, чтобы её ссылки знали о навигации. */
const PROVIDERS = [withCart, withRouter]

export function withProviders(children: ReactNode): ReactNode {
  return PROVIDERS.reduce<ReactNode>((tree, provider) => provider(tree), children)
}
