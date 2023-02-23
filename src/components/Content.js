import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';

import { SubmissionContext } from '../contexts/submissionContext';

const StyledList = styled.ul`
  padding: 1rem 2rem;
`;

const Submissions = ({ submissions }) => {
  return (
    <StyledList>
      {submissions.map(submission => (
        <li key={submission.id}>
          <span>
            {submission.data.email}
          </span>
        </li>
      ))}
    </StyledList>
  );
};

export default function Content() {
  const { submissions } = useContext(SubmissionContext);

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Paper>
        <Submissions submissions={submissions} />
      </Paper>
    </Box>
  );
}
