import React, { useState } from 'react'
import { Button } from '../../ui/button/Button';

type moneyType = {
  banknots: string
  value: number
  number: string
};

type currentMoneyType =  "All" | "Dollars" | "RUBLS";

export const Bank = () => {
  const [money, setMoney] = useState<moneyType[]>([
    { banknots: "Dollars", value: 100, number: " a1234567890" },
    { banknots: "Dollars", value: 50, number: " z1234567890" },
    { banknots: "RUBLS", value: 100, number: " w1234567890" },
    { banknots: "Dollars", value: 100, number: " e1234567890" },
    { banknots: "Dollars", value: 50, number: " c1234567890" },
    { banknots: "RUBLS", value: 100, number: " r1234567890" },
    { banknots: "Dollars", value: 50, number: " x1234567890" },
    { banknots: "RUBLS", value: 50, number: " v1234567890" },
  ]);
  const [currentMoney, setCurrentMoney] = useState<currentMoneyType>("All");

  let filteredBanknotes: moneyType[] = money;

  if (currentMoney === "Dollars") {
      filteredBanknotes = money.filter((current) => current.banknots === "Dollars")
  }
  if (currentMoney === "RUBLS") {
      filteredBanknotes = money.filter(
        (current) => current.banknots === "RUBLS"
      );
  }
  
  const cangeBanknots = (currentMoney: currentMoneyType) => {
    setCurrentMoney(currentMoney);
  };

  return (
    <div>
      <ul>
        {filteredBanknotes.map((data, index) => (
          <li key={index}>
            <span>{"banknots: " + data.banknots + " - "}</span>
            <span>{"value: " + data.value + " - "}</span>
            <span>{"number: " + data.number}</span>
          </li>
        ))}
      </ul>
      <Button onClickHandler={() => cangeBanknots("All")} title="All" />
      <Button onClickHandler={() => cangeBanknots("Dollars")} title="Dollars" />
      <Button onClickHandler={() => cangeBanknots("RUBLS")} title="Rubles" />
    </div>
  );
}
