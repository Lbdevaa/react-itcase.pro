import {Route, Routes} from 'react-router-dom'

import {CartPage} from 'pages/cart'
import {NotFoundPage} from 'pages/notFound'
import {ProductPage} from 'pages/product'
import {ProductsPage} from 'pages/products'
import {ROUTES} from 'shared/config'

import {Layout} from './layout'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.products} element={<ProductsPage />} />
        <Route path={ROUTES.productPattern} element={<ProductPage />} />
        <Route path={ROUTES.cart} element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
