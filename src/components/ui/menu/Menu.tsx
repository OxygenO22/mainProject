import React from 'react'
import { MenuData } from './MenuData'
import { NavLink } from 'react-router-dom'
import s from './Menu.module.scss'

export const Menu = () => {
  return (
    <div className={s.menu__wrapper}>
      {MenuData.map((data) => (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? s.button_active
              : s.button
          }
          key={data.id}
          to={data.path}
        >
          {data.name}
        </NavLink>
      ))}
    </div>
  );
}
