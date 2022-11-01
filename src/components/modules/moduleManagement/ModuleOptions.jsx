import React, { useState } from 'react';

const ModuleOptions = ({ title, Icon, Dialog }) => {
  const [openOption, setOpenOption] = useState(false);

  return (
    <div
      className="w-full flex gap-4 rounded hover:bg-purple-400 p-2 transition-all cursor-pointer"
      onClick={() => setOpenOption(true)}
    >
      {Icon}
      <p className="text-xl text-gray-900 font-medium">{title}</p>
      <Dialog open={openOption} onClose={() => setOpenOption(false)} />
    </div>
  );
};
export default ModuleOptions;
