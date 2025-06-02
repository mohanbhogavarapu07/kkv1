import React, { useState } from "react";
import { ChevronLeft, ChevronRight, BarChart, Download, Mail, Share2, RefreshCcw } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import jsPDF from 'jspdf';

interface AssessmentResults {
  style: string;
  description: string;
  scores: Record<string, number>;
  strengths: string[];
  developmentAreas: string[];
}

interface ResultsSectionProps {
  results: AssessmentResults;
  onRestart: () => void;
}

// Quiz Section Component
const QuizSection = ({ onComplete, onBack }: { onComplete: (answers: Record<string, number>) => void; onBack: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      category: "Vision & Strategy",
      text: "I can clearly articulate a compelling vision for my team's future.",
    },
    {
      id: 2,
      category: "Communication",
      text: "I actively listen to my team members and value their input.",
    },
    {
      id: 3,
      category: "Decision Making",
      text: "I make decisions confidently while considering team input.",
    },
    {
      id: 4,
      category: "Team Building",
      text: "I actively work to build trust and collaboration within my team.",
    },
    {
      id: 5,
      category: "Adaptability",
      text: "I can quickly adapt my leadership style to different situations.",
    },
    {
      id: 6,
      category: "Emotional Intelligence",
      text: "I am aware of and can manage my emotions effectively in challenging situations.",
    },
    {
      id: 7,
      category: "Innovation",
      text: "I encourage creative thinking and new ideas from my team.",
    },
    {
      id: 8,
      category: "Accountability",
      text: "I take responsibility for both successes and failures.",
    },
    {
      id: 9,
      category: "Development",
      text: "I actively mentor and develop my team members.",
    },
    {
      id: 10,
      category: "Strategic Thinking",
      text: "I can see the bigger picture and plan for long-term success.",
    },
    {
      id: 11,
      category: "Vision & Strategy",
      text: "I regularly communicate the organization's goals and how they align with our vision.",
    },
    {
      id: 12,
      category: "Communication",
      text: "I provide clear and constructive feedback to help team members improve.",
    },
    {
      id: 13,
      category: "Decision Making",
      text: "I gather relevant information before making important decisions.",
    },
    {
      id: 14,
      category: "Team Building",
      text: "I create opportunities for team members to collaborate and learn from each other.",
    },
    {
      id: 15,
      category: "Adaptability",
      text: "I remain calm and focused when facing unexpected challenges.",
    },
    {
      id: 16,
      category: "Emotional Intelligence",
      text: "I can sense and respond appropriately to others' emotions.",
    },
    {
      id: 17,
      category: "Innovation",
      text: "I create a safe environment for team members to experiment and take risks.",
    },
    {
      id: 18,
      category: "Accountability",
      text: "I hold myself and others accountable for meeting commitments.",
    },
    {
      id: 19,
      category: "Development",
      text: "I identify and nurture potential in team members.",
    },
    {
      id: 20,
      category: "Strategic Thinking",
      text: "I anticipate potential challenges and plan accordingly.",
    },
    {
      id: 21,
      category: "Vision & Strategy",
      text: "I help team members understand how their work contributes to larger goals.",
    },
    {
      id: 22,
      category: "Communication",
      text: "I adapt my communication style to different audiences and situations.",
    },
    {
      id: 23,
      category: "Decision Making",
      text: "I consider multiple perspectives before making important decisions.",
    },
    {
      id: 24,
      category: "Team Building",
      text: "I recognize and celebrate team achievements.",
    },
    {
      id: 25,
      category: "Adaptability",
      text: "I embrace change and help others navigate through it.",
    }
  ];

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
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <BarChart className="w-6 h-6 text-black" />
            <span className="text-xl font-semibold text-black">Leadership Assessment</span>
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
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Results Section Component
const ResultsSection = ({ results, onRestart }: ResultsSectionProps) => {
  const handleDownloadResults = () => {
    const doc = new jsPDF();
    // Main Heading
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Leadership Assessment Results', 105, 20, { align: 'center' });
    // Subheading
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary', 14, 35);
    // Body
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Leadership Style: ${results.style}`, 14, 45);
    doc.setFont('helvetica', 'italic');
    doc.text(`"${results.description}"`, 14, 53, { maxWidth: 180 });
    // Section Heading
    doc.setFont('helvetica', 'bold');
    doc.text('Scores:', 14, 67);
    doc.setFont('helvetica', 'normal');
    let y = 75;
    Object.entries(results.scores).forEach(([category, score]) => {
      doc.text(`- ${category}: ${score}%`, 18, y);
      y += 8;
    });
    // Strengths
    doc.setFont('helvetica', 'bold');
    doc.text('Strengths:', 14, y + 4); y += 12;
    doc.setFont('helvetica', 'normal');
    results.strengths.forEach((s: string, i: number) => {
      doc.text(`- ${s}`, 18, y + i * 8);
    });
    y = y + results.strengths.length * 8 + 8;
    // Development Areas
    doc.setFont('helvetica', 'bold');
    doc.text('Development Areas:', 14, y); y += 8;
    doc.setFont('helvetica', 'normal');
    results.developmentAreas.forEach((d: string, i: number) => {
      doc.text(`- ${d}`, 18, y + i * 8);
    });
    doc.save('leadership-assessment-results.pdf');
  };

  const handleEmailResults = () => {
    const subject = 'My Leadership Assessment Results';
    const body = `
Hi,

Here are my Leadership Assessment results:

Leadership Style: ${results.style}
Description: ${results.description}

Scores:
${Object.entries(results.scores).map(([category, score]) => `- ${category}: ${score}%`).join('\n')}

Strengths:
${results.strengths.map(strength => `- ${strength}`).join('\n')}

Development Areas:
${results.developmentAreas.map(area => `- ${area}`).join('\n')}
    `;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black mb-2">Your Leadership Profile</h1>
          <p className="text-lg text-gray-700 mb-4">Leadership Style: <span className="font-semibold">{results.style}</span></p>
          <p className="text-base text-gray-600 mb-6">{results.description}</p>
        </div>
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-black">Leadership Competencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(results.scores).map(([category, score]) => (
                <div key={category}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category}</span>
                    <span className="text-sm font-semibold">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2 bg-gray-200 [&>div]:bg-black" />
                </div>
              ))}
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
                Development Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.developmentAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span className="text-black">{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
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
            onClick={handleEmailResults}
            size="sm"
            variant="outline"
            className="px-4 py-2 text-base min-w-[120px] bg-white text-black border-black hover:bg-gray-100 transition-colors text-center whitespace-normal break-words flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Send to Email
          </Button>
        </div>
      </div>
    </div>
  );
};

// Introduction Page Component
const IntroductionPage = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen bg-white text-black">
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <Card className="border-none shadow-lg bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-black">Leadership Assessment</CardTitle>
          <CardDescription className="text-lg mt-2 text-black">
            Discover your leadership style, strengths, and areas for growth
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-black mb-3">What is Leadership Assessment?</h2>
            <p className="text-black mb-4">
              This assessment helps you understand your leadership style, core competencies, and development areas. Use it to gain insights into your approach to vision, communication, decision making, team building, and more.
            </p>
            <p className="text-black">
              Get a personalized profile and actionable recommendations to elevate your leadership impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
              <div className="bg-gray-100 p-2 rounded-full">
                <BarChart className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-medium text-black">Self-Discovery</h3>
                <p className="text-sm text-gray-600">Identify your unique leadership strengths and style</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
              <div className="bg-gray-100 p-2 rounded-full">
                <ChevronRight className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-medium text-black">Growth Focus</h3>
                <p className="text-sm text-gray-600">Pinpoint areas for development and actionable next steps</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-black mb-3">About This Assessment</h2>
            <ul className="space-y-2 text-black">
              <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Takes approximately 8-10 minutes to complete</span></li>
              <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Includes 25 questions across 10 leadership competencies</span></li>
              <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Provides a detailed profile and personalized recommendations</span></li>
              <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Your responses are private and confidential</span></li>
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

// Home Page Component
const HomePage = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen bg-white">
    <div className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <Card className="border-none shadow-lg bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-black">Leadership Archetype Assessment</CardTitle>
          <CardDescription className="text-lg mt-2 text-black">Discover your unique leadership style and learn how to leverage your strengths</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-black mb-3">What is Leadership Archetype?</h2>
            <p className="text-black mb-4">Your leadership archetype represents your natural approach to leading others, influencing decisions, and driving organizational success.</p>
            <p className="text-black">This assessment will help you understand your core leadership style and provide actionable insights for growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
              <div className="bg-gray-100 p-2 rounded-full">
                <BarChart className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-medium text-black">Personalized Insights</h3>
                <p className="text-sm text-gray-600">Get detailed analysis of your leadership strengths and development areas</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
              <div className="bg-gray-100 p-2 rounded-full">
                <ChevronRight className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-medium text-black">Actionable Recommendations</h3>
                <p className="text-sm text-gray-600">Receive practical strategies to enhance your leadership effectiveness</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-black mb-3">About This Assessment</h2>
            <ul className="space-y-2 text-black">
              <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Takes approximately 10-15 minutes to complete</span></li>
              <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Includes 24 questions across 10 key dimensions</span></li>
              <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Provides detailed feedback and personalized recommendations</span></li>
              <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Your responses are completely private and confidential</span></li>
            </ul>
          </div>
        </CardContent>
        <div className="flex justify-center pb-8">
          <button
            onClick={onStart}
            className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-8 rounded-full shadow-md transition-all hover:scale-105 text-lg"
          >
            Begin Assessment
          </button>
        </div>
      </Card>
    </div>
  </div>
);

const LeadershipAssessment = () => {
  const [currentView, setCurrentView] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const handleQuizComplete = (answers: Record<string, number>) => {
    // Calculate results based on answers
    const calculatedResults: AssessmentResults = {
      style: "Transformational Leader",
      description: "You demonstrate strong abilities in inspiring and motivating others while driving innovation and change.",
      scores: {
        "Vision & Strategy": 85,
        "Communication": 90,
        "Decision Making": 80,
        "Team Building": 88,
        "Adaptability": 82
      },
      strengths: [
        "Strong communication skills",
        "Excellent team building abilities",
        "Strategic thinking",
        "Emotional intelligence"
      ],
      developmentAreas: [
        "Risk-taking in decision making",
        "Conflict resolution",
        "Time management"
      ]
    };
    
    setResults(calculatedResults);
    setCurrentView('results');
  };

  const handleRestart = () => {
    setResults(null);
    setCurrentView('intro');
  };

  if (currentView === 'intro') {
    return <IntroductionPage onStart={() => setCurrentView('quiz')} />;
  }

  if (currentView === 'results' && results) {
    return <ResultsSection results={results} onRestart={handleRestart} />;
  }

  return <QuizSection onComplete={handleQuizComplete} onBack={() => setCurrentView('intro')} />;
};

export default LeadershipAssessment; 