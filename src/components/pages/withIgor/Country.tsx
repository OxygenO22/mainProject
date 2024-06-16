import React from 'react';
import {City} from "./City";
import styled from "styled-components";
import { BanknotsType, MoneyType } from './MainWithIgor';

type CountryPropsType = {
    data: MoneyType[]
    setFilterValue: (filterValue:BanknotsType)=>void // давайте подумаем, setFilter -это грузчик, у которого всегда в руках товар
  }

export const Country = ({data,setFilterValue}:CountryPropsType) => {
    // с деструктуризацией пожалуйста
    const setAll=()=>{
        setFilterValue('All')
        // засетаем 'All'
    }

    const setUSD=()=>{
        setFilterValue('USD')
        // засетаем 'USD'
    }

    const setRUB=()=>{
        setFilterValue('RUB')
        // засетаем 'RUB'
    }

   const addMoneyHandler=()=>{
   }
   const removeMoneyHandler=()=>{

   }

    return (
        <Terminal>
            <div>
                <button onClick={setAll}>All</button>
                <button onClick={setUSD}>Dollars</button>
                <button onClick={setRUB}>Rubles</button>
            </div>
            <div>
                {/*сделаем в последнюю очередь*/}
                <button>Положить 100$</button>
                <button >Положить 100р.</button>
                <button >Снять 100$</button>
                <button >Снять 100р.</button>
            </div>
            <City data={data}/>
        </Terminal>
    );
};

const Terminal = styled.span`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  font-size: 30px;
  background-color: #282c34;
`