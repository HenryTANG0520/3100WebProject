// Path to CSV files
const csvFilePaths = {
  'Elephant': 'data/cleaned-data/elephant.csv',
  'Rhino': 'data/cleaned-data/rhino.csv',
  'Whale': 'data/cleaned-data/whale.csv'
};


// Function to update plot based on button value
function updatePlot(animal) {
  let csvFilePath = csvFilePaths[animal];

  Plotly.d3.csv(csvFilePath, function (data) {
    const plotData = [];
    let columnNames = Object.keys(data[0]);

    for (let i = 1; i < columnNames.length; i++) {
      let species = columnNames[i];
      if (species !== 'Year') {
        plotData.push(getTrace(data, 'Year', species));
      }
    }

    const layout = {
      title: animal + ' Species Quantity Change Line Chart',
      xaxis: {
        title: 'Year'
      },
      yaxis: {
        title: 'Quantity'
      },
      height: '100%' // Set the height of the chart to '100%' so that it fills the container
    };

    Plotly.react('line-chart-1', plotData, layout);
  });
}

// Function to generate trace for a species
function getTrace(data, xColumn, yColumn) {
  const x = [];
  const y = [];

  data.forEach(row => {
    x.push(row[xColumn]);
    y.push(+row[yColumn]);
  });

  return {
    x: x,
    y: y,
    mode: 'lines+markers',
    name: yColumn
  };
}

// Update the plot with default value
updatePlot('Whale');


// 鲸鱼饼图
var data = [{
  values: [20, 20, 20, 10, 10, 10, 10],
  labels: ['Ship Strikes', 'Pollution', 'Beaching', 'Predators', 'Illness', 'Starvation', 'Hunting'],
  type: 'pie',
  marker: {
    colors: ['#8a8a8a', '#ababab', '#c0c0c0', '#cbcbcb', '#dedede', '#f0f0f0', '#B22222']
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
  marker: {
    colors: ['#aaa', '#B22222', '#ccc']
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
  labels: ['Horn Poaching', 'Uncontrolled hunting'],
  type: 'pie',
  marker: {
    colors: ['#B22222', 'a0a0a0']
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


// 犀牛折线图

const csvFilePath2 = 'data/cleaned-data/southern-white-rhinos.csv';

Plotly.d3.csv(csvFilePath2, function (data) {
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