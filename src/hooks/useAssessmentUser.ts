import { useEffect, useState } from 'react';

interface AssessmentUser {
  name: string;
  email: string;
  gender: string;
  timestamp?: number; // Add timestamp to track data freshness
}

const STORAGE_KEY = 'assessmentUserData';
const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useAssessmentUser = () => {
  const [userData, setUserData] = useState<AssessmentUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData) as AssessmentUser;
        
        // Check if the data is still fresh
        if (parsedData.timestamp && Date.now() - parsedData.timestamp > MAX_AGE) {
          // Data is too old, clear it
          localStorage.removeItem(STORAGE_KEY);
          setUserData(null);
          setError('Your session has expired. Please start the assessment again.');
          return;
        }

        setUserData(parsedData);
      }
    } catch (err) {
      console.error('Error reading assessment user data:', err);
      setError('Failed to load your assessment data. Please try again.');
      // Clear potentially corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const saveUserData = (data: AssessmentUser) => {
    try {
      const dataWithTimestamp = {
        ...data,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp));
      setUserData(dataWithTimestamp);
      setError(null);
    } catch (err) {
      console.error('Error saving assessment user data:', err);
      setError('Failed to save your assessment data. Please try again.');
    }
  };

  const clearUserData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setUserData(null);
      setError(null);
    } catch (err) {
      console.error('Error clearing assessment user data:', err);
      setError('Failed to clear your assessment data. Please try again.');
    }
  };

  return {
    userData,
    error,
    saveUserData,
    clearUserData
  };
}; 