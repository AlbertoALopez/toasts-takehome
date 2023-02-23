import React, { useContext } from 'react';

import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import SubmissionProvider, { SubmissionContext } from '../../contexts/submissionContext';

jest.mock('../../service/mockServer', () => {
  const module = jest.requireActual('../../service/mockServer');

  const mockSubmissions = [{
    data: {
      email: 'Meow',
    },
    id: 1,
  }];

  return {
    __esModule: true,
    ...module,
    fetchLikedFormSubmissions: () => Promise.resolve({ formSubmissions: mockSubmissions }),
    saveLikedFormSubmission: () => Promise.resolve(),
  };
});

const mockNewSubmission = jest.fn();

const TestComponent = () => {
  const { newSubmission, addSavedSubmission, submissions } = useContext(SubmissionContext);

  const handleNew = () => {
    const data = newSubmission();
    mockNewSubmission(data);
  };

  const handleAdd = () => {
    addSavedSubmission({
      data: {
        email: 'Woof',
      },
      id: 2,
    });
  };

  return (
    <>
      <div data-testid="submissions">
        {submissions.map(t => <div key={t.id}>{t.data.email}</div>)}
      </div>
      <button data-testid="new-submission" onClick={handleNew} />
      <button data-testid="add-saved-submission" onClick={handleAdd} />
    </>
  );
};

describe('SubmissionContext', () => {
  beforeEach(async () => {
    await act(async () => render(
      <SubmissionProvider>
        <TestComponent />
      </SubmissionProvider>
    ));
  });

  it('should fetch a list of saved submissions on load', async () => {
    expect(screen.queryByText('Meow')).toBeTruthy();
  });

  it('should provide a method to create a new submission and return its data', () => {
    userEvent.click(screen.getByTestId('new-submission'));
    expect(mockNewSubmission).toHaveBeenCalled();
  });

  it('should provide a method to add a saved submission', async () => {
    await act(async () => userEvent.click(screen.getByTestId('add-saved-submission')));

    expect(screen.queryByText('Woof')).toBeTruthy();
  });
});
