import React, { useContext } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import ToastProvider, { ToastContext } from '../../contexts/toastContext';

const mockCallback = jest.fn();

const mockToast = {
  message: 'Meow',
  id: 1,
  callback: mockCallback,
};

const TestComponent = () => {
  const { open, toast, handleClose, openToast } = useContext(ToastContext);

  const handleClick = () => openToast({
    message: mockToast.message,
    id: mockToast.id,
    callback: mockToast.callback,
  });

  if (!open) return <button data-testid="open-toast" onClick={handleClick} />;

  return (
    <>
      <button data-testid="toast-message">
        {toast.message}
      </button>
      <button data-testid="toast-close" onClick={handleClose} />
      <button data-testid="toast-callback" onClick={toast.callback} />
    </>
  );
};

test('ToastContext returns default values', () => {
  render(<ToastProvider><TestComponent /></ToastProvider>);

  expect(screen.queryByTestId('toast-message')).toBeFalsy();
});

describe('ToastContext values', () => {
  beforeEach(() => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const openToastBtn = screen.getByTestId('open-toast');
    userEvent.click(openToastBtn);
  });

  test('ToastContext should provide a method for opening a toast', () => {
    expect(screen.queryByTestId('toast-message')).toHaveTextContent(mockToast.message);
  });

  test('ToastContext should handle dismissing a toast', () => {
    userEvent.click(screen.queryByTestId('toast-close'));
    expect(screen.queryByTestId('toast-message')).toBeFalsy();
  });

  test('ToastContext should pass a callback for toast CTA', () => {
    userEvent.click(screen.queryByTestId('toast-callback'));
    expect(mockCallback).toHaveBeenCalled();
  });
});
