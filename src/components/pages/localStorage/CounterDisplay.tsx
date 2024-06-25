import React from 'react'
import s from './CounterDisplay.module.scss'

type CounterDisplayPropsType = {
  value: number;
  maxValue: number;
  optionValue: number;
  optionMaxValue: number;
  options: boolean;
  isOptionCorrect: boolean;
};

export const CounterDisplay = ({
  value,
  maxValue,
  optionValue,
  optionMaxValue,
  options,
  isOptionCorrect,
}: CounterDisplayPropsType) => {
  const limitStyle = maxValue === value ? s.maxvalue : "";
  const limitOptionStyle = isOptionCorrect ? s.maxvalue : "";
  return (
    <section className={s.display__section}>
      <div className={s.value__wrapper}>
        <div>
          <h1>
            Value: <span>{value}</span>
          </h1>
        </div>
        {options && (
          <div>
            <h1 className={limitOptionStyle}>
              Option Value:{" "}
              <span className={limitOptionStyle}>{optionValue}</span>
            </h1>
          </div>
        )}
      </div>
      <div className={s.maxvalue__wrapper}>
        <div>
          <h3>
            <span className={limitStyle}>Max value:</span>{" "}
            <span className={limitStyle}>{maxValue}</span>
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
  );
};
