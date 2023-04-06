import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  //   Tooltip,
  //   Legend, // legend for the chart
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useMediaQuery } from '@mui/material';
import { selectCurrentCategoryChart } from 'redux/transaction/transactionSelectors';
import css from './bar-chart.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  //   Tooltip
  //   Legend, // legend for the chart
  ChartDataLabels
);

const BarChart = () => {
  const screenMobile = useMediaQuery('(max-width: 767.9px)');
  const dataChart = useSelector(selectCurrentCategoryChart);

  if (Boolean(dataChart) === false) {
    return;
  } else {
    const { labelsName, labelsValue } = dataChart;

    // eslint-disable-next-line no-undef
    const data = {
      labels: labelsName,
      datasets: [
        {
          // label: 'Name Legend', // legend for the chart
          data: labelsValue,
          backgroundColor: ['#FF751D', '#FFDAC0', '#FFDAC0'],
          borderRadius: 10,
          barThickness: 38,
        },
      ],
      plugins: [ChartDataLabels],
    };

    let options;
    // eslint-disable-next-line no-lone-blocks
    {
      screenMobile
        ? (options = {
            responsive: true,
            layout: {
              autoPadding: true,
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                fontColor: '00ffff',
              },
            },
            indexAxis: 'y',
            scales: {
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#52555F',
                  font: {
                    family: 'Roboto',
                    size: 12,
                    weight: 400,
                    lineHeight: 1.167,
                  },
                },
                border: {
                  color: '#F5F6FB',
                  width: 2,
                },
              },
              x: {
                suggestedMax: labelsValue[0] * 1.15,
                grid: {
                  display: false,
                  color: '#F5F6FB',
                  drawOnChartArea: true,
                  drawTicks: false,
                  lineWidth: 2,
                  offset: true,
                },
                ticks: {
                  display: false,
                  maxTicksLimit: 20,
                  count: labelsValue[0] / 150,
                  backdropPadding: {
                    x: 100,
                    y: 4,
                  },
                },
                border: {
                  display: false,
                },
              },
            },
            plugins: {
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#52555F',
                clamp: true,
                // eslint-disable-next-line no-dupe-keys
                anchor: 'end',
                // eslint-disable-next-line no-dupe-keys
                align: 'end',
                clip: true,
                labels: {
                  title: {
                    font: {
                      family: 'Roboto',
                      size: 12,
                      weight: 400,
                      lineHeight: 1.167,
                    },
                  },
                },
                formatter: (value, context) => {
                  return value?.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'UAH',
                    currencyDisplay: 'code',
                    useGrouping: true,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  });
                },
              },
            },
          })
        : (options = {
            responsive: true,
            layout: {
              autoPadding: true,
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                fontColor: '00ffff',
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#52555F',
                  font: {
                    family: 'Roboto',
                    size: 12,
                    weight: 400,
                    lineHeight: 1.167,
                  },
                  padding: 4,
                },
                border: {
                  color: '#F5F6FB',
                  width: 2,
                },
              },
              y: {
                suggestedMax: labelsValue[0] * 1.1,
                grid: {
                  display: false,
                  color: '#F5F6FB',
                  drawOnChartArea: true,
                  drawTicks: false,
                  lineWidth: 2,
                  offset: true,
                },
                ticks: {
                  display: false,
                  maxTicksLimit: 20,
                  count: labelsValue[0] / 150,
                },
                border: {
                  display: false,
                },
              },
            },
            plugins: {
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#52555F',
                clamp: true,
                clip: true,
                labels: {
                  title: {
                    font: {
                      family: 'Roboto',
                      size: 12,
                      weight: 400,
                      lineHeight: 1.167,
                    },
                  },
                },
                formatter: (value, context) => {
                  return value?.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'UAH',
                    currencyDisplay: 'code',
                    useGrouping: true,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  });
                },
              },
            },
          });
    }

    return (
      <Bar data={data} options={options} className={css['barChartContainer']} />
    );
  }
};

export default BarChart;
