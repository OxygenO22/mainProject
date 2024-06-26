import React from 'react'
import s from './PageTitle.module.scss'
import { PageTitleType } from '../../../types/common';


export const PageTitle = ({ pageTitle }: PageTitleType) => {
  return (
    <div className={s.title__wrapper}>
      <h1 className={s.title}>{pageTitle}</h1>
    </div>
  );
};
