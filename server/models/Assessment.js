import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
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
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['started', 'completed'],
    default: 'started'
  }
}, {
  timestamps: true
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment; 