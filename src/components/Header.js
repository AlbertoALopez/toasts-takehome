import React, { useContext } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import { SubmissionContext } from '../contexts/submissionContext';
import { ToastContext } from '../contexts/toastContext';

export default function Header() {
  const { newSubmission, addSavedSubmission } = useContext(SubmissionContext);
  const { openToast } = useContext(ToastContext);

  const createNewSubmission = () => {
    const submission = newSubmission();
    const message = `${submission.data.firstName} ${submission.data.lastName} ${submission.data.email}`;
    const saveSubmission = () => addSavedSubmission(submission);
    openToast({ message, callback: saveSubmission, id: submission.id });
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{marginRight: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{flexGrow: 1}}>
            Toast Exercise
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={createNewSubmission}
          >
            New Submission
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
