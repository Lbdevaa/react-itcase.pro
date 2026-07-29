/**
 * Единственная точка доступа к псевдо-API из задания.
 *
 * Сам `src/services/api.js` остаётся нетронутым JavaScript-файлом — его нельзя менять по условию.
 * Типы описаны здесь и навешиваются на импортируемые функции.
 */
import * as api from 'services/api'

import type {Product, Size} from './types'

export type {Product, ProductColor, Size} from './types'

export const getProducts = api.getProducts as () => Promise<Product[]>

/** Реджектится с `Error`, если товара нет. */
export const getProduct = api.getProduct as (id: number | string) => Promise<Product>

export const getSizes = api.getSizes as () => Promise<Size[]>
