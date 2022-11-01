import React, { useState, useEffect } from 'react';
import { getAllUsers, getAllModules, addUsersToModule } from '@/api/ApiClient';
import DialogModel from '@/components/ui/DialogModel';
import FeatureTable from '@/components/ui/FeatureTable';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

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
    id: 'external-id',
    numeric: false,
    padding: 'normal',
    label: 'External ID',
    align: 'left',
  },
];

const AddUserDialog = ({ open, onClose }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleSelected, setModuleSelected] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getAllUsers().then((u) => {
      setUsers(u.data);
    });
    getAllModules().then((res) => {
      setModules(res.data);
      if (res.data.length > 0) {
        setModuleSelected({ title: res.data[0].name, id: res.data[0].id });
      }
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    addUsersToModule(selectedUsers, moduleSelected.id)
      .then(() => {
        setSuccess('bg-green-500');
        setTimeout(() => {
          onClose();
        }, 1000);
        setTimeout(() => {
          setSuccess('');
        }, 1500);
      })
      .catch((err) => console.error(err));
  };

  return (
    <DialogModel open={open} onClose={onClose} title="Add Users To Module" className="overflow-visible">
      <form onSubmit={onSubmit} className="min-h-64 w-full px-2 flex flex-col gap-4 justify-between">
        <div className="w-full py-2">
          <FeatureTable
            title="Students"
            data={users}
            selected={selectedUsers}
            setSelected={setSelectedUsers}
            headers={headCells}
          />
        </div>
        <div>
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
        </div>
        <div className="flex justify-center items-center">
          <Button type="submit" className={success}>Add Users</Button>
        </div>
      </form>
    </DialogModel>
  );
};
export default AddUserDialog;
