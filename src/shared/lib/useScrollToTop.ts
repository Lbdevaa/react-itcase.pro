import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'

/**
 * Возвращает прокрутку в начало при переходе между страницами.
 *
 * Реагирует только на смену пути: параметры запроса меняются при работе с фильтрами
 * и выборе цвета, и дёргать прокрутку на каждый такой шаг не нужно.
 */
export function useScrollToTop(): void {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo({top: 0})
  }, [pathname])
}
