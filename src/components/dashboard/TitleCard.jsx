import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AttendOmeter from '@/components/charts/AttendOmeter';
import AttendanceButtonContainer from '@/components/dashboard/AttendanceButton';
import { getDecodedAccessToken } from '@/api/LocalStorage';

/**
 * This is the main title card to hold the picture, name and overall attendance of the user
 *
 * @param { Integer } attendance the percentage attendance of the student
 * @param { Object } Student the student object, if it's there
 */
const TitleCard = ({ pic, attendance, user }) => {
  const [jwtName, setJwtName] = useState('');

  useEffect(() => {
    getDecodedAccessToken().then((r) => {
      setJwtName(`${r.firstname} ${r.surname}`);
    });
  });

  return (
    <div>
      <div className="text-2xl grid md:grid-cols-3 grid-cols-1 md:p-4 gap-4 bg-zinc-100 rounded-3xl my-2 md:my-4 shadow-lg text-zinc-100">
        <div className="w-full flex justify-center items-center max-w-full md:mt-5 md:mr-5  rounded-3xl">
          <img
            src={pic}
            className="rounded-full w-48 h-48 bg-green-500 md:m-10 m-2 justify-center"
          />
        </div>

        <div className="w-full flex justify-center items-center md:p-10 md:mt-5 md:mr-5 rounded-3xl">
          <p className="md:text-6xl text-5xl text-shadow-xl text-gray-900">{jwtName}</p>
        </div>
        {user.isStudent && (
          <div className="flex md:hidden">
            <AttendanceButtonContainer lessons={user.lessons} />
          </div>
        )}
        <div className="w-full flex justify-center rounded-3xl md:mt-5 md:mr-5 p-2 flex-col justify-items-center">
          <AttendOmeter percentage={attendance} className="text-5xl text-gray-900 top-[55%]" />
          <div className="justify-center text-center text-shadow-xl text-gray-900">
            Overall
            {!user.isStudent && ' Student'}
            {' '}
            Attendance
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
// pic, name, attendance, student
TitleCard.propTypes = {
  pic: PropTypes.string,
  attendance: PropTypes.number,
  user: PropTypes.object,
};

TitleCard.defaultProps = {
  pic: 'https://styles.redditmedia.com/t5_2ldvug/styles/communityIcon_aq22b2qb50u41.png',
  attendance: 99,
  user: { isStudent: false },
};
