import React, { useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip
} from 'recharts';
import { ArrowLeft, ArrowRight, Brain, BookOpen, Calendar, RotateCcw, CheckCircle, Activity, Heart, Users, Zap, Download, Mail, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import jsPDF from 'jspdf';

// =========================
// 🧾 Types & Interfaces
// =========================
type EQCategory =
  | 'self-awareness'
  | 'self-regulation'
  | 'motivation'
  | 'empathy'
  | 'relationship-management';

interface Question {
  id: number;
  text: string;
  category: EQCategory;
  options: {
    text: string;
    score: number;
  }[];
}

interface IntroductionProps {
  onStart: () => void;
}

interface QuestionProps {
  question: Question;
  onAnswer: (questionId: number, score: number) => void;
  currentAnswer: number | undefined;
}

interface QuestionContainerProps {
  questions: Question[];
  onComplete: (answers: Record<number, number>) => void;
  onBack: () => void;
}

interface ResultsProps {
  totalScore: number;
  categoryScores: Record<string, number>;
  persona: {
    type: string;
    description: string;
  };
  growthPlan: {
    focusAreas: string[];
    sevenDayPlan: {
      area1: { name: string; plan: string[] };
      area2: { name: string; plan: string[] };
    };
    exercises: string[];
    mindfulnessPractices: string[];
    recommendedResources: string[];
  };
  onRestart: () => void;
}

// =========================
// 🧠 Utility Functions
// =========================
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

function formatCategoryName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// =========================
// 📊 Data: Questions & Logic
// =========================

// --- Questions Array ---
const questions: Question[] = [
  {
    id: 1,
    text: "How often do you reflect on why you felt a certain way during the day?",
    category: "self-awareness",
    options: [
      { text: "Multiple times daily", score: 4 },
      { text: "Once a day", score: 3 },
      { text: "A few times a week", score: 2 },
      { text: "Rarely", score: 1 },
      { text: "Almost never", score: 0 },
    ]
  },
  {
    id: 2,
    text: "When you feel a strong emotion (anger, joy, anxiety), how easy is it for you to name exactly what you're feeling?",
    category: "self-awareness",
    options: [
      { text: "Very easy - I can pinpoint the specific emotion", score: 4 },
      { text: "Somewhat easy - I can identify the general feeling", score: 3 },
      { text: "Neutral", score: 2 },
      { text: "Somewhat difficult", score: 1 },
      { text: "Very difficult - I just know I feel 'good' or 'bad'", score: 0 },
    ]
  },
  {
    id: 3,
    text: "How accurately can you predict how you'll emotionally respond to future situations?",
    category: "self-awareness",
    options: [
      { text: "Very accurately", score: 4 },
      { text: "Somewhat accurately", score: 3 },
      { text: "Sometimes accurately", score: 2 },
      { text: "Not very accurately", score: 1 },
      { text: "Not at all", score: 0 },
    ]
  },
  {
    id: 4,
    text: "When under stress, I tend to:",
    category: "self-awareness",
    options: [
      { text: "Immediately recognize I'm stressed and identify the cause", score: 4 },
      { text: "Notice my stress after a short while", score: 3 },
      { text: "Only realize I'm stressed when someone points it out", score: 2 },
      { text: "Only recognize my stress after it becomes overwhelming", score: 1 },
      { text: "Deny or ignore feelings of stress", score: 0 },
    ]
  },
  {
    id: 5,
    text: "How often do you seek feedback about your emotional impact on others?",
    category: "self-awareness",
    options: [
      { text: "Regularly and proactively", score: 4 },
      { text: "Sometimes, when I think it's needed", score: 3 },
      { text: "Only during formal reviews", score: 2 },
      { text: "Rarely", score: 1 },
      { text: "Never", score: 0 },
    ]
  },
  {
    id: 6,
    text: "When something upsets you, how long does it typically take to regain emotional balance?",
    category: "self-regulation",
    options: [
      { text: "Minutes - I can rebalance quickly", score: 4 },
      { text: "About an hour", score: 3 },
      { text: "A few hours", score: 2 },
      { text: "A day or more", score: 1 },
      { text: "Several days", score: 0 },
    ]
  },
  {
    id: 7,
    text: "When someone disagrees with you, what's your internal reaction?",
    category: "self-regulation",
    options: [
      { text: "Curiosity about their perspective", score: 4 },
      { text: "Brief frustration, then openness", score: 3 },
      { text: "Defensive but I try to listen", score: 2 },
      { text: "Strong disagreement and desire to convince them", score: 1 },
      { text: "Anger or immediate dismissal", score: 0 },
    ]
  },
  {
    id: 8,
    text: "When faced with a high-pressure situation, how do you typically respond?",
    category: "self-regulation",
    options: [
      { text: "I remain calm and think clearly", score: 4 },
      { text: "I feel pressure but manage it effectively", score: 3 },
      { text: "I become somewhat anxious but function", score: 2 },
      { text: "I become noticeably stressed and less effective", score: 1 },
      { text: "I feel overwhelmed and struggle to cope", score: 0 },
    ]
  },
  {
    id: 9,
    text: "How often do you use specific techniques (breathing, pause, etc.) to manage emotions?",
    category: "self-regulation",
    options: [
      { text: "Regularly, as part of my daily routine", score: 4 },
      { text: "Often, especially in challenging situations", score: 3 },
      { text: "Sometimes, when I remember", score: 2 },
      { text: "Rarely", score: 1 },
      { text: "Never", score: 0 },
    ]
  },
  {
    id: 10,
    text: "When receiving criticism, how do you typically respond?",
    category: "self-regulation",
    options: [
      { text: "Listen carefully and respond thoughtfully", score: 4 },
      { text: "Feel initially defensive but open to feedback", score: 3 },
      { text: "Variable - depends on who's giving criticism", score: 2 },
      { text: "Become defensive or justify my actions", score: 1 },
      { text: "React emotionally or reject the criticism", score: 0 },
    ]
  },
  {
    id: 11,
    text: "What drives you most when pursuing challenging goals?",
    category: "motivation",
    options: [
      { text: "Personal growth and meaningful achievement", score: 4 },
      { text: "A mix of personal satisfaction and recognition", score: 3 },
      { text: "Recognition and rewards", score: 2 },
      { text: "Avoiding negative consequences or failure", score: 1 },
      { text: "External pressure or obligation", score: 0 },
    ]
  },
  {
    id: 12,
    text: "When facing a major setback, how do you typically respond?",
    category: "motivation",
    options: [
      { text: "View it as a learning opportunity and persist", score: 4 },
      { text: "Feel disappointed but quickly refocus", score: 3 },
      { text: "Take some time to recover then continue", score: 2 },
      { text: "Feel discouraged and question continuing", score: 1 },
      { text: "Give up or look for an easier alternative", score: 0 },
    ]
  },
  {
    id: 13,
    text: "How easy is it for you to maintain enthusiasm on long-term projects?",
    category: "motivation",
    options: [
      { text: "Very easy - I stay consistently engaged", score: 4 },
      { text: "Mostly easy - with occasional dips in motivation", score: 3 },
      { text: "Moderate - I have regular ups and downs", score: 2 },
      { text: "Difficult - my motivation often fades", score: 1 },
      { text: "Very difficult - I struggle with sustained effort", score: 0 },
    ]
  },
  {
    id: 14,
    text: "How often do you try new approaches or skills outside your comfort zone?",
    category: "motivation",
    options: [
      { text: "Regularly - I actively seek growth opportunities", score: 4 },
      { text: "Often - when good opportunities arise", score: 3 },
      { text: "Sometimes - when necessary", score: 2 },
      { text: "Rarely - I prefer staying with what I know", score: 1 },
      { text: "Almost never - I avoid unfamiliar situations", score: 0 },
    ]
  },
  {
    id: 15,
    text: "How do you approach tasks that don't interest you but are necessary?",
    category: "motivation",
    options: [
      { text: "Find meaning or learning opportunities within them", score: 4 },
      { text: "Focus on the bigger purpose they serve", score: 3 },
      { text: "Just get them done efficiently", score: 2 },
      { text: "Procrastinate but eventually complete them", score: 1 },
      { text: "Avoid them or do minimal effort", score: 0 },
    ]
  },
  {
    id: 16,
    text: "What's your first instinct when someone shares bad news or distress?",
    category: "empathy",
    options: [
      { text: "Listen attentively and try to understand their feelings", score: 4 },
      { text: "Show concern and offer support", score: 3 },
      { text: "Offer advice or solutions", score: 2 },
      { text: "Acknowledge briefly and move on", score: 1 },
      { text: "Feel uncomfortable and change the subject", score: 0 },
    ]
  },
  {
    id: 17,
    text: "How accurately can you identify others' emotions from their body language?",
    category: "empathy",
    options: [
      { text: "Very accurately - I notice subtle cues", score: 4 },
      { text: "Quite accurately - I notice obvious signs", score: 3 },
      { text: "Somewhat accurately", score: 2 },
      { text: "Not very accurately", score: 1 },
      { text: "I rarely notice body language cues", score: 0 },
    ]
  },
  {
    id: 18,
    text: "In disagreements, how well do you understand others' perspectives?",
    category: "empathy",
    options: [
      { text: "Very well - I can articulate their position fairly", score: 4 },
      { text: "Well - I try to see where they're coming from", score: 3 },
      { text: "Moderately - I understand major points", score: 2 },
      { text: "Somewhat - but I focus more on my view", score: 1 },
      { text: "Not well - I focus on why they're wrong", score: 0 },
    ]
  },
  {
    id: 19,
    text: "How comfortable are you with others expressing strong emotions?",
    category: "empathy",
    options: [
      { text: "Very comfortable - I can be present and supportive", score: 4 },
      { text: "Comfortable - though intense anger may be challenging", score: 3 },
      { text: "Moderately comfortable with most emotions", score: 2 },
      { text: "Somewhat uncomfortable - I prefer emotional restraint", score: 1 },
      { text: "Very uncomfortable - I avoid emotional situations", score: 0 },
    ]
  },
  {
    id: 20,
    text: "When interacting with people from different backgrounds, how attentive are you to cultural differences in emotional expression?",
    category: "empathy",
    options: [
      { text: "Very attentive - I adapt my interpretation", score: 4 },
      { text: "Quite attentive - I'm aware of major differences", score: 3 },
      { text: "Somewhat attentive", score: 2 },
      { text: "Minimally attentive", score: 1 },
      { text: "Not attentive - I assume emotions are universal", score: 0 },
    ]
  },
  {
    id: 21,
    text: "How do you typically handle conflicts with others?",
    category: "relationship-management",
    options: [
      { text: "Address directly with empathy and openness to resolution", score: 4 },
      { text: "Address with focus on compromise", score: 3 },
      { text: "Address but sometimes struggle to stay calm", score: 2 },
      { text: "Try to avoid confrontation", score: 1 },
      { text: "Become confrontational or withdraw completely", score: 0 },
    ]
  },
  {
    id: 22,
    text: "How comfortable are you sharing your emotions with others?",
    category: "relationship-management",
    options: [
      { text: "Very comfortable with appropriate vulnerability", score: 4 },
      { text: "Comfortable with trusted people", score: 3 },
      { text: "Somewhat comfortable with basic emotions", score: 2 },
      { text: "Uncomfortable - I rarely share feelings", score: 1 },
      { text: "Very uncomfortable - I avoid emotional disclosure", score: 0 },
    ]
  },
  {
    id: 23,
    text: "How do you prepare emotionally before giving difficult feedback?",
    category: "relationship-management",
    options: [
      { text: "Thoughtfully plan with empathy and clear points", score: 4 },
      { text: "Consider how to be constructive and supportive", score: 3 },
      { text: "Focus mainly on delivering the message clearly", score: 2 },
      { text: "Minimal preparation - just deliver the feedback", score: 1 },
      { text: "Avoid giving difficult feedback when possible", score: 0 },
    ]
  },
  {
    id: 24,
    text: "How effective are you at motivating or inspiring others?",
    category: "relationship-management",
    options: [
      { text: "Very effective - I connect to others' values and goals", score: 4 },
      { text: "Effective with most people", score: 3 },
      { text: "Somewhat effective with certain people", score: 2 },
      { text: "Not very effective", score: 1 },
      { text: "Ineffective - I focus on tasks, not motivation", score: 0 },
    ]
  },
  {
    id: 25,
    text: "When someone is struggling emotionally, how do you typically respond?",
    category: "relationship-management",
    options: [
      { text: "Offer presence and support tailored to their needs", score: 4 },
      { text: "Listen and show concern", score: 3 },
      { text: "Try to cheer them up or solve their problem", score: 2 },
      { text: "Acknowledge but feel uncertain how to help", score: 1 },
      { text: "Feel uncomfortable and distance myself", score: 0 },
    ]
  },
];

// --- Scoring Logic ---
function getCategoryQuestions(category: EQCategory) {
  return questions.filter(q => q.category === category);
}

function calculateCategoryScore(answers: Record<number, number>, category: EQCategory) {
  const categoryQuestions = getCategoryQuestions(category);
  if (categoryQuestions.length === 0) return 0;
  let totalScore = 0;
  let answeredQuestions = 0;
  categoryQuestions.forEach(question => {
    if (answers[question.id] !== undefined) {
      totalScore += answers[question.id];
      answeredQuestions++;
    }
  });
  // Normalize to 0-20 range
  return answeredQuestions > 0 
    ? Math.round((totalScore / (answeredQuestions * 4)) * 20) 
    : 0;
}

function calculateTotalScore(categoryScores: Record<string, number>) {
  const categories: EQCategory[] = [
    'self-awareness',
    'self-regulation',
    'motivation',
    'empathy',
    'relationship-management'
  ];
  let total = 0;
  categories.forEach(category => {
    total += categoryScores[category] || 0;
  });
  return total;
}

function getEQPersona(categoryScores: Record<string, number>) {
  const categories = [
    { name: 'self-awareness', score: categoryScores['self-awareness'] || 0 },
    { name: 'self-regulation', score: categoryScores['self-regulation'] || 0 },
    { name: 'motivation', score: categoryScores['motivation'] || 0 },
    { name: 'empathy', score: categoryScores['empathy'] || 0 },
    { name: 'relationship-management', score: categoryScores['relationship-management'] || 0 }
  ];
  categories.sort((a, b) => b.score - a.score);
  const totalScore = calculateTotalScore(categoryScores);
  if (totalScore >= 86) {
    return {
      type: "EQ-Driven Leader",
      description: "You excel at understanding and managing both your own emotions and those of others. You leverage emotional intelligence strategically in leadership and relationships, making you highly effective at navigating complex interpersonal dynamics."
    };
  }
  if (totalScore >= 66) {
    if (categories[0].name === 'empathy' || categories[1].name === 'empathy') {
      if (categories[0].name === 'self-awareness' || categories[1].name === 'self-awareness') {
        return {
          type: "Reflective Empath",
          description: "You combine strong self-awareness with genuine empathy, making you highly attuned to both your own emotional landscape and the feelings of others. This allows you to form authentic connections while maintaining emotional boundaries."
        };
      }
      if (categories[0].name === 'relationship-management' || categories[1].name === 'relationship-management') {
        return {
          type: "Harmonizing Connector",
          description: "Your empathy and relationship skills allow you to build bridges between people and create harmonious environments. You excel at understanding others' perspectives and facilitating positive interactions."
        };
      }
    }
    if (categories[0].name === 'self-regulation' || categories[1].name === 'self-regulation') {
      return {
        type: "Calm Strategist",
        description: "You excel at emotional regulation and thoughtful responses, even in high-pressure situations. Your ability to stay composed allows you to think clearly and make sound decisions when others might react impulsively."
      };
    }
    if (categories[0].name === 'motivation') {
      return {
        type: "Purpose-Driven Achiever",
        description: "Your strong internal motivation drives you to persist through challenges and inspire others. You find meaning in your work and maintain enthusiasm even during difficult periods."
      };
    }
    return {
      type: "Emotionally Agile",
      description: "You have a well-balanced emotional toolkit that allows you to adapt to various situations. Your ability to understand emotions and respond appropriately makes you effective across different contexts."
    };
  }
  if (totalScore >= 41) {
    if (categories[0].score >= 15) {
      return {
        type: `${categories[0].name === 'self-awareness' ? 'Self-Aware' : categories[0].name === 'empathy' ? 'Empathic' : categories[0].name === 'self-regulation' ? 'Regulated' : categories[0].name === 'motivation' ? 'Motivated' : 'Relationship-Oriented'} Developer`,
        description: `You show particular strength in ${categories[0].name.replace('-', ' ')}, while having room to develop other emotional competencies. By building on this foundation, you can expand your emotional intelligence in complementary areas.`
      };
    }
    return {
      type: "Emotionally Aware",
      description: "You have developed moderate emotional awareness and skills across several dimensions. With continued practice, you can strengthen your emotional intelligence into a more powerful tool for personal and professional growth."
    };
  }
  return {
    type: "Emotional Explorer",
    description: "You're at the beginning of your emotional intelligence journey, with opportunities to develop greater awareness and skills. Focusing on self-awareness is an excellent starting point for growth."
  };
}

function getGrowthPlan(categoryScores: Record<string, number>) {
  // Dummy implementation for demonstration; replace with your actual logic if needed
  return {
    focusAreas: ["Self-Awareness", "Empathy"],
    sevenDayPlan: {
      area1: { name: "Self-Awareness", plan: ["Day 1: Reflect on your emotions.", "Day 2: Journal about a recent emotional experience."] },
      area2: { name: "Empathy", plan: ["Day 1: Practice active listening.", "Day 2: Offer support to a friend."] }
    },
    exercises: ["Mindful breathing", "Gratitude journaling"],
    mindfulnessPractices: ["Body scan meditation", "Loving-kindness meditation"],
    recommendedResources: ["Emotional Intelligence by Daniel Goleman", "The Gifts of Imperfection by Brené Brown"]
  };
}

// =========================
// 🌟 UI Components
// =========================
function Button({ children, ...props }: any) {
  return <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 bg-black text-white hover:bg-gray-800" {...props}>{children}</button>;
}

function Card({ children, className = '', ...props }: any) {
  return <div className={`rounded-lg border border-gray-200 bg-white text-black shadow-sm ${className}`} {...props}>{children}</div>;
}

function CardHeader({ children, className = '', ...props }: any) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>{children}</div>;
}

function CardTitle({ children, className = '', ...props }: any) {
  return <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>{children}</h3>;
}

function CardDescription({ children, className = '', ...props }: any) {
  return <p className={`text-sm text-gray-600 ${className}`} {...props}>{children}</p>;
}

function CardContent({ children, className = '', ...props }: any) {
  return <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>;
}

function Badge({ children, className = '', ...props }: any) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-black text-white ${className}`} {...props}>{children}</span>;
}

function Progress({ value, className = '', ...props }: any) {
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`} {...props}>
      <div className="h-full bg-black transition-all" style={{ width: `${value || 0}%` }} />
    </div>
  );
}

// =========================
// 🚀 Main Components
// =========================
const Introduction: React.FC<IntroductionProps> = ({ onStart }) => (
  <div className="min-h-screen bg-white text-black">
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <Card className="border-none shadow-lg bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-black">Emotional Intelligence Assessment</CardTitle>
          <CardDescription className="text-lg mt-2 text-black">
            Discover your emotional awareness, regulation skills, and relationship management abilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-black mb-3">What is Emotional Intelligence?</h2>
            <p className="text-black mb-4">
              Emotional Intelligence (EQ) is your ability to recognize, understand, and manage emotions - both yours and others.
              Research shows EQ is a stronger predictor of success than IQ in leadership and relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-4">
            {["Self-Awareness", "Self-Regulation", "Motivation", "Empathy", "Relationships"].map((dimension, index) => (
              <div key={index} className="bg-black/80 p-3 rounded-md text-center shadow-sm border border-black">
                <span className="text-sm font-medium text-white">{dimension}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-black mb-3">What You'll Discover</h2>
            <ul className="space-y-2 text-black list-disc pl-5">
              <li>Your overall EQ score (0-100)</li>
              <li>Detailed analysis across 5 EQ dimensions</li>
              <li>Your unique EQ persona type</li>
              <li>A customized 7-day growth plan</li>
              <li>Mindfulness practices for daily use</li>
            </ul>
          </div>
        </CardContent>
        <div className="flex justify-center pb-8">
          <Button onClick={onStart} className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-8 rounded-full shadow-md transition-all hover:scale-105" style={{ fontSize: '1.125rem' }}>
            Begin Assessment
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

const AssessmentQuiz: React.FC<QuestionContainerProps> = ({ questions, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  const handleAnswerSelect = (value: number) => setSelectedAnswer(value);
  
  const handleNext = () => {
    if (selectedAnswer !== null) {
      setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: selectedAnswer }));
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        onComplete(answers);
      }
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || null);
    }
  };

  const currentQ = questions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} className="text-gray-500 hover:text-black hover:bg-gray-100 bg-transparent inline-flex items-center px-6 py-3">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-black" />
            <span className="text-xl font-semibold text-black">EQ Assessment</span>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-black-500">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-black-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>
        
        <Card className="bg-white border border-gray-200 mb-8 text-black">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-gray-100 rounded-full">
                <span className="text-black text-sm font-medium">
                  {formatCategoryName(currentQ.category)}
                </span>
              </div>
            </div>
            <CardTitle className="text-2xl text-black leading-relaxed">{currentQ.text}</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <label 
                  key={index} 
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    selectedAnswer === option.score ? 'border-black' : 'border-gray-200'
                  }`}
                >
                  <span className="font-medium">{option.text}</span>
                  <input
                    type="radio"
                    name="answer"
                    value={option.score}
                    checked={selectedAnswer === option.score}
                    onChange={() => handleAnswerSelect(option.score)}
                    className="form-radio h-4 w-4 text-black border-gray-300 focus:ring-black"
                  />
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button onClick={handlePrevious} disabled={currentQuestion === 0} className="border-black text-black hover:bg-gray-100 disabled:text-gray-300 disabled:border-gray-300 bg-white inline-flex items-center px-6 py-3">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={selectedAnswer === null} className="bg-black hover:bg-gray-800 text-white disabled:bg-gray-300 inline-flex items-center px-6 py-3">
            {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const ResultsDashboard: React.FC<ResultsProps> = ({ 
  totalScore, 
  categoryScores, 
  persona, 
  growthPlan, 
  onRestart 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'growth' | 'mindfulness'>('overview');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  
  const dimensionNames: Record<string, string> = {
    'self-awareness': 'Self-Awareness',
    'self-regulation': 'Self-Regulation',
    'motivation': 'Motivation',
    'empathy': 'Empathy',
    'relationship-management': 'Relationship Management',
  };
  
  const chartData = Object.entries(categoryScores).map(([category, score]) => ({
    subject: dimensionNames[category],
    score: score,
    fullMark: 20,
  }));
  
  const categoryIcons: Record<string, JSX.Element> = {
    'self-awareness': <Activity className="w-5 h-5 text-black" />,
    'self-regulation': <Zap className="w-5 h-5 text-black" />,
    'motivation': <Heart className="w-5 h-5 text-black" />,
    'empathy': <Users className="w-5 h-5 text-black" />,
    'relationship-management': <BookOpen className="w-5 h-5 text-black" />
  };

  const handleDownloadResults = () => {
    const doc = new jsPDF();

    // Main Heading
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Emotional Intelligence Results', 105, 20, { align: 'center' });

    // Subheading
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary', 14, 35);

    // Body
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Score: ${totalScore}/100`, 14, 45);
    doc.text(`Persona: ${persona.type}`, 14, 53);
    doc.setFont('helvetica', 'italic');
    doc.text(`"${persona.description}"`, 14, 61, { maxWidth: 180 });

    // Section Heading
    doc.setFont('helvetica', 'bold');
    doc.text('Dimension Scores:', 14, 75);
    doc.setFont('helvetica', 'normal');
    let y = 83;
    Object.entries(categoryScores).forEach(([category, score]) => {
      doc.text(`- ${dimensionNames[category] || category}: ${score}/20`, 18, y);
      y += 8;
    });

    // ...repeat for other sections, using setFont and setFontSize as needed

    doc.save('emotional-intelligence-results.pdf');
  };

  const handleSendToEmail = () => {
    setShowEmailModal(true);
    setEmail("");
    setEmailError("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleEmailSend = () => {
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setShowEmailModal(false);
    // TODO: Implement actual send logic here
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">EQ</span>
            </div>
            <h1 className="text-3xl font-bold text-black">Your Emotional Intelligence Results</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Based on your responses, here's your comprehensive EQ profile and personalized recommendations.
          </p>
        </div>
        
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center border border-gray-200">
                  <span className="text-4xl font-bold text-black">{totalScore}</span>
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl text-black">Emotional Quotient</CardTitle>
            <Badge className="bg-black text-white text-lg px-8 py-3 rounded-md font-medium cursor-default select-none pointer-events-none">
              {persona.type}
            </Badge>
            <p className="text-gray-600 mt-2">{persona.description}</p>
          </CardHeader>
        </Card>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {Object.entries(categoryScores).map(([category, score]) => (
            <Card key={category} className="bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  {categoryIcons[category]}
                  <CardTitle className="text-sm text-black">
                    {dimensionNames[category]}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-black mb-2">{score}/20</div>
                <Progress value={(score / 20) * 100} />
                <p className="text-xs text-gray-500 mt-2">
                  {dimensionNames[category]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex space-x-2 mb-4 border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'growth' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('growth')}
          >
            7-Day Plan
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'mindfulness' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('mindfulness')}
          >
            Mindfulness
          </button>
        </div>
        
        {activeTab === 'overview' && (
          <div className="mb-8">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black text-xl">EQ Dimensions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 20]} />
                      <Radar name="Score" dataKey="score" stroke="#000" fill="#888" fillOpacity={0.6} />
                      <RechartsTooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {growthPlan.focusAreas.map((strength, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-black"></div>
                        <span className="text-black">{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    Growth Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {growthPlan.exercises.map((opportunity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span className="text-black">{opportunity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'growth' && (
          <div className="mb-8">
            <Card className="bg-white border border-gray-200 mb-6">
              <CardHeader>
                <CardTitle className="text-black text-xl">Your 7-Day Growth Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg text-black mb-3">
                      {growthPlan.sevenDayPlan.area1.name}
                    </h3>
                    <ol className="space-y-2">
                      {growthPlan.sevenDayPlan.area1.plan.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                          <span className="text-black">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg text-black mb-3">
                      {growthPlan.sevenDayPlan.area2.name}
                    </h3>
                    <ol className="space-y-2">
                      {growthPlan.sevenDayPlan.area2.plan.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                          <span className="text-black">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black text-xl">Recommended Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {growthPlan.recommendedResources.map((res, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                      <span className="text-black">{res}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'mindfulness' && (
          <Card className="bg-white border border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-black text-xl">Mindfulness Toolkit</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {growthPlan.mindfulnessPractices.map((practice, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                    <span className="text-black">{practice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRestart} className="px-4 py-2 text-base min-w-[120px] bg-white text-black border border-black hover:bg-gray-100 transition-colors inline-flex items-center">
            <RefreshCcw className="w-5 h-5 mr-2" />
            Retake Assessment
          </Button>
          <Button onClick={handleDownloadResults} className="px-4 py-2 text-base min-w-[120px] bg-white text-black border border-black hover:bg-gray-100 transition-colors inline-flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Download Results
          </Button>
          <Button onClick={handleSendToEmail} className="px-4 py-2 text-base min-w-[120px] bg-white text-black border border-black hover:bg-gray-100 transition-colors inline-flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Send to Email
          </Button>
        </div>
      </div>
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h2 className="text-xl font-bold mb-4">Send Results to Email</h2>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border rounded-2xl mb-2"
              required
            />
            {emailError && <div className="text-red-500 text-sm mb-2">{emailError}</div>}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 border rounded-2xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEmailSend}
                className="px-4 py-2 bg-black text-white rounded-2xl hover:bg-gray-800 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================
// 🚀 Main App Logic
// =========================
const EmotionalIntelligenceEvaluator = () => {
  const [currentView, setCurrentView] = useState<'intro' | 'assessment' | 'results'>('intro');
  const [results, setResults] = useState<any>(null);
  
  const handleComplete = (answers: Record<number, number>) => {
    const categoryScores = {
      'self-awareness': calculateCategoryScore(answers, 'self-awareness'),
      'self-regulation': calculateCategoryScore(answers, 'self-regulation'),
      'motivation': calculateCategoryScore(answers, 'motivation'),
      'empathy': calculateCategoryScore(answers, 'empathy'),
      'relationship-management': calculateCategoryScore(answers, 'relationship-management')
    };
    
    const totalScore = calculateTotalScore(categoryScores);
    const persona = getEQPersona(categoryScores);
    const growthPlan = getGrowthPlan(categoryScores);
    
    setResults({ totalScore, categoryScores, persona, growthPlan });
    setCurrentView('results');
  };
  
  if (currentView === 'assessment') {
    return (
      <AssessmentQuiz 
        questions={questions} 
        onComplete={handleComplete} 
        onBack={() => setCurrentView('intro')} 
      />
    );
  }
  
  if (currentView === 'results' && results) {
    return (
      <ResultsDashboard 
        totalScore={results.totalScore}
        categoryScores={results.categoryScores}
        persona={results.persona}
        growthPlan={results.growthPlan}
        onRestart={() => setCurrentView('assessment')}
      />
    );
  }
  
  return <Introduction onStart={() => setCurrentView('assessment')} />;
};

export default EmotionalIntelligenceEvaluator;
