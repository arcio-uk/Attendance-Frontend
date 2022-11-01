import { useParams } from 'react-router';
import React, { useState, useEffect, useRef } from 'react';
import TitleBar from '@/components/ui/TitleBar';
import { getModuleUsers, getModuleGroups } from '@/api/ApiClient';
import FeatureTable from '@/components/ui/FeatureTable';

const headCells = [
  {
    id: 'name',
    numeric: false,
    padding: 'none',
    label: 'Name',
    align: 'left',
    searchable: true,
  },
  {
    id: 'attendance',
    numeric: true,
    padding: 'normal',
    label: 'Attendance',
    align: 'left',
    searchable: true,
  },
];

const calculateAttendance = (attended, total) => {
  if (total === 0) return 0;
  return Math.floor((attended / total) * 100);
};

/**
 * The register attendance
 */
const RegisterAttendance = () => {
  const { moduleId, moduleName } = useParams();
  const [moduleUsers, setModuleUsers] = useState([]);
  const [moduleGroups, setModuleGroups] = useState([]);
  const [tableSelected, setTableSelected] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    getModuleUsers(moduleId)
      .then((res) => {
        if (res.data != null) {
          const moduleUsersData = res.data['module-users'].map((user) => ({
            name: `${user.firstname} ${user.surname}`,
            attendance:
              calculateAttendance(res.data['users-attendance'][user.id]['marked-sessions'], res.data['users-attendance'][user.id]['total-sessions']),
            id: user.id,
          }));
          setModuleUsers(moduleUsersData);
        } else {
          setModuleUsers([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // Get Module Groups for this module
    getModuleGroups(moduleId)
      .then((res) => {
        setModuleGroups(res.data);
      })
      .catch((err) => console.error(err));
    ref.current.scrollIntoView();
  }, [moduleId]);

  return (
    <div className="my-2 md:my-4 p-2 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-600 text-zinc-100" ref={ref}>
      <div className="font-medium text-3xl text-shadow-md p-2">
        {`Register For: ${moduleName}`}
      </div>
      <div className="w-full shadow-2xl">
        <FeatureTable
          title="Students"
          data={moduleUsers}
          selected={tableSelected}
          setSelected={setTableSelected}
          headers={headCells}
        />
      </div>
    </div>
  );
};

export default RegisterAttendance;
