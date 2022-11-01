import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

import colors from 'tailwindcss/colors';
import clsx from 'clsx';

Chart.register(ArcElement);

/**
 *
 * @param {Integer} percentage (number from 0 to 100)
 * @returns {Doughnut}
 */
const AttendOmeter = ({ percentage, className }) => (
  <div className="w-full flex justify-center items-center relative">
    <Doughnut
      className={clsx('w-full max-h-80', className)}
      data={{
        labels: ['Green', 'Red'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [percentage, 100 - percentage],
            backgroundColor: [colors.green[500], colors.red[500]],
            hoverOffset: 4,
          },
        ],
      }}
      options={{
        rotation: 240,
        circumference: 240,
        layout: {
          padding: {
            top(ctx) {
              const { chart } = ctx;
              let pb = 0;
              chart.data.datasets.forEach((el) => {
                const hOffset = el.hoverOffset || 0;
                pb = Math.max(hOffset / 2, pb);
              });
              return pb;
            },
          },
        },
      }}
    />
    <div className={clsx('absolute top-[50%] font-normal', className)}>
      {percentage}
      %
    </div>
  </div>
);

AttendOmeter.propTypes = {
  percentage: PropTypes.number.isRequired,
  className: PropTypes.string,
};

AttendOmeter.defaultProps = {
  className: '',
};

export default AttendOmeter;
