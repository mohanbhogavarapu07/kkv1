import React from 'react';
import { toast } from 'sonner';

interface SendResultsButtonProps {
  email: string;
  name: string;
  assessmentType: string;
  results: string;
  className?: string;
}

const SendResultsButton: React.FC<SendResultsButtonProps> = ({
  email,
  name,
  assessmentType,
  results,
  className = ''
}) => {
  const handleSendResults = async () => {
    try {
      const response = await fetch('https://kk-backend-wra3.onrender.com/api/assessment/send-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          assessmentType,
          results
        }),
      });

      if (response.ok) {
        toast.success('Results sent to your email!');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to send results');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error sending results');
    }
  };

  return (
    <button
      onClick={handleSendResults}
      className={`bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors ${className}`}
    >
      Send Results to Email
    </button>
  );
};

export default SendResultsButton; 