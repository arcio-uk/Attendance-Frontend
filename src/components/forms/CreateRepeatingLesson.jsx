import React from 'react';
import Stack from '@mui/material/Stack';
import Textfield from '@/components/ui/Textfield';
import TimeSelector from '@/components/ui/TimeSelector';

const CreateRepeatingLesson = () => (
  <div className="text-2xl my-2 md:my-4 p-2 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-600 text-zinc-100">
    <div className="text-shadow-xl">Create New Repeating Lesson</div>
    <hr className="rounded-full border-2" />
    <Stack spacing={3}>
      <Textfield name="Module" type="Module" label="Module" />
      <TimeSelector label="Start Time" min={new Date(0, 0, 0, 9)} max={new Date(0, 0, 0, 18)} />
      <TimeSelector label="Finish Time" min={new Date(0, 0, 0, 9)} max={new Date(0, 0, 0, 18)} />
    </Stack>
  </div>
);

export default CreateRepeatingLesson;
