import React, { useState, useEffect } from 'react';
import {
  getAllModules,
  getModuleGroupStudents,
  addUsersToModuleGroup,
  getModuleGroups,
} from '@/api/ApiClient';
import DialogModel from '@/components/ui/DialogModel';
import FeatureTable from '@/components/ui/FeatureTable';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { useModuleLecturer } from '@/state/ModuleState';

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
    id: 'email',
    numeric: false,
    padding: 'normal',
    label: 'Email',
    align: 'left',
  },
  {
    id: 'module-groups',
    numeric: false,
    padding: 'normal',
    label: 'Module Groups',
    align: 'left',
  },
];

const AddUserGroupDialog = ({ open, onClose }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleSelected, setModuleSelected] = useState({});
  const [moduleGroups, setModuleGroups] = useState([]);
  const [groupSelected, setGroupSelected] = useState([]);
  const [success, setSuccess] = useState('');

  const { moduleLecturer } = useModuleLecturer();

  useEffect(() => {
    getAllModules().then((res) => {
      setModules(res.data);
    });
  }, []);

  useEffect(async () => {
    setGroupSelected({});
    if (Object.keys(moduleSelected).length > 0) {
      const resModuleGroups = await getModuleGroups(moduleSelected.id).catch(
        (e) => console.error(e),
      );
      setModuleGroups(resModuleGroups.data);

      // Formats user information for the table.
      const moduleUsersData = moduleLecturer[moduleSelected.id].students.map(
        (user) => ({
          id: user.id,
          firstname: user.firstname,
          surname: user.surname,
          email: user.email,
          'module-groups': 'loading...',
        }),
      );

      // Creates an array of promises to request ALL group students.
      const moduleGroupsReqs = resModuleGroups.data.map((group) =>
        getModuleGroupStudents(group.id));

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
                moduleGroupId: next.data['module-group-id'],
                students: next.data.users,
              },
            }),
            {},
          );

          // Finds what groups all the students are in, for the table.
          for (const user of moduleUsersData) {
            let userGroups = '';
            const userGroupArr = [];
            for (const group in groupStudents) {
              if (groupStudents[group].students.some((u) => u.id === user.id)) {
                userGroups += `${groupStudents[group].moduleName}, `;
                userGroupArr.push(group);
              }
            }
            userGroups = userGroups.slice(0, -2);
            if (userGroups.length === 0) userGroups = 'No groups';

            user['module-groups'] = userGroups;
            user['module-groups-ids'] = userGroupArr;
          }
          setUsers(moduleUsersData);
          setFilteredUsers(moduleUsersData);
          setSelectedUsers([]);
        })
        .catch((res) => {
          console.error(res);
        });
    }
  }, [moduleSelected]);

  useEffect(() => {
    setSelectedUsers([]);
  }, [groupSelected]);

  // Get the users that are not in a groupId
  const getUsersNotInGroup = (groupId) => users.filter((user) => !user['module-groups-ids'].includes(groupId));

  useEffect(() => {
    setFilteredUsers(getUsersNotInGroup(groupSelected.id));
  }, [groupSelected]);

  const onSubmit = (e) => {
    e.preventDefault();
    addUsersToModuleGroup(selectedUsers, groupSelected.id)
      .then((res) => {
        console.log(res);

        setSuccess('bg-green-500');
        setTimeout(() => {
          onClose();
        }, 1000);
        setTimeout(() => {
          setSuccess('');
          setUsers([]);
          setFilteredUsers([]);
          setSelectedUsers([]);
          setModuleGroups([]);
          setModuleSelected({});
          setGroupSelected({});
        }, 1500);
      })
      .catch((err) => console.error(err));
  };

  return (
    <DialogModel
      open={open}
      onClose={onClose}
      title="Add Users To Module Group"
      className="overflow-visible"
    >
      <form
        onSubmit={onSubmit}
        className="min-h-64 w-full px-2 flex flex-col gap-4 justify-between overflow-visible"
      >
        <Select
          options={modules.map((module) => ({
            id: module.id,
            key: module.id,
            title: module.name,
          }))}
          value={moduleSelected}
          onChange={setModuleSelected}
          label="Module"
        />
        <div className="w-full py-2">
          <FeatureTable
            title="Students"
            data={filteredUsers}
            selected={selectedUsers}
            setSelected={setSelectedUsers}
            headers={headCells}
          />
        </div>
        <div>
          <Select
            options={moduleGroups.map((group) => ({
              id: group.id,
              key: group.id,
              title: group.name,
            }))}
            value={groupSelected}
            onChange={setGroupSelected}
            label="Module Group"
          />
        </div>
        <div className="flex justify-center items-center">
          <Button type="submit" className={success}>
            Add Users
          </Button>
        </div>
      </form>
    </DialogModel>
  );
};
export default AddUserGroupDialog;
