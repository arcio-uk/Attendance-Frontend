import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import Button from './Button';
import { markAttendance } from '@/api/ApiClient';
import BulkAttendanceModal from '@/components/lessons/BulkAttendanceModal';
import clickSound from '@/treasury/click.mp3';

const AttendanceButtonContainer = ({ lessons, className }) => {
  const [lessonsToMark, setLessonsToMark] = useState([]);
  const [lessonRegister, setLessonRegister] = useState(false);
  const [play] = useSound(clickSound);
  const removeLessonFromArray = (lesson) => {
    setLessonsToMark(lessonsToMark.splice(lessonsToMark.indexOf((l) => l.id === lesson.id), 1));
  };
  // TODO: make the button disappear when it should
  const sendAttendancePost = (lesson) => new Promise((resolve, reject) => {
    console.info(`Marking attendance for lesson ${lesson.id}`);
    markAttendance(lesson.id)
      .then((data) => {
        if (data.error) throw new Error(data.error);
        resolve();
        setTimeout(() => {
          removeLessonFromArray(lesson);
        }, 800);
      })
      .catch((err) => {
        reject(new Error(`Error in sendAttendancePost: ${JSON.stringify(err)}`));
      });
  });

  const openRegisterModal = async (lesson) => {
    console.info('Register Modal Opened!');
    setLessonRegister(lesson);
  };

  const registerComplete = async (lesson) => {
    console.info('Register complete!');
    // setRegisterOpen(false);
    play();
    setTimeout(() => {
      removeLessonFromArray(lesson);
    }, 800);
  };

  useEffect(() => {
    setLessonsToMark(lessons);
  });

  if (!lessons) return <div>Loading...</div>;

  return (
    <div className={`${lessonsToMark.length > 0 ? 'w-full flex-col' : 'hidden h-0'} ${className}`}>
      {lessonsToMark.map((l) => {
        let clickAction;
        let textChild;
        if (true) {
          // the take register button for lecturers/teachers
          textChild = (
            <div>
              Take Register
              <div className="text-base">{l.summary}</div>
            </div>
          );
        } else {
          textChild = (
            <div>
              Mark Attendance
              <div className="text-base">{l.summary}</div>
            </div>
          );
        }
        console.log(l);
        return (
          <Button
            text={textChild}
            key={l.id}
            lesson={l}
            clickAction={() => openRegisterModal(l)}
          />
        );
      })}
      <BulkAttendanceModal
        open={lessonRegister !== false}
        lesson={lessonRegister}
        onClose={() => setLessonRegister(false)}
        doneResolve={() => registerComplete(lessonRegister)}
      />
    </div>

  );
};

export default AttendanceButtonContainer;
