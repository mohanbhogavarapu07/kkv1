import React from 'react';
import { useAssessmentUser } from '../hooks/useAssessmentUser';
import SendResultsButton from './SendResultsButton';

interface BaseAssessmentProps {
  assessmentType: string;
  children: React.ReactNode;
  onResultsReady?: (results: string) => void;
}

const BaseAssessment: React.FC<BaseAssessmentProps> = ({
  assessmentType,
  children,
  onResultsReady
}) => {
  const userData = useAssessmentUser();
  const [results, setResults] = React.useState<string>('');

  React.useEffect(() => {
    if (onResultsReady) {
      onResultsReady(results);
    }
  }, [results, onResultsReady]);

  if (!userData) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Please start the assessment from the main page to access your results.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {children}
      
      {results && (
        <div className="mt-8 text-center">
          <SendResultsButton
            email={userData.email}
            name={userData.name}
            assessmentType={assessmentType}
            results={results}
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default BaseAssessment; 