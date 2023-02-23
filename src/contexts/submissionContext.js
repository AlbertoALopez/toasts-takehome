import { createContext, useState, useEffect } from 'react';
import {
  fetchLikedFormSubmissions,
  onMessage,
  createMockFormSubmission,
  saveLikedFormSubmission
} from '../service/mockServer';

export const SubmissionContext = createContext(null);

export default function SubmissionProvider({ children }) {
  const [submissions, setSubmissions] = useState([]);

  const newSubmission = () => {
    let data;
    onMessage(response => {
      data = response;
    });
    createMockFormSubmission();

    return data;
  };

  const addSavedSubmission = async submission => {
    await saveLikedFormSubmission(submission)
    setSubmissions(submissions => [...submissions, submission]);
  };

  useEffect(() => {
    async function getSavedFormSubmissions() {
      const { formSubmissions = [] } = await fetchLikedFormSubmissions();
      setSubmissions(formSubmissions);
    }

    getSavedFormSubmissions();
  }, []);

  return (
    <SubmissionContext.Provider
      value={{
        newSubmission,
        addSavedSubmission,
        submissions,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};
