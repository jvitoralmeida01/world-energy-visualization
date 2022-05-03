import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function CountryEnergyMatrixBar({data, options}) {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>);
}