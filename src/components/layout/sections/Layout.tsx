import React from 'react'
import { Header } from '../header/Header'
import { Outlet } from 'react-router-dom'
import s from './Layout.module.scss'
import { PageTitle } from '../../ui/pageTitle/PageTitle'

export const Layout = () => {
  return (
    <div className={s.layout__wrapper}>
      <div className={s.layout__inner}>
        <aside className={s.menu__wrapper}>
          <Header />
        </aside>
        <section className={s.section__wrapper}>
          <div className={s.outlet__wrapper}>
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
}
