import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const attendanceCodes = [
  {
    code: '/',
    meaning: 'Present',
  },
  {
    code: 'B',
    meaning: 'Approved edu activity',
  },
  {
    code: 'C',
    meaning: 'Authorised absence',
  },
  {
    code: 'D',
    meaning: 'Dual registered (at another establishment)',
  },
  {
    code: 'E',
    meaning: 'Authorised absence (excluded)',
  },
  {
    code: 'G',
    meaning: 'Unauthorised absence, family holiday',
  },
  {
    code: 'H',
    meaning: 'Authorised family holiday',
  },
  {
    code: 'I',
    meaning: 'Authorised abs, Illness (NOT medical or dental etc. appts)',
  },
  {
    code: 'J',
    meaning: 'Approved, pupil attending interview ',
  },
  {
    code: 'L',
    meaning: 'Late (before registers closed) marked as present ',
  },
  {
    code: 'M',
    meaning: 'Authorised absence due to medical/ dental appts',
  },
  {
    code: 'N',
    meaning: 'Unauthorised absence, yet unknown reason',
  },
  {
    code: 'O',
    meaning: 'Unauthorised absence, other',
  },
  {
    code: 'P',
    meaning: 'Approved abs, sporting event',
  },
  {
    code: 'R',
    meaning: 'Authorised abs, religious observance',
  },
  {
    code: 'S',
    meaning: 'Authorised abs, study leave',
  },
  {
    code: 'T',
    meaning: 'Authorised abs, traveller absence',
  },
  {
    code: 'U',
    meaning: 'Unauthorised, arrived after register',
  },
  {
    code: 'V',
    meaning: 'Approved, educational trip',
  },
  {
    code: 'W',
    meaning: 'Approved abs, work experience',
  },
  {
    code: 'X',
    meaning: 'Non-compulsory school age absence or covid',
  },
  {
    code: 'Y',
    meaning: 'exceptional circumstances',
  },
  {
    code: 'Z',
    meaning: 'Pupil not yet on roll ',
  },
  {
    code: '#',
    meaning: 'School closure',
  },
];

const AttendanceCell = ({ content }) => {
  const [attendanceCode, setAttendanceCode] = useState(content);
  const [inputValue, setInputValue] = useState(content);
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Tab': {
        if (inputValue.length > 0) {
          setAttendanceCode(inputValue);
        }
        break;
      }
      default:
    }
  };

  useEffect(() => {
    console.log(`New input value: ${attendanceCode}`);
  }, [attendanceCode]);
  return (
    <div className="text-right m-2">
      {content}
      <Autocomplete
        sx={{ width: 300 }}
        options={attendanceCodes}
        autoHighlight
        defaultValue={attendanceCodes.find((c) => c.code === attendanceCode)}
        getOptionLabel={(code) => code.code}
        height="15vh"
        renderOption={(props, code) => (
          <Box component="li" {...props}>
            {code.meaning}
            {' '}
            (
            {code.code}
            )
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            onchange={(event) => setInputValue(event.target.value)}
          />
        )}
      />
    </div>
  );
};

export default AttendanceCell;
