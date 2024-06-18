import React from 'react'
import { BackButton } from '../../ui/backButton/BackButton'
import s from './NotFound.module.scss'

export const NotFound = () => {
  return (
    <div>
      <h1>This page not found</h1>
      <div className={s.notfound__back}>
        <div className={s.notfound__text_wrapper}>
          <h3>Click button 'Back' to go on previous page:</h3>
        </div>
        <div>
          <BackButton />
        </div>
      </div>
    </div>
  );
};
