import React from 'react'
import s from './CounterOptions.module.scss'
import { Button } from '../../ui/button/Button';
import { OptionType } from './LocalStorage';

type CounterOptionsPropsType = {
  checked: boolean;
  optionMaxValue: number;
  optionValue: number;
  options: boolean;
  isOptionCorrect: boolean;
  changeOptionValue: (option: OptionType) => void;
  isChecked: (checked: boolean) => void;
  setOptionValues: () => void;
  clearLS: () => void;
  removeLSItem: () => void;
};

export const CounterOptions = ({
  checked,
  optionMaxValue,
  optionValue,
  options,
  isOptionCorrect,
  changeOptionValue,
  isChecked,
  setOptionValues,
  clearLS,
  removeLSItem,
}: CounterOptionsPropsType) => {
  const isButtonDecreaseDisabled = checked
    ? optionMaxValue === 0
    : optionValue === 0;
  const isOptionsStyle = options
    ? s.options__wrapper_openned
    : s.options__wrapper_closed;

  const changeOptionValueHandler = (option: OptionType) =>
    changeOptionValue(option);

  const removeLSItemHandler = () => removeLSItem();
  const setOptionValuesHandler = () => setOptionValues();
  const clearLSHandler = () => clearLS();

  return (
    <section className={isOptionsStyle}>
      <div className={s.options__item}>
        <div className={s.options__item_header_wrapper}>
          <h3>LocalStorage options</h3>
        </div>
        <div className={s.options__item_buttons_wrapper}>
          <Button title="Очистить LS" onClickHandler={clearLSHandler} />
          <Button
            title="Удалить LS Value"
            onClickHandler={removeLSItemHandler}
          />
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
              onClickHandler={() => changeOptionValueHandler("+")}
              disabled={isOptionCorrect}
            />
            <Button
              title="-"
              onClickHandler={() => changeOptionValueHandler("-")}
              disabled={isButtonDecreaseDisabled}
            />
            <Button
              title="Set Values"
              onClickHandler={setOptionValuesHandler}
              disabled={isOptionCorrect}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
