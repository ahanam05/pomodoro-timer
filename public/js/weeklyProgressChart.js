const data = [
    { day: 'Monday', mins: 30 },
    { day: 'Tuesday', mins: 120 },
    { day: 'Wednesday', mins: 150 },
    { day: 'Thursday', mins: 200 },
    { day: 'Friday', mins: 170 },
    { day: 'Saturday', mins: 100 },
    { day: 'Sunday', mins: 30 }
  ];

  Plotly.newPlot('weeklyProgressChart', [
    {
      x: data.map(row => row.day),
      y: data.map(row => row.mins),
      type: 'bar'
    }
  ], {
    title: 'Weekly Progress',
    xaxis: { title: 'Day' },
    yaxis: { title: 'Minutes focused' }
  });