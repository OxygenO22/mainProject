import React from 'react'
import s from './Button.module.scss'

type ButtonPropsType = {
  title: string
  onClickHandler?: () => void
  disabled?: boolean
  propsStyle?: string
}

export const Button = ({
  title,
  onClickHandler,
  disabled,
  propsStyle,
}: ButtonPropsType) => {
  return (
    <button className={propsStyle ? propsStyle : s.button} disabled={disabled} onClick={onClickHandler}>
      {title}
    </button>
  );
};
