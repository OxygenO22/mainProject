import React from 'react'
import { Header } from '../header/Header'
import { Outlet } from 'react-router-dom'
import s from './Layout.module.scss'

export const Layout = () => {
  return (
    <div className={s.layout__wrapper}>
      <div className={s.layout__inner}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
