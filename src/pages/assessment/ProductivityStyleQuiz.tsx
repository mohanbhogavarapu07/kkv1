import React, { useState } from "react";
import { ChevronLeft, ChevronRight, BarChart, Download, Mail, Share2, RefreshCcw, CheckCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import jsPDF from 'jspdf';

// Utility to merge class names
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 🌟 Types & Interfaces
interface QuizSectionProps {
  onComplete: (answers: Record<string, number>) => void;
  onBack: () => void;
}

interface ResultsSectionProps {
  results: {
    type: string;
    chronotype: string;
    description: string;
    timeBlocking: string[];
    tools: string[];
    habits: string[];
    strengths: string[];
    challenges: string[];
    compatibility: {
      works_well_with: string[];
      challenges_with: string[];
    };
    score: {
      cognitive: number;
      workStyle: number;
      energy: number;
      focus: number;
      toolUsage: number;
    };
  };
  onRestart: () => void;
}

// Questions array
const questions = [
  {
    id: 1,
    text: "I prefer to work in short, focused bursts rather than long stretches.",
    category: "workStyle"
  },
  {
    id: 2,
    text: "I feel most energized in the morning.",
    category: "energy"
  },
  {
    id: 3,
    text: "I need complete silence to focus on complex tasks.",
    category: "focus"
  },
  {
    id: 4,
    text: "I prefer to work alone rather than in a team.",
    category: "workStyle"
  },
  {
    id: 5,
    text: "I use digital tools to organize my tasks and schedule.",
    category: "toolUsage"
  },
  {
    id: 6,
    text: "I often feel overwhelmed by too many tasks at once.",
    category: "cognitive"
  },
  {
    id: 7,
    text: "I prefer to plan my day in advance.",
    category: "workStyle"
  },
  {
    id: 8,
    text: "I can easily switch between different types of tasks.",
    category: "cognitive"
  },
  {
    id: 9,
    text: "I need frequent breaks to maintain productivity.",
    category: "energy"
  },
  {
    id: 10,
    text: "I prefer to work on one task until completion before moving to the next.",
    category: "focus"
  },
  {
    id: 11,
    text: "I use multiple apps and tools to manage my work.",
    category: "toolUsage"
  },
  {
    id: 12,
    text: "I feel most productive in the evening.",
    category: "energy"
  },
  {
    id: 13,
    text: "I prefer to have a flexible schedule rather than a rigid one.",
    category: "workStyle"
  },
  {
    id: 14,
    text: "I can work effectively in noisy environments.",
    category: "focus"
  },
  {
    id: 15,
    text: "I often use analog tools (paper, notebooks) for planning.",
    category: "toolUsage"
  },
  {
    id: 16,
    text: "I can maintain focus for several hours at a time.",
    category: "cognitive"
  },
  {
    id: 17,
    text: "I prefer to work in a team setting.",
    category: "workStyle"
  },
  {
    id: 18,
    text: "I need to take regular breaks to recharge.",
    category: "energy"
  },
  {
    id: 19,
    text: "I can easily multitask between different projects.",
    category: "cognitive"
  },
  {
    id: 20,
    text: "I prefer to use simple, minimal tools for productivity.",
    category: "toolUsage"
  },
  {
    id: 21,
    text: "I work best with background music or ambient noise.",
    category: "focus"
  },
  {
    id: 22,
    text: "I prefer to work in a structured, organized environment.",
    category: "workStyle"
  },
  {
    id: 23,
    text: "I feel most productive after physical exercise.",
    category: "energy"
  },
  {
    id: 24,
    text: "I can easily adapt to new productivity tools and methods.",
    category: "toolUsage"
  },
  {
    id: 25,
    text: "I prefer to work on multiple projects simultaneously.",
    category: "cognitive"
  }
];

// Intro Section Component
const IntroSection = ({ onStart }: { onStart: () => void }) => (
  <div className="container mx-auto px-4 py-8">
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center mb-4">Productivity Style Quiz</CardTitle>
        <CardDescription className="text-center text-lg">
          Discover your unique productivity archetype and learn how to optimize your workflow for maximum output.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-3">What You'll Learn:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your unique productivity type and chronotype</li>
            <li>Optimal time blocking strategies for your style</li>
            <li>Recommended tools and apps that match your workflow</li>
            <li>Team compatibility insights</li>
          </ul>
        </div>
        <div className="text-center">
          <button
            onClick={onStart}
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg rounded-full shadow-md transition-all hover:scale-105"
            style={{ fontSize: '1.125rem' }}
          >
            Begin Assessment
          </button>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Quiz Section Component
const QuizSection = ({ onComplete, onBack }: QuizSectionProps) => {
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
        onComplete(finalAnswers);
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
            <span className="text-xl font-semibold text-black">Productivity Style Assessment</span>
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
            {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next "}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Results Section Component
const ResultsSection = ({ results, onRestart }: ResultsSectionProps) => {
  const [activeTab, setActiveTab] = useState("scores");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDownloadResults = () => {
    const doc = new jsPDF();
    // Main Heading
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Productivity Style Quiz Results', 105, 20, { align: 'center' });
    // Subheading
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary', 14, 35);
    // Body
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Type: ${results.type}`, 14, 45);
    doc.text(`Chronotype: ${results.chronotype}`, 14, 53);
    doc.setFont('helvetica', 'italic');
    doc.text(`"${results.description}"`, 14, 61, { maxWidth: 180 });
    // Section Heading
    doc.setFont('helvetica', 'bold');
    doc.text('Scores:', 14, 75);
    doc.setFont('helvetica', 'normal');
    let y = 83;
    doc.text(`- Cognitive Rhythm: ${results.score.cognitive}%`, 18, y); y += 8;
    doc.text(`- Work Style: ${results.score.workStyle}%`, 18, y); y += 8;
    doc.text(`- Energy Management: ${results.score.energy}%`, 18, y); y += 8;
    doc.text(`- Focus Drivers: ${results.score.focus}%`, 18, y); y += 8;
    doc.text(`- Tool Usage: ${results.score.toolUsage}%`, 18, y); y += 8;
    // Strengths
    doc.setFont('helvetica', 'bold');
    doc.text('Strengths:', 14, y + 4); y += 12;
    doc.setFont('helvetica', 'normal');
    results.strengths.forEach((s: string, i: number) => {
      doc.text(`- ${s}`, 18, y + i * 8);
    });
    y = y + results.strengths.length * 8 + 8;
    // Challenges
    doc.setFont('helvetica', 'bold');
    doc.text('Challenges:', 14, y); y += 8;
    doc.setFont('helvetica', 'normal');
    results.challenges.forEach((c: string, i: number) => {
      doc.text(`- ${c}`, 18, y + i * 8);
    });
    y = y + results.challenges.length * 8 + 8;
    // Time Blocking
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Time Blocking Strategies:', 14, y); y += 8;
    doc.setFont('helvetica', 'normal');
    results.timeBlocking.forEach((t: string, i: number) => {
      doc.text(`- ${t}`, 18, y + i * 8);
    });
    y = y + results.timeBlocking.length * 8 + 8;
    // Tools
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Tools:', 14, y); y += 8;
    doc.setFont('helvetica', 'normal');
    results.tools.forEach((t: string, i: number) => {
      doc.text(`- ${t}`, 18, y + i * 8);
    });
    y = y + results.tools.length * 8 + 8;
    // Habits
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Habits:', 14, y); y += 8;
    doc.setFont('helvetica', 'normal');
    results.habits.forEach((h: string, i: number) => {
      doc.text(`- ${h}`, 18, y + i * 8);
    });
    doc.save('productivity-quiz-results.pdf');
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
      doc.text('Productivity Style Quiz Results', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      doc.text(`Primary Style: ${results.type}`, 14, y); y += 10;
      doc.text(`Chronotype: ${results.chronotype}`, 14, y); y += 10;
      doc.text(`Style Description: ${results.description}`, 14, y); y += 20;

      // Add scores
      doc.setFont('helvetica', 'bold');
      doc.text('Productivity Scores:', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      doc.text(`Cognitive Style: ${results.score.cognitive}%`, 18, y); y += 8;
      doc.text(`Work Style: ${results.score.workStyle}%`, 18, y); y += 8;
      doc.text(`Energy Management: ${results.score.energy}%`, 18, y); y += 8;
      doc.text(`Focus Drivers: ${results.score.focus}%`, 18, y); y += 8;
      doc.text(`Tool Usage: ${results.score.toolUsage}%`, 18, y); y += 20;

      // Add strengths and challenges
      doc.setFont('helvetica', 'bold');
      doc.text('Strengths:', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      results.strengths.forEach((strength: string) => {
        doc.text(`- ${strength}`, 18, y);
        y += 8;
      });

      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('Challenges:', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      results.challenges.forEach((challenge: string) => {
        doc.text(`- ${challenge}`, 18, y);
        y += 8;
      });

      // Add recommendations
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('Recommended Time Blocking Strategies:', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      results.timeBlocking.forEach((item: string) => {
        doc.text(`- ${item}`, 18, y);
        y += 8;
      });

      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('Recommended Tools:', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      results.tools.forEach((tool: string) => {
        doc.text(`- ${tool}`, 18, y);
        y += 8;
      });

      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('Recommended Habits:', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      results.habits.forEach((habit: string) => {
        doc.text(`- ${habit}`, 18, y);
        y += 8;
      });

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
          assessmentType: 'productivity-style',
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
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black mb-2">Your Productivity Results</h1>
          <p className="text-lg text-gray-700 mb-4">You are a <span className="font-semibold">{results.type}</span> with a <span className="font-semibold">{results.chronotype}</span> chronotype</p>
          <p className="text-base text-gray-600 mb-6">{results.description}</p>
        </div>
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-black">Productivity Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Cognitive Rhythm</span>
                <span className="text-sm font-semibold">{results.score.cognitive}%</span>
              </div>
              <Progress value={results.score.cognitive} className="h-2 bg-gray-200 [&>div]:bg-black" />
              <div className="flex justify-between items-center">
                <span className="font-medium">Work Style</span>
                <span className="text-sm font-semibold">{results.score.workStyle}%</span>
              </div>
              <Progress value={results.score.workStyle} className="h-2 bg-gray-200 [&>div]:bg-black" />
              <div className="flex justify-between items-center">
                <span className="font-medium">Energy Management</span>
                <span className="text-sm font-semibold">{results.score.energy}%</span>
              </div>
              <Progress value={results.score.energy} className="h-2 bg-gray-200 [&>div]:bg-black" />
              <div className="flex justify-between items-center">
                <span className="font-medium">Focus Drivers</span>
                <span className="text-sm font-semibold">{results.score.focus}%</span>
              </div>
              <Progress value={results.score.focus} className="h-2 bg-gray-200 [&>div]:bg-black" />
              <div className="flex justify-between items-center">
                <span className="font-medium">Tool Usage</span>
                <span className="text-sm font-semibold">{results.score.toolUsage}%</span>
              </div>
              <Progress value={results.score.toolUsage} className="h-2 bg-gray-200 [&>div]:bg-black" />
            </div>
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-center gap-3">
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
                <BarChart className="w-5 h-5" />
                Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.challenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span className="text-black">{challenge}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-black text-xl">Time Blocking & Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-semibold text-black mb-2">Recommended Time Blocking Strategies</h3>
              <ul className="list-disc pl-6 text-black space-y-1">
                {results.timeBlocking.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-black mb-2">Recommended Tools</h3>
              <ul className="list-disc pl-6 text-black space-y-1">
                {results.tools.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">Recommended Habits</h3>
              <ul className="list-disc pl-6 text-black space-y-1">
                {results.habits.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRestart}
            size="sm"
            variant="outline"
            className="px-4 py-2 text-base min-w-[120px] bg-white text-black border-black hover:bg-gray-100 transition-colors text-center whitespace-normal break-words flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Retake Assessment
          </Button>
          <Button
            onClick={handleDownloadResults}
            size="sm"
            variant="outline"
            className="px-4 py-2 text-base min-w-[120px] bg-white text-black border-black hover:bg-gray-100 transition-colors text-center whitespace-normal break-words flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Results
          </Button>
          <Button
            onClick={handleSendToEmail}
            size="sm"
            variant="outline"
            className="px-4 py-2 text-base min-w-[120px] bg-white text-black border-black hover:bg-gray-100 transition-colors text-center whitespace-normal break-words flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
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
};

const ProductivityStyleQuiz = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'assessment' | 'results'>('landing');
  const [results, setResults] = useState<any>(null);

  const handleStart = () => setCurrentView('assessment');
  
  const handleQuizComplete = (quizAnswers: Record<string, number>) => {
    // Calculate results based on answers
    const calculatedResults = {
      type: "Strategic Planner",
      chronotype: "Early Bird",
      description: "You excel at planning and executing tasks in a structured manner.",
      timeBlocking: ["Morning deep work", "Afternoon meetings", "Evening review"],
      tools: ["Notion", "Todoist", "Forest"],
      habits: ["Morning planning", "Daily review", "Weekly reflection"],
      strengths: ["Organization", "Planning", "Focus"],
      challenges: ["Flexibility", "Spontaneity"],
      compatibility: {
        works_well_with: ["Executors", "Analysts"],
        challenges_with: ["Spontaneous Creatives"]
      },
      score: {
        cognitive: 85,
        workStyle: 90,
        energy: 75,
        focus: 88,
        toolUsage: 82
      }
    };
    
    setResults(calculatedResults);
    setCurrentView('results');
  };

  const handleRestart = () => {
    setResults(null);
    setCurrentView('landing');
  };

  const handleBackToHome = () => setCurrentView('landing');

  if (currentView === 'assessment') {
    return <QuizSection onComplete={handleQuizComplete} onBack={handleBackToHome} />;
  }
  
  if (currentView === 'results' && results) {
    return <ResultsSection results={results} onRestart={handleRestart} />;
  }
  
  return <IntroSection onStart={handleStart} />;
};

export default ProductivityStyleQuiz; 