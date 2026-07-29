import {Outlet} from 'react-router-dom'

import {Header} from 'widgets/header'

import styles from './layout.module.css'

/** Кнопка корзины должна быть на каждой странице — она живёт в общем layout. */
export function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}
