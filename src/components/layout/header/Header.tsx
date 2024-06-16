import React from 'react'
import { Menu } from '../../ui/menu/Menu'
import s from './Header.module.scss'

export const Header = () => {
  return (
    <div className={s.header__wrapper}>
      <Menu />
    </div>
  )
}
