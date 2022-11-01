import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { markAttendance } from '@/api/ApiClient';

const baseStyle = `
bg-gradient-to-r 
from-green-600
to-green-700
p-30
h-full
w-full
min-w-fit
text-center
text-slate-200
text-3xl
rounded-3xl 
shadow-xl
hover:shadow-2xl 
select-none 
animate-buttonGradient
bg-buttonGradient
flex
justify-center
items-center
p-10
rounded-2xl
`;

const differentAnimations = [
  'animate__heartBeat',
  'animate__headShake',
  'animate__jello',
  'animate__tada',
  'animate__swing',
  'animate__bounce',
];

const clickedAnimations = [
  'animate__backOutDown',
  'animate__zoomOut',
  'animate__flipOutY',
  'animate__flipOutX',
];

const baseParentStyle = 'w-full flex justify-center items-center z-0 cursor-pointer min-h-fit min-w-fit';

const Button = ({
  text, lesson, className, clickAction,
}) => {
  const [clicked, setClicked] = useState(false);

  let animation = '';

  if (clicked) {
    animation = clickedAnimations[Math.floor(Math.random() * clickedAnimations.length)];
  } else {
    animation = `animate__infinite ${differentAnimations[Math.floor(Math.random() * differentAnimations.length)]}`;
  }

  useEffect(() => {
    if (clicked) {
      clickAction(lesson).catch((e) => {
        setClicked(false);
        console.error(e);
        alert('Network error, please try again later');
      });
    }
  }, [clicked]);

  return (
    <div className={`${baseParentStyle} ${className}`}>
      <div className="w-5/6 md:w-1/2 items-center justify-center max-w-max rounded-3xl mt-10 mb-10 h-24">
        <div className={`animate__animated ${animation} h-full`} onClick={() => { setClicked(true); }}>
          <div className={baseStyle}>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

Button.propTypes = {
  lesson: PropTypes.objectOf({
    id: PropTypes.string.isRequired,
    moduleName: PropTypes.string.isRequired,
  }).isRequired,
  clickAction: PropTypes.func.isRequired,
};

export default Button;
