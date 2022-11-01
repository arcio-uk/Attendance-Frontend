import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router';
import { useModules } from '@/state/ModuleState';

const StudentModule = () => {
  const { moduleId } = useParams();
  const { getModuleName } = useModules();
  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollIntoView();
  }, [moduleId]);

  return (
    <div className="my-2 md:my-4 p-2 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-600 text-zinc-100" ref={ref}>
      <div className="font-medium text-3xl text-shadow-md p-2">
        {getModuleName(moduleId)}
      </div>
      <div className="text-3xl text-shadow-md p-2">Module Group</div>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Hi there</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
export default StudentModule;
