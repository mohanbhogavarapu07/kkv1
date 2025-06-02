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
  attempted: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment; 