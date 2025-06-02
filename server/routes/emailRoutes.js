import express from 'express';
import { sendAssessmentResultsEmail } from '../utils/emailService.js';

const router = express.Router();

// Send assessment results via email
router.post('/send-assessment', async (req, res) => {
  try {
    const { email, assessmentType, results, pdfBase64 } = req.body;

    if (!email || !assessmentType || !results) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const success = await sendAssessmentResultsEmail({
      to: email,
      name: email.split('@')[0], // Use part before @ as name
      assessmentType,
      results: JSON.stringify(results, null, 2),
      pdfBase64
    });

    if (success) {
      res.json({ message: 'Email sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send email' });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

export default router; 