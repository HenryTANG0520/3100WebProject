// Path to CSV file
const csvFilePath = 'data/cleaned-data/line-chart-1.csv';

// Function to read CSV and parse data
async function readLineChartCSV() {
  const response = await fetch(csvFilePath);
  const csvContent = await response.text();
  const data = Plotly.d3.csv.parse(csvContent);
  return data;
}

// Function to update plot based on button value
async function updatePlot(buttonValue) {
  const data = await readLineChartCSV();

  const speciesMap = { 1: 'Northen White Rhino', 2: 'Africa Elephant', 3: 'Whale' };
  const species = speciesMap[buttonValue];

  const plotData = [];

  if (species) {
    plotData.push(getTrace(data, species));
  } else {
    for (let key in speciesMap) {
      plotData.push(getTrace(data, speciesMap[key]));
    }
  }

  const layout = {
    title: '物种数量变化折线图',
    xaxis: { title: '年份' },
    yaxis: { title: '数量' },
    height: '100%' // 图表高度设置为 '100%'，使其占满容器
  };

  Plotly.react('chart-1', plotData, layout);
}

// Function to generate trace for a species
function getTrace(data, species) {
  const x = [];
  const y = [];

  data.forEach(row => {
    if (row[species]) {
      x.push(row.Year);
      y.push(+row[species]);
    }
  });

  return {
    x: x,
    y: y,
    mode: 'lines+markers',
    name: species
  };
}

// Initialize the plot with default value (0)
updatePlot(0);
