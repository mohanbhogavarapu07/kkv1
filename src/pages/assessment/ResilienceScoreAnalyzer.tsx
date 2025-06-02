import React, { useState } from "react";
import {
  TrendingUp,
  Brain,
  Target,
  Shield,
  Star,
  AlertTriangle,
  CheckCircle,
  Users,
  Calendar,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Download,
  Mail
} from "lucide-react";
import BaseAssessment from '../../components/BaseAssessment';

// =====================================
// 🧾 TYPES & LOGIC
// =====================================
export interface ResilienceResults {
  totalScore: number;
  subscores: {
    emotional: number;
    grit: number;
    cognitive: number;
    optimism: number;
  };
  archetype: string;
  roleModel: {
    name: string;
    description: string;
    quote: string;
    lessons: string[];
  };
  burnoutRisk: string;
  tier: string;
}

interface Question {
  id: number;
  dimension: string;
  reverse?: boolean;
  text: string;
  category: string;
}

const roleModels = {
  "The Comeback Fighter": {
    name: "Serena Williams",
    description: "Known for her incredible ability to come back from defeats and setbacks stronger than ever.",
    quote: "Every loss is a lesson. Every setback is a setup for a comeback.",
    lessons: [
      "Channel anger and disappointment into motivation",
      "Use visualization to prepare for challenges",
      "Focus on process over outcomes",
      "Maintain physical fitness for mental resilience"
    ]
  },
  "The Calm Stabilizer": {
    name: "Nelson Mandela",
    description: "Demonstrated extraordinary patience and optimism through 27 years of imprisonment.",
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    lessons: [
      "Practice patience as a form of strength",
      "Forgiveness as a path to freedom",
      "Maintain hope in dark times",
      "Lead by example during adversity"
    ]
  },
  "The Strategic Gritster": {
    name: "J.K. Rowling",
    description: "Overcame poverty and rejection to become one of the world's most successful authors.",
    quote: "Rock bottom became the solid foundation on which I rebuilt my life.",
    lessons: [
      "Turn failures into stepping stones",
      "Persist through multiple rejections",
      "Use imagination to escape difficult realities",
      "Believe in your vision when others don't"
    ]
  },
  "The Rebuilder": {
    name: "Viktor Frankl",
    description: "Found meaning and purpose even in the darkest circumstances of the Holocaust.",
    quote: "Everything can be taken from a man but one thing: the freedom to choose one's attitude.",
    lessons: [
      "Find meaning in suffering",
      "Focus on what you can control",
      "Help others to help yourself",
      "View challenges as opportunities for growth"
    ]
  }
};

export const calculateResilienceScore = (
  answers: Record<number, number>,
  questions: Question[]
): ResilienceResults => {
  const dimensionScores = {
    emotional: 0,
    grit: 0,
    cognitive: 0,
    optimism: 0
  };
  const dimensionCounts = {
    emotional: 0,
    grit: 0,
    cognitive: 0,
    optimism: 0
  };
  questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer) {
      let score = question.reverse ? 8 - answer : answer;
      dimensionScores[question.dimension as keyof typeof dimensionScores] += score;
      dimensionCounts[question.dimension as keyof typeof dimensionCounts]++;
    }
  });
  const subscores = {
    emotional: Math.round((dimensionScores.emotional / dimensionCounts.emotional) * (25 / 7)),
    grit: Math.round((dimensionScores.grit / dimensionCounts.grit) * (25 / 7)),
    cognitive: Math.round((dimensionScores.cognitive / dimensionCounts.cognitive) * (25 / 7)),
    optimism: Math.round((dimensionScores.optimism / dimensionCounts.optimism) * (25 / 7))
  };
  const totalScore =
    subscores.emotional + subscores.grit + subscores.cognitive + subscores.optimism;
  let archetype = "The Rebuilder";
  if (subscores.emotional >= 20 && subscores.grit >= 20) {
    archetype = "The Comeback Fighter";
  } else if (subscores.cognitive >= 20 && subscores.optimism >= 20) {
    archetype = "The Calm Stabilizer";
  } else if (subscores.grit >= 20 && subscores.cognitive >= 20) {
    archetype = "The Strategic Gritster";
  }
  let tier = "Fragile";
  if (totalScore >= 86) tier = "Grit-Rich Powerhouse";
  else if (totalScore >= 66) tier = "Tough-Minded Achiever";
  else if (totalScore >= 41) tier = "Adaptive";
  let burnoutRisk = "Low";
  if (subscores.emotional < 15 || subscores.optimism < 15) {
    burnoutRisk = "High";
  } else if (subscores.emotional < 20 || subscores.optimism < 20) {
    burnoutRisk = "Moderate";
  }
  return {
    totalScore,
    subscores,
    archetype,
    roleModel: roleModels[archetype as keyof typeof roleModels],
    burnoutRisk,
    tier
  };
};

// =====================================
// 🎨 UI PRIMITIVES (INLINE)
// =====================================

function CardHeader({ className = '', children, ...props }: any) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className = '', children, ...props }: any) {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  );
}

function CardContent({ className = '', children, ...props }: any) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function Button({ children, ...props }: any) {
  return (
    <button 
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 bg-black text-white disabled:bg-gray-300" 
      {...props}
    >
      {children}
    </button>
  );
}

const Card = React.forwardRef(({ className = "", ...props }: any, ref: any) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-white text-black shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardDescription = React.forwardRef(({ className = "", ...props }: any, ref: any) => (
  <p ref={ref} className={cn("text-sm text-gray-500", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardFooter = React.forwardRef(({ className = "", ...props }: any, ref: any) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

function Badge({ className = "", variant = "default", ...props }: any) {
  const variants: Record<string, string> = {
    default:
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-black text-white border-transparent",
    secondary:
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-700 text-white border-transparent",
    outline:
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-black border-black"
  };
  return <div className={cn(variants[variant], className)} {...props} />;
}

const Progress = React.forwardRef(({ className = "", value = 0, ...props }: any, ref: any) => (
  <div
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-200", className)}
    {...props}
  >
    <div
      className="h-full bg-black transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
));
Progress.displayName = "Progress";

function Tabs({ defaultValue, children, className = "" }: any) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { value, setValue })
      )}
    </div>
  );
}

function TabsList({ children, className = "", value, setValue }: any) {
  return (
    <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500", className)}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { value, setValue })
      )}
    </div>
  );
}

function TabsTrigger({ value: triggerValue, children, className = "", value, setValue }: any) {
  const isActive = value === triggerValue;
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
        isActive ? "bg-black text-white shadow-sm" : "bg-gray-100 text-gray-700",
        className
      )}
      onClick={() => setValue(triggerValue)}
    >
      {children}
    </button>
  );
}

function TabsContent({ value: contentValue, value: currentValue, children, className = "", ...props }: any) {
  if (currentValue !== contentValue) return null;
  return (
    <div className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  );
}

// =====================================
// 🌟 HERO SECTION
// =====================================
function HeroSection({ onStartQuiz }: { onStartQuiz: () => void }) {
  return (
    <BaseAssessment assessmentType="resilience-score">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Resilience Blueprint Index
          </h1>
          <p className="text-lg text-gray-700 mb-6">
              Discover your resilience, grit, and recovery potential
              </p>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-full">
                  <Brain className="h-6 w-6 text-black" />
                </div>
              <h3 className="text-lg font-semibold text-black">What is Resilience?</h3>
            </div>
            <p className="text-gray-700">
              Resilience is your ability to bounce back from setbacks, adapt to change, and keep going in the face of adversity. This assessment measures your resilience strengths and growth opportunities.
                  </p>
                </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-full">
                  <Lightbulb className="h-6 w-6 text-black" />
                </div>
              <h3 className="text-lg font-semibold text-black">What You'll Learn</h3>
                </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-black" />
                Your resilience score and profile
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-black" />
                Areas of strength and growth
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-black" />
                Personalized recommendations
              </li>
            </ul>
              </div>
            </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">About This Assessment</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-black" />
                    Takes approximately 5-7 minutes to complete
                </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-black" />
                    Includes 20 questions across 4 resilience dimensions
                </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-black" />
                    Provides detailed feedback and personalized recommendations
                </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-black" />
                    Your responses are completely private and confidential
                </li>
              </ul>
            </div>

        <div className="text-center">
          <button
              onClick={onStartQuiz}
              className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-8 rounded-full shadow-md transition-all hover:scale-105 text-lg"
            >
              Begin Assessment
          </button>
          </div>
      </div>
    </BaseAssessment>
  );
}

// =====================================
// 📝 QUIZ SECTION
// =====================================
const questions: Question[] = [
  {
    id: 1,
    dimension: "emotional",
    text: "When faced with repeated failure, I typically bounce back quickly and try again.",
    category: "Emotional Endurance",
  },
  {
    id: 2,
    dimension: "grit",
    text: "I have difficulty maintaining focus on projects that take more than a few months to complete.",
    category: "Grit & Perseverance",
    reverse: true,
  },
  {
    id: 3,
    dimension: "cognitive",
    text: "When things go wrong, I usually find creative solutions or alternative approaches.",
    category: "Cognitive Flexibility",
  },
  {
    id: 4,
    dimension: "optimism",
    text: "I believe that setbacks usually lead to better outcomes in the long run.",
    category: "Optimism & Recovery",
  },
  {
    id: 5,
    dimension: "emotional",
    text: "Criticism or rejection affects my mood for several days.",
    category: "Emotional Endurance",
    reverse: true,
  },
  {
    id: 6,
    dimension: "grit",
    text: "I finish whatever I begin, even when it becomes difficult or boring.",
    category: "Grit & Perseverance",
  },
  {
    id: 7,
    dimension: "cognitive",
    text: "I adapt quickly when circumstances change unexpectedly.",
    category: "Cognitive Flexibility",
  },
  {
    id: 8,
    dimension: "optimism",
    text: "After experiencing a major disappointment, I recover emotionally within a few days.",
    category: "Optimism & Recovery",
  },
  {
    id: 9,
    dimension: "emotional",
    text: "I can handle high-stress situations without becoming overwhelmed.",
    category: "Emotional Endurance",
  },
  {
    id: 10,
    dimension: "grit",
    text: "I have achieved goals that took years of work to accomplish.",
    category: "Grit & Perseverance",
  },
  {
    id: 11,
    dimension: "cognitive",
    text: "I find it hard to think clearly when under pressure.",
    category: "Cognitive Flexibility",
    reverse: true,
  },
  {
    id: 12,
    dimension: "optimism",
    text: "I expect good things to happen to me in the future.",
    category: "Optimism & Recovery",
  },
  {
    id: 13,
    dimension: "emotional",
    text: "I tend to dwell on mistakes for a long time.",
    category: "Emotional Endurance",
    reverse: true,
  },
  {
    id: 14,
    dimension: "grit",
    text: "I often set goals but later choose to pursue other things instead.",
    category: "Grit & Perseverance",
    reverse: true,
  },
  {
    id: 15,
    dimension: "cognitive",
    text: "I can reframe negative situations to find potential benefits or learning opportunities.",
    category: "Cognitive Flexibility",
  },
  {
    id: 16,
    dimension: "optimism",
    text: "When bad things happen, I believe they are temporary rather than permanent.",
    category: "Optimism & Recovery",
  },
  {
    id: 17,
    dimension: "emotional",
    text: "I maintain my composure during conflicts or confrontations.",
    category: "Emotional Endurance",
  },
  {
    id: 18,
    dimension: "grit",
    text: "I have been obsessed with a certain idea or project for years.",
    category: "Grit & Perseverance",
  },
  {
    id: 19,
    dimension: "cognitive",
    text: "I struggle to see multiple perspectives when facing a problem.",
    category: "Cognitive Flexibility",
    reverse: true,
  },
  {
    id: 20,
    dimension: "optimism",
    text: "I have confidence that I can overcome most challenges that come my way.",
    category: "Optimism & Recovery",
  },
];

const scaleLabels = [
  "Strongly Disagree",
  "Disagree",
  "Slightly Disagree",
  "Neutral",
  "Slightly Agree",
  "Agree",
  "Strongly Agree",
];

function ResilienceQuiz({ onComplete }: { onComplete: (results: ResilienceResults) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const results = calculateResilienceScore(answers, questions);
      onComplete(results);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ.id];

  return (
    <BaseAssessment assessmentType="resilience-score">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-black" />
            <span className="text-xl font-semibold text-black">
              Resilience Assessment
            </span>
          </div>
          <span className="text-sm font-medium text-black">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-black">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              className="h-full bg-black transition-all"
              style={{ width: `${progress}%` }}
            />
        </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-gray-100 rounded-full">
                <span className="text-black text-sm font-medium">
                  {currentQ.category}
                </span>
              </div>
            </div>
          <h2 className="text-xl font-semibold text-black mb-6">
              {currentQ.text}
          </h2>
          <div className="space-y-4">
            {scaleLabels.map((label, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQ.id, index + 1)}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  currentAnswer === index + 1
                    ? "bg-black text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-black"
                }`}
              >
                {label}
              </button>
              ))}
            </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border-2 border-black text-black bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:border-gray-300 rounded-lg inline-flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentAnswer == null}
            className="px-6 py-3 bg-black text-white disabled:bg-gray-300 rounded-lg inline-flex items-center"
          >
            {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </BaseAssessment>
  );
}

// =====================================
// 📊 RESULTS SECTION
// =====================================
function ResilienceResults({
  results,
  onRetakeQuiz,
}: {
  results: ResilienceResults;
  onRetakeQuiz: () => void;
}) {
  return (
    <BaseAssessment assessmentType="resilience-score">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button 
            onClick={() => window.history.back()} 
            className="px-6 py-3 text-base bg-gray-100 text-black border-2 border-black rounded-lg inline-flex items-center"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Assessments
          </button>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            Your Resilience Assessment Results
          </div>
          <div className="text-8xl font-bold text-black mb-4">
            {results.totalScore}
          </div>
          <h2 className="text-3xl font-bold text-black mb-2">
            {results.tier}
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Your Resilience Archetype: <span className="text-black font-semibold">{results.archetype}</span>
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className={`px-3 py-1 rounded-full text-white ${
              results.burnoutRisk === 'Low' ? 'bg-green-500' :
              results.burnoutRisk === 'Moderate' ? 'bg-yellow-500' :
              'bg-red-500'
            }`}>
              Burnout Risk: {results.burnoutRisk}
            </span>
          </div>
        </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-black mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-black" />
                  Resilience Dimensions
                </h3>
                <div className="space-y-6">
              {Object.entries(results.subscores).map(([dimension, score]) => (
                <div key={dimension}>
                    <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 capitalize">
                      {dimension.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-semibold text-black">
                      {score}/25
                      </span>
                    </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-black transition-all"
                      style={{ width: `${(score / 25) * 100}%` }}
                    />
                  </div>
                    </div>
              ))}
                  </div>
                    </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-black mb-6 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-black" />
                  What This Means
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-black mb-2">Your Resilience Tier</h4>
                    <p className="text-gray-700 text-sm">
                      {results.tier === 'Grit-Rich Powerhouse' && "Exceptional resilience - you thrive under pressure and consistently overcome major challenges."}
                      {results.tier === 'Tough-Minded Achiever' && "Strong resilience - you handle most setbacks well and pursue long-term goals effectively."}
                      {results.tier === 'Adaptive' && "Average resilience - you cope reasonably well but have room to strengthen your mental toughness."}
                      {results.tier === 'Fragile' && "Developing resilience - focus on building foundational coping skills and stress management."}
                    </p>
                  </div>
                    </div>
                  </div>
                </div>

        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <button 
            onClick={onRetakeQuiz} 
            className="px-6 py-3 text-base min-w-[180px] bg-gray-100 text-black border-2 border-black rounded-lg inline-flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Retake Assessment
          </button>
          <button 
            className="px-6 py-3 text-base min-w-[180px] bg-gray-100 text-black border-2 border-black rounded-lg inline-flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Results
          </button>
          <button 
            className="px-6 py-3 text-base min-w-[180px] bg-gray-100 text-black border-2 border-black rounded-lg inline-flex items-center justify-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            Send to Email
          </button>
        </div>
      </div>
    </BaseAssessment>
  );
}

// =====================================
// 🎯 MAIN COMPONENT
// =====================================
const ResilienceScoreAnalyzer = () => {
  const [step, setStep] = useState<'hero' | 'quiz' | 'results'>('hero');
  const [results, setResults] = useState<ResilienceResults | null>(null);

  const handleStartQuiz = () => {
    setStep('quiz');
  };

  const handleComplete = (quizResults: ResilienceResults) => {
    setResults(quizResults);
    setStep('results');
  };

  const handleRetakeQuiz = () => {
    setStep('quiz');
  };

  if (step === 'hero') {
    return <HeroSection onStartQuiz={handleStartQuiz} />;
  }

  if (step === 'quiz') {
    return <ResilienceQuiz onComplete={handleComplete} />;
  }

  if (step === 'results' && results) {
    return <ResilienceResults results={results} onRetakeQuiz={handleRetakeQuiz} />;
  }

  return null;
};

export default ResilienceScoreAnalyzer; 