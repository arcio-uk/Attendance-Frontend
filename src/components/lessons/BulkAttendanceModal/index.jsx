import React, { useState, useEffect } from 'react';
import { getBulkAttendance } from '@/api/ApiClient';
import DialogModel from '@/components/ui/DialogModel';
import FeatureTable from '@/components/ui/FeatureTable';
import Button from '@/components/ui/Button';
import AttendanceCell from '@/components/lessons/BulkAttendanceModal/AttendanceCell';

const headCells = [
  {
    id: 'firstname',
    numeric: false,
    padding: 'none',
    label: 'Firstname',
    align: 'left',
  },
  {
    id: 'surname',
    numeric: false,
    padding: 'normal',
    label: 'Surname',
    align: 'left',
  },
  {
    id: 'attendanceKey',
    numeric: false,
    padding: 'normal',
    label: 'Attendance Key',
    align: 'right',
    component: AttendanceCell,
  },
];

const BulkAttendanceModal = ({
  open, onClose, doneResolve, lesson,
}) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleSelected, setModuleSelected] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (lesson) {
      getBulkAttendance(lesson.id).then((u) => {
        setAttendanceRecords(u.map((record) => ({
          ...record.user,
          attendanceKey: record['attendance-key'],
          registerTime: record['register-time'],
        })));
        console.log(attendanceRecords);
      });
    }
  }, [lesson]);

  const onSubmit = (e) => {
    e.preventDefault();
    /* addUsersToModule(selectedUsers, moduleSelected.id)
      .then(() => {
        setSuccess('bg-green-500');
        setTimeout(() => {
          onClose();
        }, 1000);
        setTimeout(() => {
          setSuccess('');
        }, 1500);
        if (doneResolve) doneResolve('done');
      })
      .catch((err) => console.error(err)); */
  };

  return (
    <DialogModel open={open} onClose={onClose} title="Mark Attendance For Lesson" className="overflow-visible">
      <form onSubmit={onSubmit} className="min-h-64 w-full px-2 flex flex-col gap-4 justify-between">
        <div className="w-full py-2">
          hi
        </div>
        <div className="flex justify-center items-center">
          <Button type="submit" className={success}>Submit Attendance</Button>
        </div>
      </form>
    </DialogModel>
  );
};
export default BulkAttendanceModal;
