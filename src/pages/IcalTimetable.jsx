import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@mui/material/Tooltip';
import Button from '@/components/ui/Button';
import { getCalendarLink } from '@/api/ApiClient';

let globLink = '';
const saveTimetable = () => saveAs(globLink, 'timetable.ics');

const IcalTimetable = () => {
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getCalendarLink().then((l) => {
      setLink(l);
      globLink = l;
    });
  }, []);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1400);
    }
  }, [copied]);
  return (
    <div className="w-full">
      <div className="w-full bg-zinc-100 rounded-xl p-4 shadow-lg flex flex-col gap-2">
        <h1 className="text-4xl text-gray-900 font-medium">Timetable Download</h1>
        <Button onClick={saveTimetable}>
          Download Calendar
        </Button>
        <CopyToClipboard
          text={link}
          onCopy={() => setCopied(true)}
        >
          <Tooltip open={copied} title="Copied!">
            <div>
              <Button>
                Click here to copy the timetable link!
              </Button>
            </div>
          </Tooltip>
        </CopyToClipboard>
      </div>
    </div>
  );
};
export default IcalTimetable;
