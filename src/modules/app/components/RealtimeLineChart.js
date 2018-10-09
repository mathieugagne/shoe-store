import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Chart from 'chart.js';
import styled, { withTheme } from 'styled-components/macro';

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

class RealtimeLineChart extends Component {
  constructor(props) {
    super(props);

    const { data, label, theme, timeFormat } = props;
    this.canvasRef = React.createRef();
    this.chart = null;
    // TODO: add more props to offer better customization
    this.config = {
      type: 'line',
      data: {
        datasets: [
          {
            label,
            lineTension: 0,
            borderColor: theme.primary,
            backgroundColor: theme.primary,
            fill: false,
            pointRadius: 6,
            pointHoverRadius: 9,
            data: data.map(({ x, y }) => ({ x, y })),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          caretSize: 0,
          caretPadding: 16,
          backgroundColor: theme.backgroundContrast,
          titleFontColor: theme.text.color,
          bodyFontColor: theme.text.color,
          displayColors: false,
          callbacks: {
            title: () => null,
            label: ({ yLabel }) => `${yLabel} ${label}`,
          },
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                timeFormat,
              },
              ticks: {
                maxTicksLimit: 5,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 20,
                maxTicksLimit: 5,
              },
              gridLines: {
                drawBorder: false,
                color: theme.backgroundContrast,
                zeroLineColor: theme.backgroundContrast,
              },
            },
          ],
        },
      },
    };
  }

  componentDidMount() {
    this.chart = new Chart(this.canvasRef.current, this.config);
  }

  componentDidUpdate(prevProps) {
    const { data: prevData } = prevProps;
    const { data } = this.props;

    let shouldUpdateChart = false;

    prevData.some(({ id: prevId }) => {
      const firstId = data[0].id;

      if (firstId !== prevId) {
        // All theses mutations on the data and labels arrays are needed to make the line animate
        // from right to left. Chart.js has built-in array functions to track data manipulations.
        this.config.data.datasets[0].data.shift();
        shouldUpdateChart = true;
        return false;
      }

      return true;
    });

    data.slice(this.config.data.datasets[0].data.length).forEach(({ x, y }) => {
      shouldUpdateChart = true;

      this.config.data.datasets[0].data.push({ x, y });
    });

    if (shouldUpdateChart) {
      this.config.data.labels.shift();
      this.config.data.labels.shift();
      this.config.data.labels.push(data[0].x);
      this.config.data.labels.push(data[data.length - 1].x);

      this.chart.update();
    }
  }

  render() {
    return (
      <Root>
        <canvas ref={this.canvasRef} />
      </Root>
    );
  }
}

RealtimeLineChart.defaultProps = {
  label: '',
  timeFormat: 'LTS',
};

RealtimeLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string,
  theme: PropTypes.object.isRequired,
  timeFormat: PropTypes.string,
};

export default withTheme(RealtimeLineChart);
