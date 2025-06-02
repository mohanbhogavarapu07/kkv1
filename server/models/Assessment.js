import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true,
    enum: ['11 to 17', '18 to 24', '25 to 34', '35 to 44', '45 to 54', '55 to 64', '65+']
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'others']
  },
  assessmentType: {
    type: String,
    required: true,
    enum: [
      'entrepreneurial-potential',
      'productivity-style',
      'emotional-intelligence',
      'resilience-score',
      'leadership-archetype',
      'burnout-risk',
      'mental-fitness-index'
    ]
  },
  status: {
    type: String,
    enum: ['started', 'in_progress', 'completed', 'abandoned'],
    default: 'started'
  },
  progress: {
    currentQuestion: {
      type: Number,
      default: 0
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      default: 0
    }
  },
  answers: [{
    questionId: Number,
    answer: Number,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  results: {
    type: {
      type: String
    },
    chronotype: String,
    description: String,
    timeBlocking: [String],
    tools: [String],
    habits: [String],
    strengths: [String],
    challenges: [String],
    compatibility: {
      works_well_with: [String],
      challenges_with: [String]
    },
    score: {
      cognitive: Number,
      workStyle: Number,
      energy: Number,
      focus: Number,
      toolUsage: Number
    }
  },
  timeSpent: {
    startTime: {
      type: Date,
      default: Date.now
    },
    endTime: Date,
    totalDuration: Number // in seconds
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
assessmentSchema.index({ assessmentType: 1, status: 1 });
assessmentSchema.index({ createdAt: -1 });
assessmentSchema.index({ sessionId: 1 });

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;