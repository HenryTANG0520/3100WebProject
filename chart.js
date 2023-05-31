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


// Whale Pie Chart
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

// Elephant Pie Chart

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

// Rhino Pie Chart

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

// Elephant Map Chart
const csvFilePath1 = 'data/elephant/ivory-trade-2.csv';

//country codes
const countryCodes = {
  'AE': 'United Arab Emirates',
  'AO': 'Angola',
  'AT': 'Austria',
  'AU': 'Australia',
  'BD': 'Bangladesh',
  'BE': 'Belgium',
  'BF': 'Burkina Faso',
  'BI': 'Burundi',
  'BJ': 'Benin',
  'BW': 'Botswana',
  'CA': 'Canada',
  'CD': 'Democratic Republic of the Congo',
  'CF': 'Central African Republic',
  'CG': 'Republic of the Congo',
  'CH': 'Switzerland',
  'CI': 'Ivory Coast',
  'CM': 'Cameroon',
  'CN': 'China',
  'CY': 'Cyprus',
  'CZ': 'Czech Republic',
  'DE': 'Germany',
  'DK': 'Denmark',
  'EE': 'Estonia',
  'EG': 'Egypt',
  'ES': 'Spain',
  'IE': 'Ireland',
  'IL': 'Israel',
  'IN': 'India',
  'IT': 'Italy',
  'JO': 'Jordan',
  'JP': 'Japan',
  'KE': 'Kenya',
  'KH': 'Cambodia',
  'KR': 'South Korea',
  'LA': 'Laos',
  'LK': 'Sri Lanka',
  'LV': 'Latvia',
  'ML': 'Mali',
  'MM': 'Myanmar',
  'MO': 'Macao',
  'MT': 'Malta',
  'MW': 'Malawi',
  'MX': 'Mexico',
  'MY': 'Malaysia',
  'MZ': 'Mozambique',
  'NA': 'Namibia',
  'NG': 'Nigeria',
  'NL': 'Netherlands',
  'NO': 'Norway',
  'NP': 'Nepal',
  'NZ': 'New Zealand',
  'PA': 'Panama',
  'PH': 'Philippines',
  'PL': 'Poland',
  'PT': 'Portugal',
  'QA': 'Qatar',
  'RO': 'Romania',
  'RW': 'Rwanda',
  'SA': 'Saudi Arabia',
  'SD': 'Sudan',
  'SE': 'Sweden',
  'SG': 'Singapore',
  'SI': 'Slovenia',
  'SN': 'Senegal',
  'SS': 'South Sudan',
  'TD': 'Chad',
  'TG': 'Togo',
  'TH': 'Thailand',
  'TN': 'Tunisia',
  'TR': 'Turkey',
  'TW': 'Taiwan',
  'TZ': 'Tanzania',
  'UG': 'Uganda',
  'US': 'United States',
  'VN': 'Vietnam',
  'ZA': 'South Africa',
  'ZM': 'Zambia',
  'ZW': 'Zimbabwe'
}

// to parse csv file
function parseCSV(text) {
  let lines = text.split('\n');
  let headers = lines[0].split(',');
  let data = lines.slice(1).map(line => {
    let obj = {};
    let row = line.split(',');
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
  return data;
}

// to fetch csv file
fetch(csvFilePath1)
  .then(response => response.body)
  .then(body => {
    const reader = body.getReader();
    return new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({
            done,
            value
          }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            push();
          })
        }
        push();
      }
    });
  })
  .then(stream => {
    return new Response(stream, {
      headers: {
        "Content-Type": "text/csv"
      }
    }).text();
  })
  .then(text => {
    let data = parseCSV(text);

    // change country codes to country names
    data.forEach(row => {
      if (countryCodes[row['Country']]) {
        row['Country'] = countryCodes[row['Country']];
      }
    });

    let plotData = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: data.map(row => row['Country']),
      z: data.map(row => row['Total']),
      text: data.map(row => row['Country']),
      zmin: 0,
      zmax: Math.max(...data.map(row => row['Total'])),
      colorscale: [
        [0, '#e0f8e0'],
        [1, '#2d6d2c']
      ],
      autocolorscale: false
    }];


    let layout = {
      title: 'Global Ivory Trade Map',
      width: 1000,
      height: 500,
      geo: {
        projection: {
          type: 'robinson'
        },
        showocean: true,
        oceancolor: 'lightblue',
        showcountries: false,
      }
    };

    Plotly.newPlot('map', plotData, layout);
  });



// Rhino Line Chart

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