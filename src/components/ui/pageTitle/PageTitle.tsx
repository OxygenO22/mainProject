import React from 'react'
import s from './PageTitle.module.scss'
import { PageTitleType } from '../../../types/common';
import { useLocation } from 'react-router-dom';


export const PageTitle = () => {

  const mainPageTitle = "ToDo Main";
  const location =  useLocation().pathname;
  const titleName =
    location === "/"
      ? mainPageTitle
      : location
          .split("")
          .filter((el) => el !== "/")
          .join("");
  return (
    <div className={s.title__wrapper}>
      <h1 className={s.title}>{titleName}</h1>
    </div>
  );
};
