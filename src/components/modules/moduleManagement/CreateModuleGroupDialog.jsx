import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DialogModel from '@/components/ui/DialogModel';
import Textfield from '@/components/ui/Textfield';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { createNewModuleGroup, getAllModules } from '@/api/ApiClient';

const CreateModuleGroupDialog = ({ open, onClose }) => {
  const [moduleGroupName, setModuleGroupName] = useState('');
  const [moduleSelected, setModuleSelected] = useState({});
  const [modules, setModules] = useState([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getAllModules()
      .then((res) => {
        setModules(res.data);
        if (res.data.length > 0) {
          setModuleSelected({ title: res.data[0].name, id: res.data[0].id });
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewModuleGroup(moduleGroupName, moduleSelected.id);
      setSuccess('bg-green-500');
      setTimeout(() => {
        onClose();
      }, 1000);
      setTimeout(() => {
        setSuccess('');
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogModel title="Create Module Group" open={open} onClose={onClose}>
      <form
        className="sm:w-[500px] min-h-64 w-full px-2 flex flex-col gap-4 justify-between"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 py-4">
          <Textfield
            name="moduleGroupName"
            type="text"
            label="Module Group Name"
            value={moduleGroupName}
            onChange={(e) => setModuleGroupName(e.target.value)}
          />
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
          <Button type="submit" className={success}>Create Module Group</Button>
        </div>
      </form>
    </DialogModel>
  );
};

CreateModuleGroupDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

CreateModuleGroupDialog.defaultProps = {
  open: false,
};

export default CreateModuleGroupDialog;
