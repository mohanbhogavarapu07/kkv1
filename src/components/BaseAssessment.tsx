import React from 'react';
import { useAssessmentUser } from '../hooks/useAssessmentUser';
import SendResultsButton from './SendResultsButton';
import { Alert, AlertDescription } from './ui/alert';
import { AlertTriangle } from 'lucide-react';

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
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (onResultsReady) {
      onResultsReady(results);
    }
  }, [results, onResultsReady]);

  if (!userData) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please start the assessment from the main page to access your results. Your session data might have expired or been cleared.
          </AlertDescription>
        </Alert>
        <div className="text-center">
          <a 
            href="/tools/assessments" 
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Go to Assessments
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
        <div className="text-center">
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {children}
      
      {results && (
        <div className="mt-8 text-center">
          <SendResultsButton
            email={userData.userData.email}
            name={userData.userData.name}
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