import React, { useState } from 'react';
import { Outlet } from 'react-router';
import NavBar from '@/components/ui/NavBar';

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="w-full min-h-screen overflow-y-auto bg-zinc-200 overflow-x-hidden">
      <NavBar open={showSidebar} setOpen={setShowSidebar} />
      <div className="flex justify-center w-full">
        <div
          className="w-full max-w-screen-2xl flex justify-center min-h-screen p-4"
          onKeyUp={() => setShowSidebar(false)}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
