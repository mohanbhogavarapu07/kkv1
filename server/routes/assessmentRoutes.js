import express from 'express';
import Assessment from '../models/Assessment.js';

const router = express.Router();

// Start a new assessment
router.post('/start', async (req, res) => {
  try {
    const { name, email, gender, assessmentType } = req.body;

    if (!name || !email || !gender || !assessmentType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const assessment = new Assessment({
      name,
      email,
      gender,
      assessmentType,
      attempted: true
    });

    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    console.error('Error starting assessment:', error);
    res.status(500).json({ message: 'Error starting assessment', error: error.message });
  }
});

// Complete an assessment
router.put('/complete/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    assessment.status = 'completed';
    assessment.completedAt = new Date();
    await assessment.save();

    res.json(assessment);
  } catch (error) {
    console.error('Error completing assessment:', error);
    res.status(500).json({ message: 'Error completing assessment', error: error.message });
  }
});

// Get all assessments (for admin purposes)
router.get('/all', async (req, res) => {
  try {
    const assessments = await Assessment.find()
      .sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ message: 'Error fetching assessments', error: error.message });
  }
});

export default router; 