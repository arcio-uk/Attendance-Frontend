import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';

const disableTimes = (timeValue, clockType) => clockType === 'minutes' && timeValue % 15;

const TimeSelector = ({ label, min, max }) => {
  const [value, setValue] = useState(new Date('2018-01-01T00:00:00.000Z'));
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="md:hidden flex">
        <MobileTimePicker
          label={label}
          value={value}
          minTime={min}
          maxTime={max}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          shouldDisableTime={disableTimes}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div className="md:flex hidden ">
        <DesktopTimePicker
          label={label}
          value={value}
          minTime={min}
          maxTime={max}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          shouldDisableTime={disableTimes}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
};

export default TimeSelector;
