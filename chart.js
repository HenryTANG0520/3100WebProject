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

  Plotly.react('line-chart-1', plotData, layout);
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




// 鲸鱼饼图
// 数据来源：https://a-z-animals.com/blog/how-do-whales-die-7-common-causes-of-death-for-whales/
var data = [{
    values: [20, 20, 20, 10, 10, 10, 10],
    labels: ['Ship Strikes', 'Pollution', 'Beaching', 'Predators', 'Illness', 'Starvation', 'Hunting'],
    type: 'pie'
  }];
  
  var layout = {
    title: 'Main Causes of Whale Deaths',
    height: 400,
    width: 300,
    legend: {
        x: 0.5,
        y: -0.1,
        xanchor: 'center',
        yanchor: 'top'
      }
  };
  
  Plotly.newPlot('chart-pie-1', data, layout);
  
// 大象饼图

var data = [{
    values: [33.1, 31.5, 19.9],
    labels: ['Natural Causes', 'Ivory Poaching', 'Human-Elephant Conflicts'],
    type: 'pie'
  }];
  
  var layout = {
    title: 'Main Causes of Elephant Deaths',
    height: 400,
    width: 300,
    legend: {
        x: 0.5,
        y: -0.1,
        xanchor: 'center',
        yanchor: 'top'
      }
  };
  
  Plotly.newPlot('chart-pie-2', data, layout);
// 犀牛饼图
// 数据来源：https://en.wikipedia.org/wiki/Rhinoceros_poaching_in_Southern_Africa
// 

var data_rhino = [{
    values: [80, 20],
    labels: ['Poaching for horns', 'Uncontrolled hunting'],
    type: 'pie'
  }];
  
  var layout_rhino = {
    title: 'Main Causes of Rhino Deaths',
    height: 400,
    width: 300,
    legend: {
        x: 0.5,
        y: -0.1,
        xanchor: 'center',
        yanchor: 'top'
      }
  };
  
  Plotly.newPlot('chart-pie-3', data_rhino, layout_rhino);
  
// 南方犀牛恢复数据


// 引入CSV文件并解析数据
async function loadData() {
  const csvFilePath = 'data/cleaned-data/southern-white-rhinos.csv';
  const response = await fetch(csvFilePath);
  const csvContent = await response.text();
  const data = Plotly.d3.csv.parse(csvContent);
  return data;
}

// 处理数据并绘制折线图
async function createLineChart() {
  const data = await loadData();

  const x = data.map(row => row.Year);
  const y = data.map(row => +row['Southern White Rhino population (AfRSG & other sources, 2019)']);

  const trace = {
    x: x,
    y: y,
    mode: 'lines+markers',
    line: {
      color: 'blue'
    },
    marker: {
      color: 'blue',
      size: 6
    },
    name: 'Southern White Rhino population'
  };

  const layout = {
    title: 'Southern White Rhino Population',
    xaxis: {
      title: 'Year'
    },
    yaxis: {
      title: 'Population'
    }
  };

  Plotly.newPlot('line-chart-2', [trace], layout);
}

// 调用函数绘制折线图
createLineChart();
