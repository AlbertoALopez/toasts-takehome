import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { SubmissionContext } from './contexts/submissionContext';

export default function Content() {
  const { submissions } = useContext(SubmissionContext);

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Paper>
          {submissions.map(submission => (
            <li key={submission.id} >
              <span>
                {submission.data.email}
              </span>
            </li>
          ))}
        </Paper>
    </Box>
  );
}
