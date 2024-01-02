import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BuchProps } from '~/types';

type BarChartProps = {
  data: BuchProps | BuchProps[] | null;
};

const SimpleBarChart: React.FC<BarChartProps> = ({ data }) => {

  if (!data) {
    return <div>Loading...</div>;
  }

  const dataArray = Array.isArray(data) ? data : [data];
  const chartData = dataArray.map((buch: BuchProps) => ({
    name: buch.titel.titel,
    rating: buch.rating,
  }));

  const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>
        <h1>Bücher Rating</h1>
        <BarChart
          width={900}
          height={600}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="rating">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default SimpleBarChart;