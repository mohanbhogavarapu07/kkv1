import { jsPDF } from 'jspdf';

interface SendEmailParams {
  email: string;
  assessmentType: string;
  results: any;
  pdfContent: jsPDF;
}

export const sendAssessmentResults = async ({
  email,
  assessmentType,
  results,
  pdfContent
}: SendEmailParams): Promise<void> => {
  try {
    // Convert PDF to base64
    const pdfBase64 = pdfContent.output('datauristring').split(',')[1];

    const response = await fetch('http://localhost:5000/api/email/send-assessment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        assessmentType,
        results,
        pdfBase64
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 