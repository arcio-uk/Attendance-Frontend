import React, { useState } from 'react';
import { Outlet } from 'react-router';
import NavBar from '@/components/ui/NavBar';

const StandardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="w-full h-full min-h-screen">
      <div className="flex">
        <div className="flex-1 max-w-full">
          <NavBar open={showSidebar} setOpen={setShowSidebar} />
          <div
            className="w-full max-w-screen-lg justify-center p-4 space-y-10 md:w-9/12 m-auto"
            onKeyUp={() => setShowSidebar(false)}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardLayout;
