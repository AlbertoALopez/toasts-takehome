import React from 'react';
import Container from '@mui/material/Container';

import Header from './Header';
import Content from './Content';
import Toast from './Toast';

import SubmissionProvider from '../contexts/submissionContext';
import ToastProvider from '../contexts/toastContext';

function App() {
  return (
    <>
      <SubmissionProvider>
        <ToastProvider>
          <Header />
          <Container>
            <Content />
          </Container>
          <Toast />
        </ToastProvider>
      </SubmissionProvider>
    </>
  );
}

export default App;
