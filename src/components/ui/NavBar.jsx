import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { getRoles, getDecodedAccessToken } from '@/api/LocalStorage';
import { pages, statuses } from '@/misc/Constants';

const filterPages = (permissions) => pages.filter((x) => (permissions & x.int) !== 0);

const NavBar = ({ open, setOpen }) => {
  const [userInt, setUserInt] = useState(0);

  const getSidebar = () => (
    <div
      className={clsx(
        'z-10 absolute h-screen bg-white top-0 right-0 pt-16 flex justify-center gap-8 transition-all duration-300 shadow-xl overflow-hidden border-l-2 border-zinc-300',
        open ? 'w-3/4' : 'w-0',
      )}
    >
      <div
        className={clsx(
          'w-3/4 flex-col select-none items-center gap-8 transition-all duration-300',
          open ? 'flex' : 'hidden',
        )}
      >
        {filterPages(userInt).map((x) => (
          <Link
            key={uuidv4()}
            to={x.path}
            className="w-full flex justify-center hover:bg-purple-400 p-4 rounded-lg transition-all duration-300"
          >
            <p className="text-gray-800 hover:text-gray-900">{x.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    // TODO: make this use a store that get's the user's roles, then they can be changed
    // easily whenever the user logges in or out
    // set num to the correct int, based on the roles that the user has
    getDecodedAccessToken().then((t) => {
      let num = 0;
      if (t.error) {
        return setUserInt(statuses.loggedOut);
      }
      num += statuses.loggedIn;
      const roles = getRoles();
      if (roles.length > 0) {
        const mainRole = roles.find((x) => x.main).name.toLowerCase();
        num += statuses[mainRole];
        console.log(statuses);
        console.log(`Success in nav-bar, setting user int to ${num}, main role is ${mainRole}`);
        return setUserInt(num);
      }
      console.error('Error, signed in but has no roles');
      return setUserInt(num);
    });
  }, []);

  return (
    <div className="z-10 w-full bg-white border-b-2 border-zinc-300 py-2 px-4 flex justify-center">
      <div className="w-full flex lg:basis-3/5">
        <Link to="/">
          <p className="text-5xl font-medium text-gray-800">Arcio</p>
        </Link>
      </div>
      <div className="w-full hidden md:flex select-none justify-right text-2xl items-center lg:basis-2/5">
        {filterPages(userInt).map((x) => (
          <Link to={x.path} className="flex-1">
            <div className="w-full flex justify-center hover:bg-purple-400 rounded-lg transition-all duration-250 max-w-[10vw]">
              <p className="text-gray-800 hover:text-gray-900">{x.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="md:hidden flex justify-center items-center" onClick={() => setOpen(!open)}>
        <MenuIcon className="w-12 h-12 z-20 cursor-pointer" />
        {getSidebar()}
      </div>
    </div>
  );
};

export default NavBar;
