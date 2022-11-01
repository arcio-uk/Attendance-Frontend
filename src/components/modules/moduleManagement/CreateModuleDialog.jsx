import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DialogModel from '@/components/ui/DialogModel';
import Textfield from '@/components/ui/Textfield';
import Button from '@/components/ui/Button';
import { addUserToModule, createNewModule } from '@/api/ApiClient';
import { getDecodedAccessToken } from '@/api/LocalStorage';

const CreateModuleDialog = ({ open, onClose }) => {
  const [moduleName, setModuleName] = useState('');
  const [moduleTag, setModuleTag] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const createModuleResponse = await createNewModule(moduleName, moduleTag);
      const token = await getDecodedAccessToken();
      await addUserToModule(token.uuid, createModuleResponse.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogModel title="Create Module" open={open} onClose={onClose}>
      <form className="sm:w-[500px] w-full py-4 px-2 flex flex-col gap-4" onSubmit={onSubmit}>
        <Textfield
          name="moduleName"
          type="text"
          label="Module Name"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />
        <Textfield
          name="moduleTag"
          type="text"
          label="Module Tag"
          value={moduleTag}
          onChange={(e) => setModuleTag(e.target.value)}
        />
        <Button type="submit">Create Module</Button>
      </form>
    </DialogModel>
  );
};

CreateModuleDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

CreateModuleDialog.defaultProps = {
  open: false,
  onClose: undefined,
};

export default CreateModuleDialog;
