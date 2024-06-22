import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../ui/button/Button';
import s from './LocalStorage.module.scss'

export const LocalStorage = () => {
  const initialValue = 0;
  const initialMaxValue = 5;
  const [value, setValue] = useState<number>(initialValue);
  const maxValue = useRef(initialMaxValue);

  useEffect(() => {
    let valueLS = localStorage.getItem('value');
    let maxLSValue = localStorage.getItem("maxValue");
    if (valueLS && maxLSValue) {
      let newValue = JSON.parse(valueLS);
      let newMaxValue = JSON.parse(maxLSValue);
      setValue(newValue);
      maxValue.current = newMaxValue;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("value", JSON.stringify(value));
    localStorage.setItem("maxValue", JSON.stringify(maxValue.current));
  }, [value, maxValue]);

  const isButtonAddDisabled = value === maxValue.current;
  const isButtonResetDisabled = value === 0;
  const limitStyle = maxValue.current === value ? s.maxvalue : "";
  const increase = 1;
  const viasulisation = (100 * value) / maxValue.current;

  const add = () => {
    const valueCounter = value + increase;
    if (valueCounter <= maxValue.current) {
      setValue(valueCounter);
    }
  };

  const reset = () => {
    setValue(0);
    maxValue.current = Math.ceil(Math.random() * 20);
  };

  const clearLS = () => {
    localStorage.clear();
    setValue(0);
    maxValue.current = initialMaxValue;
  }

  const removeLSItem = () => {
    localStorage.removeItem("value");
  }

  return (
    <div className={s.counter__wrapper}>
      <div className={s.maintitle__wrapper}>
        <h2>Counter</h2>
      </div>
      <div className={s.maxvalue__wrapper}>
        <h3>
          Max value: <span className={limitStyle}>{maxValue.current}</span>
        </h3>
      </div>
      <div className={s.value__wrapper}>
        <h1>{value}</h1>
      </div>
      <div className={s.visualisation}>
        <div
          style={{ width: `${viasulisation}%` }}
          className={s.visualisation__inner}
        ></div>
      </div>
      <div className={s.buttonWrapper}>
        <Button
          title="Увеличить"
          onClickHandler={add}
          disabled={isButtonAddDisabled}
        />
        <Button
          title="Сбросить"
          onClickHandler={reset}
          disabled={isButtonResetDisabled}
        />
      </div>
      <div className={s.buttonWrapper}>
        <Button title="Очистить LS" onClickHandler={clearLS} />
        <Button title="Удалить LS Item" onClickHandler={removeLSItem} />
      </div>
    </div>
  );
}
