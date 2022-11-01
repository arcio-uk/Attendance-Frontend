//= =================================================
// Module State Flyweight
//
// Used to store the users module and
// information relating to it.
//= =================================================

import React, {
  useContext, useEffect, useState, createContext,
} from 'react';
import { getUserModules, getModuleUsers } from '@/api/ApiClient';

const ModuleContext = createContext();
const ModuleLecturerContext = createContext();

// Used to access the modules the user is in
// Both student and lecturers
export const useModules = () => useContext(ModuleContext);

// Used to get the user attendance for modules
// Used for lecturers - But can be reused for students
export const useModuleLecturer = () => useContext(ModuleLecturerContext);

const calculateAttendance = (attended, total) => {
  if (total === 0) return 0;
  return Math.floor((attended / total) * 100);
};

const ModuleState = ({ children }) => {
  const [modules, setModules] = useState([]);
  const [moduleLecturer, setModuleLecturer] = useState([]);

  const getModuleName = (id) => {
    const module = modules.find((m) => m.id === id);
    if (module == null) return '';
    return module.name;
  };

  useEffect(() => {
    getUserModules()
      .then((res) => {
        setModules(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Currently, this is done for ALL accounts,
  // STUB - Waiting for permission system.
  // Fetch users from every module.
  useEffect(() => {
    if (modules.length > 0) {
      // Creates an array of promises.
      const moduleReqs = modules.map((m) => getModuleUsers(m.id));

      // Wait until all the promises are fulfilled.
      Promise.all(moduleReqs).then((res) => {
        if (res.length === 0) return;

        // Gets name, attendance and users for a module,
        // Formats it and exposes it in the useModules() hook.
        const moduleInfo = res.reduce((prev, next) => {
          const params = new URL(next.config.url).searchParams;
          const moduleId = params.get('moduleId');

          const [studentAttendance, totalAttendance] = next.data.reduce(
            (partial, n) => [
              partial[0] + n.attendance['marked-sessions'],
              partial[1] + n.attendance['total-sessions'],
            ],
            [0, 0],
          );

          return {
            ...prev,
            [moduleId]: {
              moduleName: modules.find((m) => m.id === moduleId).name,
              'marked-sessions': studentAttendance,
              'total-sessions': totalAttendance,
              attendance: calculateAttendance(
                studentAttendance,
                totalAttendance,
              ),
              students: next.data,
            },
          };
        }, {});
        console.log(moduleInfo);
        setModuleLecturer(moduleInfo);
      });
    }
  }, [modules]);

  return (
    <ModuleContext.Provider value={{ modules, getModuleName }}>
      <ModuleLecturerContext.Provider value={{ moduleLecturer }}>
        {children}
      </ModuleLecturerContext.Provider>
    </ModuleContext.Provider>
  );
};
export default ModuleState;
