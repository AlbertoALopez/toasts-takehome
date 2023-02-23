import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { SubmissionContext } from './contexts/useSubmissionContext';

export default function Content() {
  const { submissions } = useContext(SubmissionContext);

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
        <Paper>
          {submissions.map(submission => (
            <li key={submission.id} >
              <span>
                {submission.data.email}
              </span>
            </li>
          ))}
        </Paper>
      </Typography>
    </Box>
  );
}
