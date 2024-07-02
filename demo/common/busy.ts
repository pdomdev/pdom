import Highcharts from 'highcharts';

// document.getElementById('container').innerText = `Busy ...`;
const container = document.getElementById('container');


const text = document.createElement('div');
text.id = 'text';
container.appendChild(text);

const chartContainer = document.createElement('div');
chartContainer.id = 'chart';
chartContainer.style.width = '100%';
chartContainer.style.flex = '1 1 0';
container.appendChild(chartContainer);

let formatter = Intl.NumberFormat('en', { notation: 'compact' });
let addPointT0, findPrimeTDelta;

const chart = Highcharts.chart('chart', {
    chart: {
        animation: false,
        type: 'scatter',
        events: {
            redraw: function () {
                setTimeout(() => {
                    //if (!addPointT0 || !findPrimeTDelta) return;
                    const series = this.get('addPoint') as Highcharts.Series;
                    const series2 = this.get('findPrime') as Highcharts.Series;
                    // findPrimeTDelta = null;
                    // addPointT0 = null;
                    series2.addPoint([i, findPrimeTDelta], false);
                    series.addPoint([i, performance.now() - addPointT0], false);
                });
            }
        },
    },
    title: {
        text: '',
    },
    subtitle: {
        text: 'Nth Prime Number'
    },
    yAxis: [{
        title: {
            text: 'Prime Number'
        }
    }, {
        title: {
            text: 'CPU Time (ms)'
        },
        softMax: 5000,
        opposite: true
    }],

    xAxis: {
        type: 'linear',
        title: {
            text: 'N<sup>th<sup>',
            useHTML: true
        }
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            marker: {
                enabled: false,
            },
            dataLabels: {
                enabled: true,
                allowOverlap: false,
                animation: false,
                // padding: 20,
                formatter: function () {
                    return `&nbsp;${formatter.format(this.y)}&nbsp;`;
                },
                useHTML: true,
            }
        }
    },
    series: [{
        name: 'Prime Number',
        id: 'primes',
        marker: {
            symbol: 'circle'
        },
        data: [],
        type: 'line',
        yAxis: 0,
        color: '#1F77B4',
    }, {
        name: 'Find Prime Time',
        id: 'findPrime',
        marker: {
            symbol: 'square'
        },
        data: [],
        type: 'line',
        yAxis: 1,
        dataLabels: {
            format: '&nbsp;{y:.0f}ms&nbsp;',
            style: {
                fontSize: '12px',
                fontWeight: 'lighter',
                color: '#FF7F0E'
            },
            useHTML: true
        },
        color: '#FF7F0E',
    },
    {
        name: 'Add Point Time',
        id: 'addPoint',
        marker: {
            symbol: 'triangle'
        },
        data: [],
        type: 'line',
        yAxis: 1,
        dataLabels: {
            format: '&nbsp;{y:.0f}ms&nbsp;',
            style: {
                fontSize: '10px',
                fontWeight: 'lighter',
                color: '#2CA02C'
            },
            useHTML: true
        },
        color: '#2CA02C',
    }]
});

let i = 0;
setInterval(() => {
    const start = performance.now();
    const prime = findNthPrime(i);
    findPrimeTDelta = performance.now() - start;
    text.innerHTML = `${i}<sup>th</sup> Prime number is <b>${prime}</b>`;
    const series = chart.series[0];
    addPointT0 = performance.now();
    series.addPoint([i, prime], true);
    i = i + 2000;
}, 500);

function isPrime(num) {
    if (num <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

//Function to find the nth prime number
function findNthPrime(n) {
    let count = 0;
    let num = 2;
    while (count < n) {
        if (isPrime(num)) {
            count++;
        }
        num++;
    }
    return num - 1;
}








export { }