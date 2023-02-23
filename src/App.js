import React from 'react';
import Container from '@mui/material/Container';

import Header from './Header';
import Content from './Content';

import SubmissionProvider from './contexts/useSubmissionContext';

function App() {
  return (
    <>
      <SubmissionProvider>
        <Header />
        <Container>
          <Content />
        </Container>
      </SubmissionProvider>
    </>
  );
}

export default App;
