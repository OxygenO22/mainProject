import React from 'react';
import {CurrentBankomat} from "./CurrentBankomat";
import styled from "styled-components";
import { MoneyType } from './MainWithIgor';

type CityPropsType = {
    data: MoneyType[]
}

export const City = ({data}:CityPropsType) => {


    const mappedMoney = data.map((el: MoneyType, index) => (
        <CurrentBankomat
            key={el.id}
            money={el}
        />
    ))

    return (
        <Wrapper>
            {mappedMoney}
        </Wrapper>
    );
};

const Wrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`