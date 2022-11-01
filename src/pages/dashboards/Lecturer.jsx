import { Outlet } from 'react-router';
import React, { useEffect, useState } from 'react';
import ModuleCard from '@/components/modules/ModuleCard';
import TitleCard from '@/components/dashboard/TitleCard';
import ModuleManagementCard from '@/components/modules/moduleManagement/ModuleManagementCard';
import { useModuleLecturer } from '@/state/ModuleState';
import { getUpcomingLessons } from '@/api/ApiClient';
import UpcomingLessons from '@/components/lessons/UpcomingLessons';
import { getLessonsHappeningNow } from '@/misc/utils';
import AttendanceButtonContainer from '@/components/dashboard/AttendanceButton';

const Lecturer = () => {
  const { moduleLecturer } = useModuleLecturer();
  const [lessons, setLessons] = useState([]);
  const [currentlyHappeningLessons, setCurrentlyHappeningLessons] = useState([]);
  const [groupLessonMap, setGroupLessonMap] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTotalAttendance = () => {
    console.log(moduleLecturer, null, 2);
    const totalAttendance = Object.keys(moduleLecturer)
      .reduce((prev, next) => prev + moduleLecturer[next].attendance, 0);
    return totalAttendance / Object.keys(moduleLecturer).length;
  };

  useEffect(() => {
    getUpcomingLessons()
      .then((r) => {
        setLessons(r.data);
        setCurrentlyHappeningLessons(getLessonsHappeningNow(r.data.lessons));
        console.log('r.data: ', r.data);
        // Map group lesson id to group lesson info for O(1) summary lookup.
        const newMap = new Map();
        r.data['group-lessons'].forEach((g) => {
          newMap.set(g.id, g);
        });
        setGroupLessonMap(newMap);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="w-full">
      <TitleCard
        attendance={getTotalAttendance()}
        user={{
          isStudent: false,
          lessons: currentlyHappeningLessons,
        }}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        <ModuleManagementCard />
        <AttendanceButtonContainer lessons={currentlyHappeningLessons} />
      </div>

      <div className="w-full grid grid-cols-1">
        <UpcomingLessons
          lessons={lessons}
          lessonsNow={currentlyHappeningLessons}
          groupLessonMap={groupLessonMap}
          loading={loading}
        />
      </div>
      <div className="w-full text-2xl text-zinc-900 grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-2 md:gap-4">
        {Object.keys(moduleLecturer).map((module) => (
          <ModuleCard
            key={module}
            title={moduleLecturer[module].moduleName}
            percentage={moduleLecturer[module].attendance}
            url={`/dashboard/lecturer/module/${module}`}
          />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Lecturer;
