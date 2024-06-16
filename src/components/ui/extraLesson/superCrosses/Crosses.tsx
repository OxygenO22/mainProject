import React from 'react'
import { SuperCrosses } from './SuperCrosses';

export const Crosses = () => {

  const croses = [
    { id: 1, model: "ADIDAS", size: "XXX" },
    { id: 2, model: "ABIBAS", size: "YYY" },
    { id: 3, model: "PUMA", size: "ZZZ" },
  ];

  return <SuperCrosses croses={croses} />;
}
