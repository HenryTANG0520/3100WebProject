// Path to CSV files
const csvFilePath1 = 'data/cleaned-data/line-chart-1.csv';
const csvFilePath2 = 'data/cleaned-data/southern-white-rhinos.csv';

// Function to update plot based on button value
function updatePlot(species) {
  Plotly.d3.csv(csvFilePath1, async function(data) {

    const plotData = [];

    plotData.push(getTrace(data, species));

    const layout = {
      title: '物种数量变化折线图',
      xaxis: { title: '年份' },
      yaxis: { title: '数量' },
      height: '100%' // 图表高度设置为 '100%'，使其占满容器
    };

    Plotly.react('line-chart-1', plotData, layout);
  });
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

// Update the plot with default value
updatePlot('Northen White Rhino');

// 犀牛折线图
Plotly.d3.csv(csvFilePath2, function(data) {
  const x = data.map(row => row.Year);
  const y = data.map(row => +row['Southern White Rhino population (AfRSG & other sources, 2019)']);

  const trace = {
    x: x,
    y: y,
    mode: 'lines+markers',
    line: {
      color: '#F5DEB3'
    },
    marker: {
      color: '#D2B48C',
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
});

// 鲸鱼饼图
var data = [{
    values: [20, 20, 20, 10, 10, 10, 10],
    labels: ['Ship Strikes', 'Pollution', 'Beaching', 'Predators', 'Illness', 'Starvation', 'Hunting'],
    type: 'pie',
    marker:{
      colors:['#8a8a8a','#ababab','#c0c0c0','#cbcbcb','#dedede','#f0f0f0','#B22222']
    }
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
    type: 'pie',
    marker:{
      colors:['#aaa','#B22222','#ccc']
    }
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

var data_rhino = [{
    values: [80, 20],
    labels: ['Poaching for horns', 'Uncontrolled hunting'],
    type: 'pie',
    marker:{
      colors:['#B22222','a0a0a0']
    }
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
