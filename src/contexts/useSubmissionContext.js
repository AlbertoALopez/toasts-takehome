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

  const addSubmission = async () => {
    let data;
    onMessage(response => {
      debugger;
      data = response;
    });
    createMockFormSubmission();
    debugger;
    await saveLikedFormSubmission(data);
    // setSubmissions(submissions => [...submissions, data]);
  };


  const removeSubmission = async (id) => {
    const newSubmissions = submissions.filter(t => t.id === id);

    try {
      await saveLikedFormSubmission(newSubmissions);
      setSubmissions(newSubmissions)
    } catch {
      debugger;
    }
  };

  useEffect(() => {
    async function getSavedFormSubmissions() {
      const { formSubmissions = [] } = await fetchLikedFormSubmissions();
      debugger;
      setSubmissions(formSubmissions);
    }

    getSavedFormSubmissions();
  }, []);

  return (
    <SubmissionContext.Provider
      value={{
        addSubmission,
        removeSubmission,
        submissions,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};
