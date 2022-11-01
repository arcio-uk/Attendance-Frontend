import React, { useState, useEffect, useRef } from 'react';
import { useParams, Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { getModuleGroups, getModuleGroupStudents } from '@/api/ApiClient';
import FeatureTable from '@/components/ui/FeatureTable';

import { useModuleLecturer } from '@/state/ModuleState';

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
  {
    id: 'module-groups',
    numeric: true,
    padding: 'normal',
    label: 'Module Groups',
    align: 'left',
    searchable: true,
  },
];

const calculateAttendance = (attended, total) => {
  if (total === 0) return 0;
  return Math.floor((attended / total) * 100);
};

const LectureModule = () => {
  const { moduleId } = useParams();
  const [moduleUsers, setModuleUsers] = useState([]);
  const [moduleGroups, setModuleGroups] = useState([]);
  const [moduleGroupStudents, setModuleGroupStudents] = useState({});
  const [tableSelected, setTableSelected] = useState([]);
  const ref = useRef(null);

  const { moduleLecturer } = useModuleLecturer();

  useEffect(async () => {
    if (moduleLecturer.length === 0) return;

    // get Module Groups for this module
    const moduleGroupsRet = await getModuleGroups(moduleId).catch((err) => {
      console.error(err);
    });
    setModuleGroups(moduleGroupsRet.data);

    // Formats user information for the table.
    const moduleUsersData = moduleLecturer[moduleId].students.map((user) => ({
      name: `${user.firstname} ${user.surname}`,
      attendance: calculateAttendance(
        user.attendance['marked-sessions'],
        user.attendance['total-sessions'],
      ),
      id: user.id,
      'module-groups': 'loading...',
    }));

    // Creates an array of promises to request ALL group students.
    const moduleGroupsReqs = moduleGroupsRet.data.map((group) =>
      getModuleGroupStudents(group.id),
    );

    // Resolve all requests, and only then update state.
    Promise.all(moduleGroupsReqs)
      .then((res) => {
        // Reduce promise array down into an object.
        const groupStudents = res.reduce(
          (prev, next) => ({
            // Gets the module group id for this specific request.
            ...prev,
            [next.data['module-group-id']]: {
              moduleName: next.data['module-group-name'],
              students: next.data.users,
            },
          }),
          {},
        );

        // Finds what groups all the students are in, for the table.
        for (const user of moduleUsersData) {
          let userGroups = '';
          for (const group in groupStudents) {
            if (groupStudents[group].students.some((u) => u.id === user.id)) {
              userGroups += `${groupStudents[group].moduleName}, `;
            }
          }
          userGroups = userGroups.slice(0, -2);
          user['module-groups'] = userGroups;
        }

        setModuleUsers(moduleUsersData);
        setModuleGroupStudents(groupStudents);
      })
      .catch((res) => {
        console.error(res);
      });
    ref.current.scrollIntoView();
  }, [moduleId, moduleLecturer]);

  const getModuleName = () => {
    if (moduleLecturer.length === 0) return 'Loading ...';
    return moduleLecturer[moduleId].moduleName;
  };

  return (
    <div
      className="my-2 md:my-4 p-2 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-600 text-zinc-100"
      ref={ref}>
      <div className="font-medium text-3xl text-shadow-md p-2">
        {getModuleName()}
      </div>
      <div className="w-full px-2">
        <div className="w-full shadow-2xl">
          <FeatureTable
            title="Students"
            data={moduleUsers}
            selected={tableSelected}
            setSelected={setTableSelected}
            headers={headCells}
          />
        </div>
        <div className="w-full grid grid-cols-3 gap-2">
          {moduleGroups.map((group) => (
            <Link
              to={`/dashboard/lecturer/module/${moduleId}/group/${group.id}`}>
              <div
                key={group.id}
                className="w-full bg-zinc-100 shadow-md rounded flex flex-col p-4 hover:bg-purple-200 transition-all">
                <h1 className="text-xl font-medium text-gray-900">
                  {group.name}
                </h1>
              </div>
            </Link>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default LectureModule;
