import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Brain as BrainIcon, Lightbulb as LightbulbIcon, Target, Zap, RotateCcw, Calendar, Clock, CheckCircle, Download, Mail, ChevronLeft, ChevronRight, BarChart, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import jsPDF from 'jspdf';

// =========================
// Types & Data
// =========================
interface Question {
  id: number;
  text: string;
  category: 'emotional' | 'cynicism' | 'efficacy' | 'physiological' | 'behavioral';
  description: string;
}

interface AssessmentResults {
  totalScore: number;
  phase: {
    name: string;
    description: string;
  };
  subscores: Record<string, number>;
  rootCauses: string[];
  recoveryBlueprint: {
    daily: string[];
    weekly: string[];
    supplements: string[];
  };
}

const questions: Question[] = [
  { 
    id: 1, 
    text: "I wake up feeling exhausted, even after a full night's sleep", 
    category: "emotional",
    description: "Rate your level of physical exhaustion"
  },
  { 
    id: 2, 
    text: "I feel emotionally drained after interacting with people at work", 
    category: "emotional",
    description: "Assess your emotional resilience"
  },
  { 
    id: 3, 
    text: "I feel detached or cynical about my work", 
    category: "cynicism",
    description: "Evaluate your level of work engagement"
  },
  { 
    id: 4, 
    text: "I doubt the significance of my work", 
    category: "cynicism",
    description: "Assess your sense of purpose"
  },
  { 
    id: 5, 
    text: "I feel I'm not making a meaningful contribution", 
    category: "efficacy",
    description: "Rate your sense of accomplishment"
  },
  { 
    id: 6, 
    text: "I feel overwhelmed by my workload", 
    category: "emotional",
    description: "Assess your work pressure"
  },
  { 
    id: 7, 
    text: "I have trouble concentrating on tasks", 
    category: "efficacy",
    description: "Evaluate your focus and attention"
  },
  { 
    id: 8, 
    text: "I experience physical symptoms of stress", 
    category: "physiological",
    description: "Rate your physical stress indicators"
  },
  { 
    id: 9, 
    text: "I feel irritable or impatient with colleagues", 
    category: "behavioral",
    description: "Assess your interpersonal interactions"
  },
  { 
    id: 10, 
    text: "I have trouble sleeping due to work thoughts", 
    category: "physiological",
    description: "Evaluate your sleep quality"
  },
  { 
    id: 11, 
    text: "I feel my work values conflict with my personal values", 
    category: "emotional",
    description: "Assess your value alignment"
  },
  { 
    id: 12, 
    text: "I feel I'm not performing at my best", 
    category: "efficacy",
    description: "Rate your performance level"
  },
  { 
    id: 13, 
    text: "I work longer hours than I should", 
    category: "behavioral",
    description: "Evaluate your work-life balance"
  },
  { 
    id: 14, 
    text: "I experience frequent headaches or muscle tension", 
    category: "physiological",
    description: "Assess your physical symptoms"
  },
  { 
    id: 15, 
    text: "I feel disconnected from my work goals", 
    category: "cynicism",
    description: "Rate your goal alignment"
  },
  { 
    id: 16, 
    text: "I have trouble making decisions", 
    category: "efficacy",
    description: "Evaluate your decision-making ability"
  },
  { 
    id: 17, 
    text: "I feel my work is not recognized", 
    category: "emotional",
    description: "Assess your sense of recognition"
  },
  { 
    id: 18, 
    text: "I feel I'm not growing professionally", 
    category: "behavioral",
    description: "Rate your professional development"
  }
];

// =========================
// Helper Functions
// =========================
const calculateResults = (answers: Record<number, number>): AssessmentResults => {
  const categoryScores: Record<string, number[]> = {
    emotional: [],
    cynicism: [],
    efficacy: [],
    physiological: [],
    behavioral: []
  };

  questions.forEach(q => {
    const answer = answers[q.id];
    if (answer !== undefined) {
      categoryScores[q.category].push(answer);
    }
  });

  const categoryAverages: Record<string, number> = {};
  Object.entries(categoryScores).forEach(([category, scores]) => {
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    categoryAverages[category] = Math.round((average / 5) * 100);
  });

  const totalScore = Math.round(
    Object.values(categoryAverages).reduce((total, score) => total + score, 0) / 5
  );

  const determinePhase = (score: number) => {
    if (score < 40) return { name: "Warning Phase", description: "Early warning signs of overload" };
    if (score < 60) return { name: "Chronic Stress Phase", description: "Ongoing exhaustion and detachment" };
    if (score < 80) return { name: "Burnout Phase", description: "Full burnout symptoms present" };
    return { name: "Collapse Phase", description: "Severe dysfunction requiring intervention" };
  };

  const identifyRootCauses = () => {
    const causes: string[] = [];
    if (categoryAverages.emotional > 60) causes.push("Emotional Exhaustion");
    if (categoryAverages.cynicism > 60) causes.push("Work Detachment");
    if (categoryAverages.efficacy < 40) causes.push("Reduced Performance");
    if (categoryAverages.physiological > 60) causes.push("Physical Stress");
    if (categoryAverages.behavioral > 60) causes.push("Work-Life Imbalance");
    return causes;
  };

  const generateRecoveryBlueprint = (phase: { name: string; description: string }, causes: string[]) => {
    const blueprint = {
      daily: [] as string[],
      weekly: [] as string[],
      supplements: [] as string[],
    };
    
    // Base recommendations
    blueprint.daily.push("20-minute morning walk with natural light exposure");
    blueprint.daily.push("No screens 1 hour before bedtime");
    blueprint.weekly.push("Digital detox day (no work email/social media)");
    
    // Phase-specific recommendations
    if (phase.name === "Warning Phase") {
      blueprint.daily.push("5-minute mindful breathing exercise");
      blueprint.weekly.push("Reflective journaling session");
    } else if (phase.name === "Chronic Stress Phase") {
      blueprint.daily.push("15-minute meditation session");
      blueprint.weekly.push("Schedule regular breaks during workday");
    } else if (phase.name === "Burnout Phase") {
      blueprint.daily.push("30-minute stress relief activity");
      blueprint.weekly.push("Take at least one full day off");
    } else {
      blueprint.daily.push("Professional support consultation");
      blueprint.weekly.push("Complete work-life boundary assessment");
    }
    
    // Cause-specific recommendations
    if (causes.includes("Emotional Exhaustion")) {
      blueprint.daily.push("Practice emotional regulation techniques");
    }
    if (causes.includes("Work Detachment")) {
      blueprint.weekly.push("Reconnect with work purpose and values");
    }
    if (causes.includes("Reduced Performance")) {
      blueprint.daily.push("Break tasks into smaller, manageable steps");
    }
    if (causes.includes("Physical Stress")) {
      blueprint.daily.push("Regular stretching and movement breaks");
      blueprint.supplements.push("Magnesium glycinate 200mg nightly");
    }
    if (causes.includes("Work-Life Imbalance")) {
      blueprint.weekly.push("Set clear work boundaries and stick to them");
    }
    
    return blueprint;
  };

  const phase = determinePhase(totalScore);
  const rootCauses = identifyRootCauses();
  const recoveryBlueprint = generateRecoveryBlueprint(phase, rootCauses);

  return {
    totalScore,
    phase,
    subscores: categoryAverages,
    rootCauses,
    recoveryBlueprint
  };
};

// =========================
// Main Components
// =========================
const scaleLabels = ["Never", "Rarely", "Sometimes", "Often", "Always"];

interface AssessmentQuizProps {
  onComplete: (results: AssessmentResults) => void;
  onBack: () => void;
}

const AssessmentQuiz = ({ onComplete, onBack }: AssessmentQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (value: number) => setSelectedAnswer(value);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: selectedAnswer }));
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        const finalAnswers = { ...answers, [questions[currentQuestion].id]: selectedAnswer };
        const results = calculateResults(finalAnswers);
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

  const progress = ((currentQuestion + 1) / questions.length) * 100;
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
            <BarChart className="w-6 h-6 text-black" />
            <span className="text-xl font-semibold text-black">Burnout Risk Assessment</span>
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
            <CardTitle className="text-2xl text-black leading-relaxed">{currentQ.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                "Strongly Disagree",
                "Disagree",
                "Somewhat Disagree",
                "Neutral",
                "Somewhat Agree",
                "Agree",
                "Strongly Agree"
              ].map((label, index) => (
                <label
                  key={index}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    selectedAnswer === index + 1
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
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
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="border-black text-black hover:bg-gray-100 disabled:text-gray-300 disabled:border-gray-300 bg-white inline-flex items-center px-6 py-3"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-black hover:bg-gray-800 text-white disabled:bg-gray-300 inline-flex items-center px-6 py-3"
          >
            
            {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}
            <ChevronRight className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ResultsDashboardProps {
  results: AssessmentResults;
  onRetake: () => void;
}

function ResultsDashboard({ results, onRetake }: ResultsDashboardProps) {
  const getScoreColor = (score: number) => {
    if (score < 40) return "text-black";
    if (score < 60) return "text-gray-700";
    if (score < 80) return "text-gray-500";
    return "text-gray-400";
  };

  const getCircleSize = (score: number) => {
    if (score < 40) return 'w-24 h-24';
    if (score < 60) return 'w-28 h-28';
    if (score < 80) return 'w-32 h-32';
    return 'w-36 h-36';
  };

  const handleDownloadResults = () => {
    const doc = new jsPDF();
    // Main Heading
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Burnout Risk Assessment Results', 105, 20, { align: 'center' });
    // Subheading
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary', 14, 35);
    // Body
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Score: ${results.totalScore}/100`, 14, 45);
    doc.text(`Phase: ${results.phase.name}`, 14, 53);
    doc.setFont('helvetica', 'italic');
    doc.text(`"${results.phase.description}"`, 14, 61, { maxWidth: 180 });
    // Section Heading
    doc.setFont('helvetica', 'bold');
    doc.text('Subscores:', 14, 75);
    doc.setFont('helvetica', 'normal');
    let y = 83;
    Object.entries(results.subscores).forEach(([category, score]) => {
      doc.text(`- ${category.charAt(0).toUpperCase() + category.slice(1)}: ${score}%`, 18, y);
      y += 8;
    });
    // Root Causes
    doc.setFont('helvetica', 'bold');
    doc.text('Root Causes:', 14, y + 4); y += 12;
    doc.setFont('helvetica', 'normal');
    if (results.rootCauses.length > 0) {
      results.rootCauses.forEach((cause: string, i: number) => {
        doc.text(`- ${cause}`, 18, y + i * 8);
      });
      y = y + results.rootCauses.length * 8 + 8;
    } else {
      doc.text('- No specific root causes identified.', 18, y + 8);
      y = y + 16;
    }
    // Recovery Blueprint
    doc.setFont('helvetica', 'bold');
    doc.text('Recovery Blueprint:', 14, y); y += 8;
    doc.setFont('helvetica', 'normal');
    doc.text('Daily:', 18, y); y += 8;
    results.recoveryBlueprint.daily.forEach((item: string, i: number) => {
      doc.text(`- ${item}`, 22, y + i * 8);
    });
    let y2 = y + results.recoveryBlueprint.daily.length * 8 + 4;
    doc.text('Weekly:', 18, y2); y2 += 8;
    results.recoveryBlueprint.weekly.forEach((item: string, i: number) => {
      doc.text(`- ${item}`, 22, y2 + i * 8);
    });
    y2 = y2 + results.recoveryBlueprint.weekly.length * 8 + 4;
    doc.text('Supplements:', 18, y2); y2 += 8;
    results.recoveryBlueprint.supplements.forEach((item: string, i: number) => {
      doc.text(`- ${item}`, 22, y2 + i * 8);
    });
    doc.save('burnout-risk-assessment-results.pdf');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black mb-2">
            Your Burnout Assessment Results
          </h1>
          <p className="text-gray-600">
            Based on WHO ICD-11 criteria and validated psychological assessments
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className={`${getCircleSize(results.totalScore)} rounded-full bg-gray-100 flex items-center justify-center`}>
                <span className="text-4xl font-bold text-black">
                  {results.totalScore}/100
                </span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold mb-2 text-black">
              {results.phase.name}
            </CardTitle>
            <div className="inline-block px-4 py-2 rounded bg-gray-200 text-black font-semibold text-lg">
              {results.phase.description}
            </div>
          </CardHeader>
        </Card>

        {/* Detailed Scores */}
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-black">Detailed Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-black font-medium">Emotional Exhaustion</span>
                    <span className={`font-bold ${getScoreColor(results.subscores.emotional)}`}>
                      {results.subscores.emotional}%
                    </span>
                  </div>
                  <Progress value={results.subscores.emotional} className="h-2 bg-gray-200 [&>div]:bg-black" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-black font-medium">Cynicism/Detachment</span>
                    <span className={`font-bold ${getScoreColor(results.subscores.cynicism)}`}>
                      {results.subscores.cynicism}%
                    </span>
                  </div>
                  <Progress value={results.subscores.cynicism} className="h-2 bg-gray-200 [&>div]:bg-black" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-black font-medium">Reduced Efficacy</span>
                    <span className={`font-bold ${getScoreColor(results.subscores.efficacy)}`}>
                      {results.subscores.efficacy}%
                    </span>
                  </div>
                  <Progress value={results.subscores.efficacy} className="h-2 bg-gray-200 [&>div]:bg-black" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-black font-medium">Physiological Impact</span>
                    <span className={`font-bold ${getScoreColor(results.subscores.physiological)}`}>
                      {results.subscores.physiological}%
                    </span>
                  </div>
                  <Progress value={results.subscores.physiological} className="h-2 bg-gray-200 [&>div]:bg-black" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-black font-medium">Behavioral Changes</span>
                    <span className={`font-bold ${getScoreColor(results.subscores.behavioral)}`}>
                      {results.subscores.behavioral}%
                    </span>
                  </div>
                  <Progress value={results.subscores.behavioral} className="h-2 bg-gray-200 [&>div]:bg-black" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Root Causes */}
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-black">Identified Root Causes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {results.rootCauses.length > 0 ? (
                results.rootCauses.map((cause, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 text-sm bg-gray-200 text-black rounded"
                  >
                    {cause}
                  </span>
                ))
              ) : (
                <p className="text-gray-600">
                  No specific root causes identified. Your symptoms may be related to general stress or temporary circumstances.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recovery Blueprint */}
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-black">Personalized Recovery Blueprint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="font-semibold text-black">Daily:</span>
              <ul className="list-disc list-inside text-black ml-4">
                {results.recoveryBlueprint.daily.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-black">Weekly:</span>
              <ul className="list-disc list-inside text-black ml-4">
                {results.recoveryBlueprint.weekly.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-black">Supplements:</span>
              <ul className="list-disc list-inside text-black ml-4">
                {results.recoveryBlueprint.supplements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRetake}
            variant="outline"
            className="px-4 py-2 text-base min-w-[120px] bg-white text-black border-black hover:bg-gray-100 transition-colors flex items-center"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Retake Assessment
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 text-base min-w-[120px] bg-white text-black border-black hover:bg-gray-100 transition-colors flex items-center"
            onClick={handleDownloadResults}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Results
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 text-base min-w-[120px] bg-white text-black border-black hover:bg-gray-100 transition-colors flex items-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            Send to Email
          </Button>
        </div>
      </div>
    </div>
  );
}

interface IntroductionProps {
  onStart: () => void;
}

function Introduction({ onStart }: IntroductionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Card className="border-none shadow-lg bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-black">Burnout Risk Assessment</CardTitle>
            <CardDescription className="text-lg mt-2 text-gray-600">
              Evidence-based evaluation using WHO's ICD-11 burnout diagnostic criteria
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full mb-2">
                  <span className="font-bold text-black">1</span>
                </div>
                <h3 className="font-medium text-black mb-1">Clinical Assessment</h3>
                <p className="text-sm text-gray-600 text-center">Based on WHO's ICD-11 criteria and validated instruments</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full mb-2">
                  <span className="font-bold text-black">2</span>
                </div>
                <h3 className="font-medium text-black mb-1">Phase Classification</h3>
                <p className="text-sm text-gray-600 text-center">Identify your burnout phase from Warning to Collapse</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full mb-2">
                  <span className="font-bold text-black">3</span>
                </div>
                <h3 className="font-medium text-black mb-1">Recovery Blueprint</h3>
                <p className="text-sm text-gray-600 text-center">Personalized strategies based on your risk factors</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-black mb-3">About This Assessment</h2>
              <ul className="space-y-2 text-black">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>
                  <span>Takes approximately 5-7 minutes to complete</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>
                  <span>Includes 18 questions across 5 key dimensions</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>
                  <span>Provides detailed feedback and personalized recommendations</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>
                  <span>Your responses are completely private and confidential</span>
                </li>
              </ul>
            </div>
          </CardContent>
          
          <div className="flex justify-center pb-8">
            <Button 
              onClick={onStart} 
              className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-10 rounded-full shadow-md transition-all hover:scale-105 text-lg"
            >
              Begin Assessment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

const BurnoutRiskAssessment = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'assessment' | 'results'>('landing');
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const handleStart = () => {
    setCurrentView('assessment');
  };

  const handleBack = () => {
    if (currentView === 'assessment') {
      setCurrentView('landing');
    }
  };

  const handleComplete = (assessmentResults: AssessmentResults) => {
    setResults(assessmentResults);
    setCurrentView('results');
  };

  const handleRetake = () => {
    setResults(null);
    setCurrentView('landing');
  };

  return (
    <>
      {currentView === 'landing' && <Introduction onStart={handleStart} />}
      {currentView === 'assessment' && (
        <AssessmentQuiz onComplete={handleComplete} onBack={handleBack} />
      )}
      {currentView === 'results' && results && (
        <ResultsDashboard results={results} onRetake={handleRetake} />
      )}
    </>
  );
};

export default BurnoutRiskAssessment; 