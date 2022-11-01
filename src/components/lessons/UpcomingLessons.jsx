import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Skeleton } from '@mui/material';
import TitleBar from '@/components/ui/TitleBar.jsx';

const dateFormat = 'DD/MM/YYYY';
const timeFormat = ' HH:mm ';

const formatTime = (stringDate) => moment(new Date(stringDate)).format(timeFormat);

const UpcomingLessons = ({
  lessons, lessonsNow, groupLessonMap, loading,
}) => {
  let processedLessons = [];
  const getLessons = () => {
    if (loading) {
      return (
        <div className="w-full flex flex-col gap-2">
          <Skeleton variant="rectangular" animation="wave" height={50} />
          <Skeleton variant="rectangular" animation="wave" height={50} />
          <Skeleton variant="rectangular" animation="wave" height={50} />
          <Skeleton variant="rectangular" animation="wave" height={50} />
        </div>
      );
    }
    if (lessonsNow.length > 0) {
      processedLessons = lessons.lessons.map((l) => {
        if (lessonsNow.find((l2) => l2.id === l.id)) {
          return { ...l, isNow: true };
        }
        return l;
      });
    }
    return (
      <table className="w-full flex flex-col text-xl text-gray-900 max-h-[600px] overflow-y-scroll my-2 rounded-lg">
        {processedLessons.map((lesson) => (
          <tr
            key={lesson.id + lesson['start-time']}
            className={`w-full flex justify-between px-3 rounded-2xl ${lesson.isNow ? 'from-purple-400 to-indigo-600 shadow-2xl bg-gradient-to-br text-white my-2' : ''}`}
          >
            <td className="w-full flex">
              <h3>{groupLessonMap.get(lesson['group-lesson-id']).summary}</h3>
            </td>
            <td className="w-full border-l-2 px-2 border-gray-400">
              <h3>
                {moment(new Date(lesson['start-time'])).format(dateFormat)}
              </h3>
            </td>
            <td className="w-full flex justify-left border-l-2 p-2 border-gray-400">
              <h3>
                {formatTime(lesson['start-time'])}
                -
                {formatTime(lesson['end-time'])}
              </h3>
            </td>
          </tr>
        ))}
      </table>
    );
  };

  return (
    <div className="w-full mb-4 bg-zinc-100 rounded-2xl shadow-lg flex flex-col p-4">
      <TitleBar text="Upcoming Lessons" className="text-3xl" />
      <div className="w-full flex justify-between text-2xl font-medium text-purple-700 px-4 my-2">
        <div className="w-full flex">
          <h3>Lesson Name</h3>
        </div>
        <div className="w-full flex">
          <h3>Date</h3>
        </div>
        <div className="w-full flex justify-left">
          <h3>Time</h3>
        </div>
      </div>
      {getLessons()}
    </div>
  );
};

UpcomingLessons.propTypes = {
  lessons: PropTypes.object,
  loading: PropTypes.bool,
  groupLessonMap: PropTypes.instanceOf(Map),
};

UpcomingLessons.defaultProps = {
  lessons: {},
  loading: true,
  groupLessonMap: new Map(),
};

export default UpcomingLessons;
