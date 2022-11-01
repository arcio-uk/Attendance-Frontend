import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import AttendOmeter from '@/components/charts/AttendOmeter';

const ModuleCard = ({ title, percentage, url }) => {
  const clickable = url != null ? ' cursor-pointer' : '';
  const navigate = useNavigate();
  const routeChange = () => {
    navigate(url);
  };

  return (
    <Link to={url}>
      <div className="w-full h-full min-h-72 flex justify-center">
        <div
          className={`w-full h-full rounded-lg flex flex-col gap-2 bg-gradient-to-br from-purple-400 to-indigo-600 shadow-2xl px-4 py-2 select-none min-w-min-content${clickable}`}
          onKeyUp={routeChange}
        >
          <h1 className="text-xl md:text-2xl text-zinc-100 font-medium text-shadow-md">
            {title}
          </h1>
          <div className="w-full flex col-span-1 flex-col justify-between h-full">
            <div className="items-center  h-full flex flex-col justify-end">
              <div className="w-full flex-shrink-0 flex-grow-0 h-32 md:h-36 flex flex-col">
                <AttendOmeter
                  percentage={percentage}
                  className="max-h-32 text-zinc-200"
                />
              </div>
              <h3 className="text-xl md:text-2xl text-zinc-100">
                Attendance
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ModuleCard;

ModuleCard.propTypes = {
  title: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  url: PropTypes.string,
};

ModuleCard.defaultProps = {
  url: '/',
};
