import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { BuchProps } from '../constants/types';
import { Container, Row, Col } from 'react-bootstrap';

type BarChartProps = {
  data: BuchProps | BuchProps[] | null;
};

// Definieren der BarChart-Komponente
const SimpleBarChart: React.FC<BarChartProps> = ({ data }) => {
  if (!data) {
    return (
      <Container fluid>
        <Row
          className="justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <Col className="text-center">
            <h1 className="text-right">Sie müssen nach einem Buch suchen!</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  const dataArray = Array.isArray(data) ? data : [data];
  const chartData = dataArray.map((buch: BuchProps) => ({
    name: buch.titel.titel,
    rating: buch.rating,
  }));

  // Definieren der Farben für die Balken im Diagramm
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
    <Container fluid>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
};

export default SimpleBarChart;
