import {Outlet} from 'react-router-dom'

import {useScrollToTop} from 'shared/lib/useScrollToTop'
import {Header} from 'widgets/header'

import styles from './layout.module.css'

/** Кнопка корзины должна быть на каждой странице — она живёт в общем layout. */
export function Layout() {
  useScrollToTop()

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}
