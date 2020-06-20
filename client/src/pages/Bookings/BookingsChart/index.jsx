import React from 'react';
import PropTypes from 'prop-types';
import { Bar as BarChart  } from 'react-chartjs-2';

const BOOKINGS_BUCKET = {
  'cheap': 100,
  'normal': 1000,
  'expensive': 2000
}

const BookingsChart = ({ bookings }) => {
  const chartData = { labels: [], datasets: [] };
  let values = [];
  const filteredBookingsCount = bookings.reduce((acc, val) => {
    const { price } = val.event;
    if (price <= BOOKINGS_BUCKET['cheap']) {
      acc['cheap'] += 1;
    } else if (price > BOOKINGS_BUCKET['cheap'] && price < BOOKINGS_BUCKET['expensive']) {
      acc['normal'] += 1;
    } else {
      acc['expensive'] += 1;
    }
    return acc;
  }, {
    'cheap': 0,
    'normal': 0,
    'expensive': 0,
  });

  for (const [key, value] of Object.entries(filteredBookingsCount)) {
    const formattedKey = key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase();
    chartData.labels.push(formattedKey);
    values.push(value);
    chartData.datasets.push({
      label: formattedKey,
      backgroundColor: 'rgba(55, 162, 235, 0.5)',
      borderColor: 'rgba(55, 162, 235, 0.8)',
      hoverBackgroundColor: 'rgba(55, 162, 235, 0.75)',
      hoverBorderColor: 'rgba(55, 162, 235, 1)',
      data: values,
    });
    values = [...values];
    values[values.length - 1] = 0;
  }

  return (
    <BarChart data={chartData} options={{ maintainAspectRatio: true, }} />
  )
}

BookingsChart.propTypes = {
  bookings: PropTypes.array.isRequired,
}

export default BookingsChart;
