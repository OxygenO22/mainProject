import React, { useState } from 'react'
import { Country } from './Country';
import { v1 } from 'uuid';

export type BanknotsType = "USD" | "RUB" | "All";
export type MoneyType = {
  banknote: BanknotsType;
  nominal: number;
  id: string;
};

let defaultMoney: MoneyType[] = [
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "RUB", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "RUB", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "RUB", nominal: 100, id: v1() },
];

export const moneyFilter = (
  money: MoneyType[],
  filter: BanknotsType
): MoneyType[] => {
  if (filter === "All") return money;
  return money.filter((el) => el.banknote === filter);
  //если пришел filter со значением 'All', то возвращаем все банкноты
  //return money.filter... ну да, придется фильтровать
};

export const MainWithIgor = () => {
  // убираем заглушки в типизации и вставляем в качестве инициализационного значения defaultMoney
    const [money, setMoney] = useState<MoneyType[]>(defaultMoney)
    const [filterValue, setFilterValue] = useState<BanknotsType>('All')   // по умолчанию указываем все банкноты
 

    // а вот сейчас притормаживаем. И вдумчиво: константа filteredMoney получает результат функции moneyFilter
    // в функцию передаем деньги и фильтр, по которому ихбудем выдавать(ретёрнуть)
    const filteredMoney = moneyFilter(money, filterValue)

    const addMoney = (banknote: BanknotsType) => {
        // Добавление денег сделаем в последнюю очередь, после настройки фильтров и отрисовки денег
    }

    const removeMoney = (banknote: BanknotsType) => {
        // Снятие денег сделаем в последнюю очередь, после настройки фильтров и отрисовки денег
        // const index = money.findIndex
        //  if (index !== -1) {
        //      setMoney(money.filter((el, i) => ...));
        //  }
    }

    return (
      <div>
        <Country
          data={filteredMoney} //отрисовать будем деньги после фильтрации
          setFilterValue={setFilterValue} //useState передаем? Так можно было?!
         
          
        />
      </div>
    );
}

