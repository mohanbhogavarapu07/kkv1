import express from 'express';
import Assessment from '../models/Assessment.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Start a new assessment
router.post('/start', async (req, res) => {
  try {
    const { name, age, gender, assessmentType } = req.body;

    if (!name || !age || !gender || !assessmentType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Get total questions for this assessment type
    const totalQuestions = getTotalQuestions(assessmentType);

    const assessment = new Assessment({
      name,
      age,
      gender,
      assessmentType,
      status: 'started',
      progress: {
        currentQuestion: 0,
        totalQuestions,
        percentage: 0
      },
      timeSpent: {
        startTime: new Date()
      },
      sessionId: uuidv4()
    });

    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    console.error('Error starting assessment:', error);
    res.status(500).json({ message: 'Error starting assessment', error: error.message });
  }
});

// Update assessment progress
router.put('/progress/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { questionId, answer, currentQuestion } = req.body;

    const assessment = await Assessment.findOne({ sessionId });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    // Update progress
    assessment.status = 'in_progress';
    assessment.progress.currentQuestion = currentQuestion;
    assessment.progress.percentage = Math.min((currentQuestion / assessment.progress.totalQuestions) * 100, 100);

    // Add answer if not already present
    const existingAnswerIndex = assessment.answers.findIndex(a => a.questionId === questionId);
    if (existingAnswerIndex === -1) {
      assessment.answers.push({
        questionId,
        answer,
        timestamp: new Date()
      });
    } else {
      assessment.answers[existingAnswerIndex].answer = answer;
      assessment.answers[existingAnswerIndex].timestamp = new Date();
    }

    await assessment.save();
    res.json(assessment);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
});

// Complete assessment
router.put('/complete/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { results } = req.body;

    if (!results) {
      return res.status(400).json({ message: 'Results are required' });
    }

    const assessment = await Assessment.findOne({ sessionId });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    // Calculate time spent
    const endTime = new Date();
    const totalDuration = (endTime - assessment.timeSpent.startTime) / 1000; // in seconds

    // Update assessment
    assessment.status = 'completed';
    assessment.progress.percentage = 100;
    assessment.progress.currentQuestion = assessment.progress.totalQuestions;
    assessment.results = results;
    assessment.timeSpent.endTime = endTime;
    assessment.timeSpent.totalDuration = totalDuration;

    await assessment.save();
    res.json(assessment);
  } catch (error) {
    console.error('Error completing assessment:', error);
    res.status(500).json({ message: 'Error completing assessment', error: error.message });
  }
});

// Mark assessment as abandoned
router.put('/abandon/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { reason } = req.body;

    const assessment = await Assessment.findOne({ sessionId });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    // Only mark as abandoned if not already completed
    if (assessment.status !== 'completed') {
      assessment.status = 'abandoned';
      if (reason) {
        assessment.abandonReason = reason;
      }
      await assessment.save();
    }

    res.json(assessment);
  } catch (error) {
    console.error('Error abandoning assessment:', error);
    res.status(500).json({ message: 'Error abandoning assessment', error: error.message });
  }
});

// Get assessment analytics
router.get('/analytics', async (req, res) => {
  try {
    const { startDate, endDate, assessmentType } = req.query;
    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (assessmentType) {
      query.assessmentType = assessmentType;
    }

    const analytics = await Assessment.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$assessmentType',
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          abandoned: {
            $sum: { $cond: [{ $eq: ['$status', 'abandoned'] }, 1, 0] }
          },
          avgTimeSpent: { $avg: '$timeSpent.totalDuration' },
          avgScore: { $avg: '$results.totalScore' }
        }
      }
    ]);

    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

// Update assessment name
router.put('/update-name/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const assessment = await Assessment.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    res.json(assessment);
  } catch (error) {
    console.error('Error updating assessment name:', error);
    res.status(500).json({ message: 'Error updating assessment name', error: error.message });
  }
});

// Get all assessments for admin analytics
router.get('/', async (req, res) => {
  try {
    const assessments = await Assessment.find()
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    // Transform the data to match the frontend interface
    const transformedAssessments = assessments.map(assessment => ({
      _id: assessment._id,
      userId: assessment.name, // Using name as userId for now
      assessmentType: assessment.assessmentType,
      status: assessment.status,
      progress: assessment.progress.percentage,
      answers: assessment.answers.map(answer => ({
        questionId: answer.questionId,
        answer: answer.answer,
        dimension: assessment.assessmentType // Using assessment type as dimension
      })),
      results: {
        totalScore: assessment.results?.score?.cognitive || 0,
        subscores: assessment.results?.score || {},
        phase: assessment.results?.type ? {
          name: assessment.results.type,
          description: assessment.results.description || ''
        } : undefined
      },
      timeSpent: {
        start: assessment.timeSpent.startTime,
        end: assessment.timeSpent.endTime || new Date()
      },
      createdAt: assessment.createdAt
    }));

    res.json(transformedAssessments);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ message: 'Error fetching assessments', error: error.message });
  }
});

// Helper functions
function getTotalQuestions(assessmentType) {
  const questionCounts = {
    'entrepreneurial-potential': 20,
    'productivity-style': 25,
    'emotional-intelligence': 25,
    'resilience-score': 20,
    'leadership-archetype': 18,
    'burnout-risk': 22,
    'mental-fitness-index': 20
  };
  return questionCounts[assessmentType] || 0;
}

function getPlatform(userAgent) {
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'MacOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
}

function getBrowser(userAgent) {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Unknown';
}

export default router; 