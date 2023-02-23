import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { ToastContext } from '../contexts/toastContext';

export default function Toast() {
  const { toast, handleClose, open } = useContext(ToastContext);

  const onLikeClick = () => {
    toast.callback();
    handleClose();
  };

  if (!open) return null;

  return (
    <Snackbar
      key={toast.id}
      open={open}
      onClose={handleClose}
      message={toast.message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      action={
        <>
          <Button color="secondary" size="small" onClick={onLikeClick}>
            LIKE
          </Button>
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </>
      }
    />
  );
}
