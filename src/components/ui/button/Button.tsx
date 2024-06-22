import React from 'react'
import s from './Button.module.scss'

type ButtonPropsType = {
  title: string
  onClickHandler?: () => void
  disabled?: boolean
}

export const Button = ({ title, onClickHandler, disabled }: ButtonPropsType) => {
  return (
    <button className={s.button} disabled={disabled} onClick={onClickHandler}>
      {title}
    </button>
  );
};
