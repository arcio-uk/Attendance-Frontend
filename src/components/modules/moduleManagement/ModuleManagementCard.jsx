import React from 'react';
import {
  PlusIcon,
  PlusCircleIcon,
  UserAddIcon,
} from '@heroicons/react/outline';
import CreateModuleDialog from './CreateModuleDialog';
import CreateModuleGroupDialog from './CreateModuleGroupDialog';
import AddUserDialog from './AddUserDialog';
import ModuleOptions from '@/components/modules/moduleManagement/ModuleOptions';
import AddUserGroupDialog from '@/components/modules/moduleManagement/AddUserGroupDialog';

const ModuleManagementCard = () => (
  <div className="w-full rounded-lg bg-zinc-100 flex flex-col items-center shadow-lg px-4 py-2">
    <div className="w-full flex justify-center">
      <h1 className="text-2xl text-gray-900 font-medium">
        Module Management
      </h1>
    </div>
    <div className="w-full flex flex-col items-center p-2">
      <ModuleOptions
        Icon={<PlusIcon className="w-8 h-8" />}
        title="Create Module"
        Dialog={CreateModuleDialog}
      />
      <ModuleOptions
        Icon={<PlusCircleIcon className="w-8 h-8" />}
        title="Create Module Group"
        Dialog={CreateModuleGroupDialog}
      />
      <ModuleOptions
        Icon={<UserAddIcon className="w-8 h-8" />}
        title="Add User To Module"
        Dialog={AddUserDialog}
      />
      <ModuleOptions
        Icon={<UserAddIcon className="w-8 h-8" />}
        title="Add User To Module Group"
        Dialog={AddUserGroupDialog}
      />
    </div>
  </div>
);

export default ModuleManagementCard;
