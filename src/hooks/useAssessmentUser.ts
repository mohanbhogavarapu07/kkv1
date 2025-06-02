import { useEffect, useState } from 'react';

interface AssessmentUser {
  name: string;
  email: string;
  gender: string;
}

export const useAssessmentUser = () => {
  const [userData, setUserData] = useState<AssessmentUser | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('assessmentUserData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return userData;
}; 