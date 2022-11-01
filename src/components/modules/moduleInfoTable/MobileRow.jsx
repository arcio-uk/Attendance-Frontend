import React from 'react';

const MobileRow = ({ name, attendance }) => {
  return (
    <div className="pt-30 pb-30 m-auto">
      <div>
        <b>Name.</b> {name}
      </div>
      <div>
        <b>Attendance.</b> {attendance}
      </div>
    </div>
  );
};

export default MobileRow;
