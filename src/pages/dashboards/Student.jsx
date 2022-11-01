import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import ModuleCard from '@/components/modules/ModuleCard';
import TestData from '@/misc/TestData';
import TitleCard from '@/components/dashboard/TitleCard';
import { getUpcomingLessons } from '@/api/ApiClient';
import UpcomingLessons from '@/components/lessons/UpcomingLessons';
import AttendanceButtonContainer from '@/components/dashboard/AttendanceButton';
import { useModules } from '@/state/ModuleState';
import { getLessonsHappeningNow } from '@/misc/utils';

const getTotalAttendance = (student) => {
  const total = student.modules.reduce((m1, m2) => m1 + m2.attendance, 0);
  return Math.floor(total / student.modules.length);
};

const Student = () => {
  const [lessons, setLessons] = useState([]);
  const [currentlyHappeningLessons, setCurrentlyHappeningLessons] = useState([]);
  const [groupLessonMap, setGroupLessonMap] = useState([]);
  const [loading, setLoading] = useState(true);

  const { modules } = useModules();

  useEffect(() => {
    getUpcomingLessons()
      .then((r) => {
        setLessons(r.data);
        setCurrentlyHappeningLessons(getLessonsHappeningNow(r.data.lessons));
        console.clear();
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
    <div className="w-full flex flex-col">
      <TitleCard
        attendance={getTotalAttendance(TestData.student)}
        user={{ lessons: currentlyHappeningLessons, isStudent: true }}
      />
      <div className="md:flex hidden w-full">
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

      <div className="w-full text-2xl text-zinc-900 grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 md:gap-4">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.name}
            percentage={69}
            url={`/dashboard/student/module/${module.id}`}
          />
        ))}
      </div>
      <Outlet />
    </div>
  );
};
export default Student;
