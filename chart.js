const dataSource = "data/cleaned-data/line-chart-1.csv";
const chartDiv = document.getElementById("chart-1");

function loadData() {
  Plotly.d3.csv(dataSource, (data) => processData(data));
}

function processData(allRows) {
  let x = [], y1 = [], y2 = [], y3 = [];
  for (let i in allRows) {
    let row = allRows[i];
    x.push(row["Year"]);
    y1.push(row["Northen White Rhino"]);
    y2.push(row["Africa Elephant"]);
    y3.push(row["Whale"]);
  }
  makePlot(x, y1, y2, y3);
}

function makePlot(x, y1, y2, y3) {
  let trace1 = {
    x: x,
    y: y1,
    mode: 'lines+markers',
    name: '大象'
  };

  let trace2 = {
    x: x,
    y: y2,
    mode: 'lines+markers',
    name: '鲸鱼'
  };

  let trace3 = {
    x: x,
    y: y3,
    mode: 'lines+markers',
    name: '犀牛'
  };

  let data = [trace1, trace2, trace3];

  let layout = {
    title: "物种数量变化折线图",
    xaxis: {
      title: "年份"
    },
    yaxis: {
      title: "数量"
    },
    showlegend: true,
    legend: {
      x: 0.9,
      xanchor: "left",
      y: -0.9
    }
  };

  let config = {
    responsive: true,
    scrollZoom: true,
    displayModeBar: false
  };

  Plotly.newPlot(chartDiv, data, layout, config);
}

function updatePlot(species) {
  Plotly.d3.csv(dataSource, (data) => {
    let x = [], y = [];
    for (let i in data) {
      let row = data[i];
      x.push(row["Year"]);
      y.push(row[species]);
    }
    updateTrace(species, x, y);
  });
}

function updateTrace(species, x, y) {
  Plotly.d3.csv(dataSource, (data) => {
    let update = {
      y: [y]
    };
    Plotly.update(chartDiv, update, { traces: findTraceIndex(data, species) });
  });
}

function findTraceIndex(data, species) {
  for (let i in data) {
    if (data[i].name === species) {
      return i;
    }
  }
  return -1;
}

loadData();
