import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Brain as BrainIcon, Lightbulb as LightbulbIcon, Target, Zap, TrendingUp, RotateCcw, Calendar, Clock, CheckCircle, Download, Mail, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import jsPDF from 'jspdf';

// =========================
// Utilities
// =========================
function calculateMFIScore(answers: { [key: number]: number }, questions: any[]) {
  const categoryScores = {
    'Focus Endurance': [] as number[],
    'Cognitive Recovery': [] as number[],
    'Task Switching Agility': [] as number[],
    'Stress Resilience': [] as number[],
    'Mental Energy Reserve': [] as number[]
  };
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (question) {
      let processedScore = answer;
      const reverseQuestions = [2, 3, 9];
      if (reverseQuestions.includes(parseInt(questionId))) {
        processedScore = 8 - answer;
      }
      categoryScores[question.category as keyof typeof categoryScores].push(processedScore);
    }
  });
  const categoryAverages = Object.entries(categoryScores).reduce((acc, [category, scores]) => {
    const average = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
    acc[category] = Math.round((average / 7) * 100);
    return acc;
  }, {} as { [key: string]: number });
  const weights = {
    'Focus Endurance': 0.25,
    'Cognitive Recovery': 0.20,
    'Task Switching Agility': 0.20,
    'Stress Resilience': 0.20,
    'Mental Energy Reserve': 0.15
  };
  const mfiScore = Math.round(
    Object.entries(categoryAverages).reduce((total, [category, score]) => {
      return total + (score * (weights[category as keyof typeof weights] || 0));
    }, 0)
  );
  const mvo2Score = Math.min(100, mfiScore + Math.round(Math.random() * 10 - 5));
  const recoveryIndex = Math.round((categoryAverages['Cognitive Recovery'] / 10));
  const focusEndurance = categoryAverages['Focus Endurance'];
  const taskAgility = categoryAverages['Task Switching Agility'];
  let category = '';
  let description = '';
  if (mfiScore >= 80) {
    category = 'Cognitive Athlete';
    description = 'You demonstrate elite mental performance with exceptional stamina, quick recovery, and superior cognitive agility. You operate at peak mental fitness.';
  } else if (mfiScore >= 60) {
    category = 'Strategic Striver';
    description = 'You show strong mental performance with good focus windows and manageable fatigue. You have solid cognitive foundations with room for optimization.';
  } else if (mfiScore >= 40) {
    category = 'Reactive Performer';
    description = 'You can achieve good mental performance in short bursts but experience noticeable fatigue. Building endurance and recovery skills will unlock your potential.';
  } else {
    category = 'Cognitive Crash Zone';
    description = 'You experience frequent mental fatigue and brain fog. Your cognitive system needs foundational support and structured recovery protocols.';
  }
  const strengths = [];
  const weaknesses = [];
  if (categoryAverages['Focus Endurance'] >= 70) strengths.push('Strong sustained attention capacity');
  else weaknesses.push('Focus endurance needs development');
  if (categoryAverages['Cognitive Recovery'] >= 70) strengths.push('Excellent mental recovery abilities');
  else weaknesses.push('Cognitive recovery could be improved');
  if (categoryAverages['Task Switching Agility'] >= 70) strengths.push('High mental flexibility and adaptability');
  else weaknesses.push('Task switching efficiency needs work');
  if (categoryAverages['Stress Resilience'] >= 70) strengths.push('Maintains clarity under pressure');
  else weaknesses.push('Stress management skills need strengthening');
  if (categoryAverages['Mental Energy Reserve'] >= 70) strengths.push('Good mental energy management');
  else weaknesses.push('Mental energy optimization needed');
  let recommendedMode = '';
  let modeDescription = '';
  if (focusEndurance >= 70 && categoryAverages['Cognitive Recovery'] >= 70) {
    recommendedMode = 'Endurance Mode';
    modeDescription = 'You excel in extended focus sessions (90-120 minutes) with natural recovery cycles.';
  } else if (focusEndurance >= 60) {
    recommendedMode = 'Sprint Mode';
    modeDescription = 'You perform best in focused 30-60 minute sessions with deliberate breaks.';
  } else {
    recommendedMode = 'Interval Mode';
    modeDescription = 'You benefit from short 15-25 minute focus blocks with frequent recovery periods.';
  }
  return {
    mfiScore,
    category,
    description,
    mvo2Score,
    recoveryIndex,
    focusEndurance,
    taskAgility,
    categoryScores: categoryAverages,
    strengths,
    weaknesses,
    recommendedMode,
    modeDescription
  };
}

function generateTrainingProgram(results: any) {
  const { categoryScores } = results;
  const baseProgram = {
    phase1: [
      {
        title: "Foundation Building",
        description: "Establish baseline focus patterns and introduce basic cognitive training principles.",
        exercises: [
          { name: "Deep Work Initiation", description: "Start with 15-minute uninterrupted focus sessions", duration: "15 min, 2x daily" },
          { name: "Attention Anchor Practice", description: "Use breath awareness to train sustained attention", duration: "5 min, 3x daily" },
          { name: "Digital Environment Setup", description: "Configure distraction-free workspace and tools", duration: "One-time setup" }
        ]
      },
      {
        title: "Cognitive Awareness",
        description: "Develop metacognitive skills and mental state monitoring.",
        exercises: [
          { name: "Mental Energy Tracking", description: "Rate and log cognitive energy levels hourly", duration: "2 min, every hour" },
          { name: "Focus Quality Assessment", description: "Post-session evaluation of attention quality", duration: "3 min, after focus sessions" },
          { name: "Ultradian Rhythm Mapping", description: "Identify natural high and low energy periods", duration: "Daily observation" }
        ]
      },
      {
        title: "Basic Recovery Protocols",
        description: "Introduce fundamental cognitive recovery techniques.",
        exercises: [
          { name: "Cognitive Cool-down", description: "Structured transition between intense mental tasks", duration: "5 min, between sessions" },
          { name: "Eye Movement Reset", description: "Gaze shifting exercises to reduce mental fatigue", duration: "2 min, every 30 min" },
          { name: "Progressive Muscle Relaxation", description: "Release physical tension that impacts cognition", duration: "10 min, before sleep" }
        ]
      },
      {
        title: "Habit Anchoring",
        description: "Establish consistent cognitive fitness routines.",
        exercises: [
          { name: "Morning Cognitive Warm-up", description: "5-minute mental preparation routine", duration: "5 min, upon waking" },
          { name: "Evening Brain Dump", description: "Clear mental cache before rest", duration: "10 min, before sleep" },
          { name: "Micro-recovery Stacks", description: "Brief reset rituals between tasks", duration: "1-2 min, between tasks" }
        ]
      }
    ],
    phase2: [
      {
        title: "Endurance Building",
        description: "Extend focus capacity and build cognitive stamina.",
        exercises: [
          { name: "Extended Focus Sessions", description: "Gradually increase uninterrupted work periods to 45 minutes", duration: "45 min, 2x daily" },
          { name: "Distraction Resistance Training", description: "Practice maintaining focus amid controlled interruptions", duration: "30 min, daily" },
          { name: "Cognitive Load Progression", description: "Gradually increase task complexity and demand", duration: "Variable, based on capacity" }
        ]
      },
      {
        title: "Recovery Optimization",
        description: "Enhance cognitive recovery speed and quality.",
        exercises: [
          { name: "Active Recovery Protocols", description: "Walking meditation and nature exposure", duration: "15 min, 2x daily" },
          { name: "Glymphatic Enhancement", description: "Sleep optimization for brain detoxification", duration: "7-9 hours, nightly" },
          { name: "Cognitive Cross-training", description: "Engage different mental faculties for active rest", duration: "20 min, daily" }
        ]
      },
      {
        title: "Agility Development",
        description: "Improve task switching and mental flexibility.",
        exercises: [
          { name: "Context Switching Drills", description: "Rapid transitions between different types of tasks", duration: "25 min, daily" },
          { name: "Executive Function Training", description: "Working memory and inhibition control exercises", duration: "15 min, 3x weekly" },
          { name: "Cognitive Flexibility Challenges", description: "Perspective-shifting and rule-changing exercises", duration: "20 min, 3x weekly" }
        ]
      },
      {
        title: "Stress Inoculation",
        description: "Build resilience under cognitive pressure.",
        exercises: [
          { name: "Pressure Training Sessions", description: "Maintain quality under artificial time pressure", duration: "30 min, 3x weekly" },
          { name: "Cognitive Stress Testing", description: "Complex multi-tasking scenarios", duration: "20 min, 2x weekly" },
          { name: "Cortical Stability Practice", description: "Maintain clarity during emotional or physical stress", duration: "15 min, daily" }
        ]
      }
    ],
    phase3: [
      {
        title: "Peak Performance",
        description: "Achieve consistent high-level cognitive output.",
        exercises: [
          { name: "Ultra-Focus Sessions", description: "90-minute deep work sessions with minimal breaks", duration: "90 min, daily" },
          { name: "Flow State Cultivation", description: "Systematic approach to entering optimal cognitive states", duration: "Variable, daily practice" },
          { name: "Cognitive Athletics", description: "Competition-style mental challenges", duration: "45 min, 3x weekly" }
        ]
      },
      {
        title: "Advanced Recovery",
        description: "Master rapid cognitive restoration techniques.",
        exercises: [
          { name: "Micro-recovery Mastery", description: "5-minute complete cognitive resets", duration: "5 min, between sessions" },
          { name: "Biohack Integration", description: "Advanced recovery tools and techniques", duration: "Variable, daily" },
          { name: "Recovery-Performance Optimization", description: "Fine-tune work-rest ratios for peak output", duration: "Ongoing monitoring" }
        ]
      },
      {
        title: "Elite Adaptability",
        description: "Master complex cognitive demands and environments.",
        exercises: [
          { name: "Multi-domain Switching", description: "Rapid transitions across vastly different cognitive domains", duration: "40 min, daily" },
          { name: "Chaos Navigation", description: "Maintain performance in unpredictable environments", duration: "30 min, 3x weekly" },
          { name: "Cognitive Leadership", description: "High-level thinking while managing multiple variables", duration: "60 min, 3x weekly" }
        ]
      },
      {
        title: "Maintenance & Mastery",
        description: "Sustain peak cognitive fitness long-term.",
        exercises: [
          { name: "Performance Monitoring", description: "Track and adjust cognitive training based on metrics", duration: "15 min, weekly" },
          { name: "Challenge Progression", description: "Continuously increase cognitive demands", duration: "Variable, ongoing" },
          { name: "Cognitive Lifestyle Integration", description: "Embed optimal practices into daily life permanently", duration: "Lifestyle integration" }
        ]
      }
    ]
  };
  if (categoryScores['Focus Endurance'] < 50) {
    baseProgram.phase1.forEach(week => {
      week.exercises.unshift({
        name: "Micro-focus Drills",
        description: "Start with 5-minute focus exercises to build basic attention span",
        duration: "5 min, 4x daily"
      });
    });
  }
  if (categoryScores['Cognitive Recovery'] < 50) {
    baseProgram.phase1.forEach((week, index) => {
      if (index % 2 === 1) {
        week.exercises.push({
          name: "Enhanced Recovery Protocol",
          description: "Extended recovery sessions for faster mental restoration",
          duration: "15 min, after each focus session"
        });
      }
    });
  }
  if (categoryScores['Task Switching Agility'] < 50) {
    baseProgram.phase1[2].exercises.push({
      name: "Basic Task Switching",
      description: "Simple transitions between reading and writing tasks",
      duration: "10 min, 2x daily"
    });
  }
  return baseProgram;
}

// =========================
// UI Components (minimal, only those used in the assessment)
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
// Main Assessment Logic
// =========================
const questions = [
  { id: 1, category: "Focus Endurance", question: "I can stay in deep focus for 30-60 minutes without breaks or distractions.", description: "Rate your ability to maintain sustained attention on demanding tasks." },
  { id: 2, category: "Cognitive Recovery", question: "After intense thinking or problem-solving, I feel mentally drained for extended periods.", description: "How quickly do you bounce back from cognitively demanding work?" },
  { id: 3, category: "Task Switching Agility", question: "Switching between meetings or different types of tasks leaves me mentally foggy.", description: "Assess your ability to maintain clarity when context-switching." },
  { id: 4, category: "Stress Resilience", question: "I can think clearly and make good decisions even under pressure or tight deadlines.", description: "How well do you maintain cognitive performance under stress?" },
  { id: 5, category: "Mental Energy Reserve", question: "I have consistent mental energy throughout my most productive hours.", description: "Rate your overall cognitive stamina and energy management." },
  { id: 6, category: "Focus Endurance", question: "I rarely experience mind-wandering or attention drift during important tasks.", description: "How well can you control and direct your attention?" },
  { id: 7, category: "Cognitive Recovery", question: "I use specific techniques or rituals to restore my mental clarity after demanding work.", description: "Do you actively manage your cognitive recovery?" },
  { id: 8, category: "Task Switching Agility", question: "I can quickly adapt my thinking style when moving between different types of problems.", description: "Rate your cognitive flexibility and adaptability." },
  { id: 9, category: "Stress Resilience", question: "Mental stress and pressure linger in my mind even after I've finished work.", description: "How well do you compartmentalize and release cognitive stress?" },
  { id: 10, category: "Mental Energy Reserve", question: "I know my peak mental performance hours and schedule my most important work accordingly.", description: "How well do you understand and optimize your cognitive rhythms?" },
  { id: 11, category: "Focus Endurance", question: "I can maintain attention quality even when working on boring or repetitive tasks.", description: "Rate your ability to sustain focus regardless of task engagement level." },
  { id: 12, category: "Cognitive Recovery", question: "I recover quickly from mental exhaustion compared to others.", description: "How does your cognitive recovery rate compare to your perception of others?" }
];
const scaleLabels = [
  "Strongly Disagree",
  "Disagree",
  "Somewhat Disagree",
  "Neutral",
  "Somewhat Agree",
  "Agree",
  "Strongly Agree"
];

function AssessmentQuiz({ onComplete, onBack }: { onComplete: (results: any) => void; onBack: () => void; }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
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
        const finalAnswers = { ...answers, [questions[currentQuestion].id]: selectedAnswer };
        const results = calculateMFIScore(finalAnswers, questions);
        onComplete(results);
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
            <BrainIcon className="w-6 h-6 text-black" />
            <span className="text-xl font-semibold text-black">Mental Fitness Assessment</span>
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
                <span className="text-black text-sm font-medium">{currentQ.category}</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-black leading-relaxed">{currentQ.question}</CardTitle>
            <p className="text-gray-600 mt-2">{currentQ.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scaleLabels.map((label, index) => (
                <label key={index} className="w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer">
                  <span className="font-medium">{label}</span>
                  <input
                    type="radio"
                    name="answer"
                    value={index + 1}
                    checked={selectedAnswer === index + 1}
                    onChange={() => handleAnswerSelect(index + 1)}
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
            
            {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next '}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface MentalFitnessResultsType {
  mfiScore: number;
  category: string;
  description: string;
  mvo2Score: number;
  recoveryIndex: number;
  focusEndurance: number;
  taskAgility: number;
  categoryScores: { [key: string]: number };
  strengths: string[];
  weaknesses: string[];
  recommendedMode: string;
  modeDescription: string;
  totalScore: number;
  fitnessLevel: string;
  primaryStyle: string;
  secondaryStyle: string;
  subscores: {
    cognitiveAgility: number;
    emotionalResilience: number;
    socialConnection: number;
    purposeMeaning: number;
  };
  developmentAreas: string[];
}

function MentalFitnessResults({ results, onRetakeQuiz }: { results: MentalFitnessResultsType; onRetakeQuiz: () => void }) {
  const [activeTab, setActiveTab] = useState("scores");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDownloadResults = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = margin;

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Mental Fitness Index Results', pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Main Score
    doc.setFontSize(36);
    doc.text(results.mfiScore.toString(), pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Category
    doc.setFontSize(16);
    doc.text(results.category, pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Description
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    const descriptionLines = doc.splitTextToSize(results.description, pageWidth - (2 * margin));
    doc.text(descriptionLines, pageWidth / 2, y, { align: 'center' });
    y += 10 + (descriptionLines.length * 7);

    // Key Metrics Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Metrics', margin, y);
    y += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Mental VO₂ Max: ${results.mvo2Score}`, margin, y); y += 10;
    doc.text(`Recovery Index: ${results.recoveryIndex}/10`, margin, y); y += 10;
    doc.text(`Focus Endurance: ${results.focusEndurance}%`, margin, y); y += 10;
    doc.text(`Task Agility: ${results.taskAgility}%`, margin, y); y += 20;

    // Check if we need a new page
    if (y > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage();
      y = margin;
    }

    // Category Scores
    doc.setFont('helvetica', 'bold');
    doc.text('Category Scores', margin, y);
    y += 15;
    doc.setFont('helvetica', 'normal');
    Object.entries(results.categoryScores).forEach(([category, score]) => {
      doc.text(`${category}: ${score}%`, margin, y);
      y += 10;
    });
    y += 10;

    // Check if we need a new page
    if (y > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage();
      y = margin;
    }

    // Strengths
    doc.setFont('helvetica', 'bold');
    doc.text('Key Strengths', margin, y);
    y += 15;
    doc.setFont('helvetica', 'normal');
    results.strengths.forEach((strength: string) => {
      const strengthLines = doc.splitTextToSize(`• ${strength}`, pageWidth - (2 * margin));
      doc.text(strengthLines, margin, y);
      y += 10 * strengthLines.length;
    });
    y += 10;

    // Check if we need a new page
    if (y > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage();
      y = margin;
    }

    // Growth Opportunities
    doc.setFont('helvetica', 'bold');
    doc.text('Growth Opportunities', margin, y);
    y += 15;
    doc.setFont('helvetica', 'normal');
    results.weaknesses.forEach((weakness: string) => {
      const weaknessLines = doc.splitTextToSize(`• ${weakness}`, pageWidth - (2 * margin));
      doc.text(weaknessLines, margin, y);
      y += 10 * weaknessLines.length;
    });
    y += 15;

    // Check if we need a new page
    if (y > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage();
      y = margin;
    }

    // Recommended Mode
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Mode', margin, y);
    y += 15;
    doc.setFont('helvetica', 'normal');
    doc.text(results.recommendedMode, margin, y);
    y += 10;
    doc.setFont('helvetica', 'italic');
    const modeLines = doc.splitTextToSize(results.modeDescription, pageWidth - (2 * margin));
    doc.text(modeLines, margin, y);

    doc.save('mental-fitness-results.pdf');
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

  const handleEmailSend = async () => {
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsSending(true);
    setEmailError("");

    try {
      // Generate PDF
      const doc = new jsPDF();
      let y = 20;

      // Add content to PDF
      doc.setFont('helvetica', 'bold');
      doc.text('Mental Fitness Index Results', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      doc.text(`MFI Score: ${results.mfiScore}`, 14, y); y += 10;
      doc.text(`Category: ${results.category}`, 14, y); y += 10;
      doc.setFont('helvetica', 'italic');
      doc.text(`"${results.description}"`, 14, y, { maxWidth: 180 }); y += 10;
      doc.setFont('helvetica', 'normal');
      doc.text(`Mental VO₂ Max: ${results.mvo2Score}`, 14, y); y += 10;
      doc.text(`Recovery Index: ${results.recoveryIndex}/10`, 14, y); y += 10;
      doc.text(`Focus Endurance: ${results.focusEndurance}%`, 14, y); y += 10;
      doc.text(`Task Agility: ${results.taskAgility}%`, 14, y); y += 20;

      // Add strengths and weaknesses
      doc.setFont('helvetica', 'bold');
      doc.text('Strengths:', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      results.strengths.forEach((strength: string, i: number) => {
        doc.text(`- ${strength}`, 18, y + i * 8);
      });
      y += results.strengths.length * 8 + 10;

      doc.setFont('helvetica', 'bold');
      doc.text('Growth Opportunities:', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      results.weaknesses.forEach((weakness: string, i: number) => {
        doc.text(`- ${weakness}`, 18, y + i * 8);
      });
      y += results.weaknesses.length * 8 + 10;

      // Add recommended mode
      doc.setFont('helvetica', 'bold');
      doc.text('Recommended Mode:', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      doc.text(`${results.recommendedMode}`, 14, y); y += 10;
      doc.setFont('helvetica', 'italic');
      doc.text(`${results.modeDescription}`, 14, y, { maxWidth: 180 });

      // Convert PDF to base64
      const pdfBase64 = doc.output('datauristring').split(',')[1];

      // Send PDF via email
      const response = await fetch('/api/assessment/send-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          assessmentType: 'mental-fitness-index',
          pdfBuffer: pdfBase64
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setShowEmailModal(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailError('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <BrainIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-black">Your Mental Fitness Results</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Based on your responses, here's your comprehensive cognitive performance profile and personalized optimization recommendations.
          </p>
        </div>
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center border border-gray-200">
                  <span className="text-4xl font-bold text-black">{results.mfiScore}</span>
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl text-black">Mental Fitness Index (MFI)</CardTitle>
            <Badge className="bg-black text-white text-lg px-8 py-3 rounded-md font-medium cursor-default select-none pointer-events-none">
              {results.category}
            </Badge>
            <p className="text-gray-600 mt-2">{results.description}</p>
          </CardHeader>
        </Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-black" />
                <CardTitle className="text-sm text-black">Mental VO₂ Max</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black mb-2">{results.mvo2Score}</div>
              <Progress value={results.mvo2Score} />
              <p className="text-xs text-gray-500 mt-2">Peak cognitive capacity index</p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-black" />
                <CardTitle className="text-sm text-black">Recovery Index</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black mb-2">{results.recoveryIndex}/10</div>
              <Progress value={results.recoveryIndex * 10} />
              <p className="text-xs text-gray-500 mt-2">Cognitive bounce-back rate</p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-black" />
                <CardTitle className="text-sm text-black">Focus Endurance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black mb-2">{results.focusEndurance}%</div>
              <Progress value={results.focusEndurance} />
              <p className="text-xs text-gray-500 mt-2">Sustained attention capacity</p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <BrainIcon className="w-5 h-5 text-black" />
                <CardTitle className="text-sm text-black">Task Agility</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black mb-2">{results.taskAgility}%</div>
              <Progress value={results.taskAgility} />
              <p className="text-xs text-gray-500 mt-2">Context switching efficiency</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Target className="w-5 h-5" />
                Cognitive Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.strengths.map((strength: string, index: number) => (
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
                <Zap className="w-5 h-5" />
                Growth Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.weaknesses.map((weakness: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span className="text-black">{weakness}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-black text-xl">Your Mental Performance Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-black text-lg mb-4">{results.recommendedMode}</p>
            <p className="text-gray-600">{results.modeDescription}</p>
          </CardContent>
        </Card>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRetakeQuiz} className="px-4 py-2 text-base min-w-[120px] bg-white text-black border border-black hover:bg-gray-100 transition-colors inline-flex items-center">
            <RefreshCcw className="w-5 h-5 mr-2" />
            Retake Assessment
          </Button>
          <Button className="px-4 py-2 text-base min-w-[120px] bg-white text-black border border-black hover:bg-gray-100 transition-colors inline-flex items-center" onClick={handleDownloadResults}>
            <Download className="w-5 h-5 mr-2" />
            Download Results
          </Button>
          <Button className="px-4 py-2 text-base min-w-[120px] bg-white text-black border border-black hover:bg-gray-100 transition-colors inline-flex items-center" onClick={handleSendToEmail}>
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
              disabled={isSending}
            />
            {emailError && <div className="text-red-500 text-sm mb-2">{emailError}</div>}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 border rounded-2xl hover:bg-gray-100 transition"
                disabled={isSending}
              >
                Cancel
              </button>
              <button
                onClick={handleEmailSend}
                className="px-4 py-2 bg-black text-white rounded-2xl hover:bg-gray-800 transition flex items-center gap-2"
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
          <CheckCircle className="h-5 w-5" />
          <span>Results sent successfully!</span>
        </div>
      )}
    </div>
  );
}

function TrainingProgram({ results, onBack }: { results: any; onBack: () => void; }) {
  const trainingProgram = generateTrainingProgram(results);
  const [phase, setPhase] = useState<'phase1' | 'phase2' | 'phase3'>('phase1');
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} className="text-gray-500 hover:text-black hover:bg-gray-100 bg-transparent inline-flex items-center px-6 py-3">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-neutral-900">Your Personalized Training Program</h1>
            <p className="text-neutral-600">12-Week Cognitive Optimization Plan</p>
          </div>
          <div className="w-24"></div>
        </div>
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-neutral-900 text-xl">Program Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-neutral-900 font-semibold mb-2">Focus Training</h3>
                <p className="text-neutral-600 text-sm">Build sustained attention and concentration endurance</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-neutral-900 font-semibold mb-2">Recovery Protocols</h3>
                <p className="text-neutral-600 text-sm">Optimize cognitive recovery and mental energy</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-neutral-900 font-semibold mb-2">Agility Drills</h3>
                <p className="text-neutral-600 text-sm">Enhance mental flexibility and adaptability</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Tabs defaultValue="phase1" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-neutral-100 border-borderline">
            <TabsTrigger value="phase1" className="text-black data-[state=active]:bg-black data-[state=active]:text-white">Phase 1: Foundation (Weeks 1-4)</TabsTrigger>
            <TabsTrigger value="phase2" className="text-black data-[state=active]:bg-black data-[state=active]:text-white">Phase 2: Development (Weeks 5-8)</TabsTrigger>
            <TabsTrigger value="phase3" className="text-black data-[state=active]:bg-black data-[state=active]:text-white">Phase 3: Optimization (Weeks 9-12)</TabsTrigger>
          </TabsList>
          <TabsContent value="phase1" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {trainingProgram.phase1.map((week: any, index: number) => (
                <Card key={index} className="bg-white border border-borderline">
                  <CardHeader>
                    <CardTitle className="text-neutral-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-black" />
                      Week {index + 1}: {week.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700 mb-4">{week.description}</p>
                    <div className="space-y-3">
                      {week.exercises.map((exercise: any, exerciseIndex: number) => (
                        <div key={exerciseIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-neutral-900 font-medium">{exercise.name}</div>
                            <div className="text-neutral-600 text-sm">{exercise.description}</div>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {exercise.duration}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="phase2" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {trainingProgram.phase2.map((week: any, index: number) => (
                <Card key={index} className="bg-white border border-borderline">
                  <CardHeader>
                    <CardTitle className="text-neutral-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-black" />
                      Week {index + 5}: {week.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700 mb-4">{week.description}</p>
                    <div className="space-y-3">
                      {week.exercises.map((exercise: any, exerciseIndex: number) => (
                        <div key={exerciseIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-neutral-900 font-medium">{exercise.name}</div>
                            <div className="text-neutral-600 text-sm">{exercise.description}</div>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {exercise.duration}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="phase3" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {trainingProgram.phase3.map((week: any, index: number) => (
                <Card key={index} className="bg-white border border-borderline">
                  <CardHeader>
                    <CardTitle className="text-neutral-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-black" />
                      Week {index + 9}: {week.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700 mb-4">{week.description}</p>
                    <div className="space-y-3">
                      {week.exercises.map((exercise: any, exerciseIndex: number) => (
                        <div key={exerciseIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-neutral-900 font-medium">{exercise.name}</div>
                            <div className="text-neutral-600 text-sm">{exercise.description}</div>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {exercise.duration}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Introduction({ onStart }: { onStart: () => void }) {
  return (
    <div className="homepage-bg min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in">
        <Card className="border-none shadow-lg bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-black">Mental Fitness Index</CardTitle>
            <CardDescription className="text-lg mt-2 text-black">Discover your mental stamina, cognitive endurance, and neural agility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-black mb-3">What is Mental Fitness?</h2>
              <p className="text-black mb-4">Mental fitness is your ability to sustain focus, recover from cognitive fatigue, and adapt to new mental challenges—key for high performance in any field.</p>
              <p className="text-black">This assessment measures your <span className="font-medium">mental growth potential</span>, not just your current knowledge. Use it to understand your strengths and find opportunities for improvement.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full">
                  <BrainIcon className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Self-Discovery</h3>
                  <p className="text-sm text-gray-600">Gain insights into your mental strengths and adaptability</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full">
                  <LightbulbIcon className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Growth Focus</h3>
                  <p className="text-sm text-gray-600">Identify ways to enhance your cognitive performance</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-black mb-3">About This Assessment</h2>
              <ul className="space-y-2 text-black">
                <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Takes approximately 5-7 minutes to complete</span></li>
                <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Includes 18 questions across 6 key dimensions</span></li>
                <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Provides detailed feedback and personalized recommendations</span></li>
                <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Your responses are completely private and confidential</span></li>
              </ul>
            </div>
          </CardContent>
          <div className="flex justify-center pb-8">
            <Button onClick={onStart} className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-8 rounded-full shadow-md transition-all hover:scale-105" style={{ fontSize: '1.125rem' }}>Begin Assessment</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

const MentalFitnessIndexPage = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'assessment' | 'results' | 'training'>('landing');
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const handleAssessmentComplete = (results: any) => {
    setAssessmentResults(results);
    setCurrentView('results');
  };
  if (currentView === 'assessment') {
    return <AssessmentQuiz onComplete={handleAssessmentComplete} onBack={() => setCurrentView('landing')} />;
  }
  if (currentView === 'results' && assessmentResults) {
    return <MentalFitnessResults results={assessmentResults} onRetakeQuiz={() => setCurrentView('assessment')} />;
  }
  if (currentView === 'training' && assessmentResults) {
    return <TrainingProgram results={assessmentResults} onBack={() => setCurrentView('results')} />;
  }
  return <Introduction onStart={() => setCurrentView('assessment')} />;
};

export default MentalFitnessIndexPage; 