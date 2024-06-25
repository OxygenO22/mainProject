import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../ui/button/Button';
import s from './LocalStorage.module.scss'

type OptionType = '+' | '-';

export const LocalStorage = () => {
  const initialValue = 0;
  const initialMaxValue = 5;
  const [value, setValue] = useState(initialValue);
  const [options, isOptions] = useState(false);
  const [optionValue, setOptionValue] = useState(initialValue);
  const [optionMaxValue, setOptionMaxValue] = useState(initialValue);
  const [checked, isChecked] = useState(false);
  const maxValue = useRef(initialMaxValue);

  useEffect(() => {
    let valueLS = localStorage.getItem('value');
    let maxLSValue = localStorage.getItem("maxValue");
    let optionValueLS = localStorage.getItem("optionValue");
    let optionMaxValueLS = localStorage.getItem("optionMaxValue");
    let optionsLS = localStorage.getItem("options");
    let checkedLS = localStorage.getItem("checked");
    if (valueLS && maxLSValue) {
      let newValue = JSON.parse(valueLS);
      let newMaxValue = JSON.parse(maxLSValue);
      setValue(newValue);
      maxValue.current = newMaxValue;
    }
    if (optionValueLS && optionMaxValueLS) {
      let newOptionValue = JSON.parse(optionValueLS);
      let newOptionMaxValue = JSON.parse(optionMaxValueLS);
      setOptionValue(newOptionValue);
      setOptionMaxValue(newOptionMaxValue);
    }
    if (optionsLS) {
      let newOption = JSON.parse(optionsLS);
      isOptions(newOption);
    }
    if (checkedLS) {
      let newChecked = JSON.parse(checkedLS);
      isOptions(newChecked);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("value", JSON.stringify(value));
    localStorage.setItem("maxValue", JSON.stringify(maxValue.current));
    localStorage.setItem("optionValue", JSON.stringify(optionValue));
    localStorage.setItem("optionMaxValue", JSON.stringify(optionMaxValue));
    localStorage.setItem("options", JSON.stringify(options));
    localStorage.setItem("checked", JSON.stringify(checked));
  }, [value, maxValue, optionValue, optionMaxValue, options, checked]);

  const isButtonAddDisabled = value === maxValue.current;
  const isButtonResetDisabled = value === 0;
  const isButtonDecreaseDisabled = checked
    ? optionMaxValue === 0
    : optionValue === 0;
    const isOptionCorrect = optionValue > optionMaxValue;
  const limitStyle = maxValue.current === value ? s.maxvalue : "";
  const limitOptionStyle = isOptionCorrect ? s.maxvalue : "";
  const isOptionsStyle = options
    ? s.options__wrapper_openned
    : s.options__wrapper_closed;
  const increase = 1;
  const viasulisation = (100 * value) / maxValue.current;

  const increaseValue = () => {
    const valueCounter = value + increase;
    if (valueCounter <= maxValue.current) {
      setValue(valueCounter);
    }
  };

  const reset = () => {
    setValue(0);
    maxValue.current = Math.ceil(Math.random() * 20);
  };

  const changeOptionValue = (option: OptionType) => {
    if (checked) {
      const optionValueCounter =
        option === "+" ? optionMaxValue + increase : optionMaxValue - increase;
      setOptionMaxValue(optionValueCounter);
    } else {
      const optionValueCounter =
        option === "+" ? optionValue + increase : optionValue - increase;
      setOptionValue(optionValueCounter);
    }
  };

  const setOptionValues = () => {
    setValue(optionValue);
    maxValue.current = optionMaxValue;
  }

  const openCloseOptions = () => {
    isOptions(!options)
  }

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
      <section className={s.display__section}>
        <div className={s.value__wrapper}>
          <div>
            <h1>
              Value: <span>{value}</span>
            </h1>
          </div>
          {options && (
            <div>
              <h1>
                Option Value: <span>{optionValue}</span>
              </h1>
            </div>
          )}
        </div>
        <div className={s.maxvalue__wrapper}>
          <div>
            <h3>
              <span className={limitStyle}>Max value:</span>{" "}
              <span className={limitStyle}>{maxValue.current}</span>
            </h3>
          </div>
          {options && (
            <div>
              <h3>
                <span className={limitOptionStyle}>Option Max value:</span>{" "}
                <span className={limitOptionStyle}>{optionMaxValue}</span>
              </h3>
            </div>
          )}
        </div>
      </section>
      <section className={s.visualisation__section}>
        <div
          style={{ width: `${viasulisation}%` }}
          className={s.visualisation__inner}
        ></div>
      </section>
      <section className={s.buttons__section}>
        <div className={s.buttonWrapper}>
          <Button
            title="Увеличить"
            onClickHandler={increaseValue}
            disabled={isButtonAddDisabled}
          />
          <Button
            title="Сбросить"
            onClickHandler={reset}
            disabled={isButtonResetDisabled}
          />
          <Button
            title="Опции"
            onClickHandler={openCloseOptions}
            propsStyle={options ? s.button_option : ''}
          />
        </div>
        <section className={isOptionsStyle}>
          <div className={s.options__item}>
            <div className={s.options__item_header_wrapper}>
              <h3>LocalStorage options</h3>
            </div>
            <div className={s.options__item_buttons_wrapper}>
              <Button title="Очистить LS" onClickHandler={clearLS} />
              <Button title="Удалить LS Value" onClickHandler={removeLSItem} />
            </div>
          </div>
          <div className={s.options__item}>
            <div className={s.options__item_header_wrapper}>
              <h3>Values options</h3>
            </div>
            <div className={s.options__item_buttons_wrapper}>
              <div className={s.options__item_input}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => isChecked(!checked)}
                  />
                  <span className={s.input__text}>
                    {checked ? "Option Max Value" : "Option Value"}
                  </span>
                </label>
              </div>
              <div className={s.options__item_buttons_values}>
                <Button
                  title="+"
                  onClickHandler={() => changeOptionValue("+")}
                />
                <Button
                  title="-"
                  onClickHandler={() => changeOptionValue("-")}
                  disabled={isButtonDecreaseDisabled}
                />
                <Button
                  title="Set Values"
                  onClickHandler={setOptionValues}
                  disabled={isOptionCorrect}
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
