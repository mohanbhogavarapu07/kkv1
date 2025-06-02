import React, { createContext, useContext, useState, useEffect } from 'react';

interface AssessmentContextType {
  sessionId: string | null;
  startAssessment: (assessmentType: string) => Promise<void>;
  updateProgress: (questionId: number, answer: number, currentQuestion: number) => Promise<void>;
  completeAssessment: (results: any) => Promise<void>;
  abandonAssessment: (reason?: string) => Promise<void>;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const startAssessment = async (assessmentType: string) => {
    try {
      const userName = localStorage.getItem('userName');
      const userAge = localStorage.getItem('userAge');
      const userGender = localStorage.getItem('userGender');

      if (!userName || !userAge || !userGender) {
        throw new Error('User data not found. Please start from the assessments page.');
      }

      const response = await fetch('/api/assessment/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          age: userAge,
          gender: userGender,
          assessmentType
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start assessment');
      }

      const data = await response.json();
      setSessionId(data.sessionId);
    } catch (error) {
      console.error('Error starting assessment:', error);
      throw error;
    }
  };

  const updateProgress = async (questionId: number, answer: number, currentQuestion: number) => {
    if (!sessionId) return;

    try {
      await fetch(`/api/assessment/progress/${sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          answer,
          currentQuestion
        }),
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const completeAssessment = async (results: any) => {
    if (!sessionId) return;

    try {
      await fetch(`/api/assessment/complete/${sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ results }),
      });
      setSessionId(null);
    } catch (error) {
      console.error('Error completing assessment:', error);
    }
  };

  const abandonAssessment = async (reason?: string) => {
    if (!sessionId) return;

    try {
      await fetch(`/api/assessment/abandon/${sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });
      setSessionId(null);
    } catch (error) {
      console.error('Error abandoning assessment:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sessionId) {
        abandonAssessment('User left the page');
      }
    };
  }, [sessionId]);

  return (
    <AssessmentContext.Provider
      value={{
        sessionId,
        startAssessment,
        updateProgress,
        completeAssessment,
        abandonAssessment
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}; 