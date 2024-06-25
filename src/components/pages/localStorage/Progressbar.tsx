import React from 'react'
import s from './Progressbar.module.scss'

type ProgressbarPropsType = {
  value: number;
  maxValue: number;
};

export const Progressbar = ({ value, maxValue }: ProgressbarPropsType) => {
  const progressbar = (100 * value) / maxValue;
  return (
    <div className={s.progressbar__section}>
      <div
        style={{ width: `${progressbar}%` }}
        className={s.progressbar__inner}
      ></div>
    </div>
  );
};
