import React, { useEffect, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { useApi } from '~/hooks/useGetApi';
import { https, host, port, rest } from '../constants';
import type { BuchProps } from '~/types';

const SimpleBarChart = () => {
  const { data, request: requestFunction } = useApi(
    `${https}${host}${port}${rest}`,
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const request = useCallback(requestFunction, []);
  useEffect(() => {
    request();
  }, [request]);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Umwandeln der Daten in das richtige Format für das Diagramm
  const chartData = (data as BuchProps[]).map((buch: any) => ({
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
  ]; // Fügen Sie so viele Farben hinzu, wie Sie benötigen

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
          width={900} // Erhöhen Sie die Breite
          height={600} // Erhöhen Sie die Höhe
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
