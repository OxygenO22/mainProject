import React from 'react'
import { Outlet } from 'react-router-dom'
import s from './Layout.module.scss'
import { PageTitle } from '../../ui/pageTitle/PageTitle'
import { Menu } from '../../ui/menu/Menu'

export const Layout = () => {
  return (
    <div className={s.layout__wrapper}>
      <div className={s.layout__inner}>
        <aside className={s.menu__wrapper}>
          <Menu /> 
        </aside>
        <div className={s.section__wrapper}>
          <PageTitle />
          <div className={s.outlet__wrapper}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
