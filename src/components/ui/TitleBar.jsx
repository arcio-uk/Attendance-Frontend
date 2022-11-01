import React from 'react';

const TitleBar = ({ text, className = '' }) => (
  <div className={`text-center overflow-hidden flex text-5xl p-4 justify-center w-full ${className} align-middle`}>
    <div className="flex-auto justify-center flex-col m-auto">
      <div className="h-[2px] bg-black m-4" />
    </div>
    <div className="flex-nowrap">
      {text}
    </div>
    <div className="flex-auto justify-center flex-col m-auto">
      <div className="h-[2px] bg-black m-4" />
    </div>
  </div>
);

export default TitleBar;
