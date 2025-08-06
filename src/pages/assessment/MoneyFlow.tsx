import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Brain, Target, DollarSign, TrendingUp, RotateCcw, CheckCircle, Download, Mail, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import jsPDF from 'jspdf';

// =========================
// Utilities
// =========================
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
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
// Assessment Logic
// =========================
const questions = [
  // Section 1: Money Feeling Frequency (12 questions)
  { id: 1, text: "How do you feel when you set high financial goals?", type: "multiple", options: ["Excited and motivated", "Anxious but hopeful", "Overwhelmed", "Confident", "Fearful or doubtful"] },
  { id: 2, text: "What's your emotional reaction when you don't meet financial targets?", type: "multiple", options: ["Disappointed but motivated", "Frustrated and angry", "Ashamed or guilty", "Neutral, it happens", "Extremely discouraged"] },
  { id: 3, text: "When someone asks about your income or savings, how do you feel?", type: "multiple", options: ["Comfortable and open", "Slightly uncomfortable", "Very uncomfortable", "Proud to share", "Defensive"] },
  { id: 4, text: "How do you feel when you want to purchase something beyond your budget?", type: "multiple", options: ["Frustrated and restricted", "Motivated to earn more", "Guilty for wanting it", "Patient, I'll wait", "Tempted to buy anyway"] },
  { id: 5, text: "What emotions come up when you receive unexpected money?", type: "multiple", options: ["Pure joy and gratitude", "Excitement mixed with guilt", "Anxiety about spending it right", "Relief", "Suspicion or worry"] },
  { id: 6, text: "How do you feel when you must ask for financial help?", type: "multiple", options: ["Humiliated and ashamed", "Uncomfortable but grateful", "Neutral, it's just practical", "Anxious but hopeful", "Resistant to asking"] },
  { id: 7, text: "How do you emotionally respond to your peers earning more?", type: "multiple", options: ["Inspired and motivated", "Slightly envious but supportive", "Jealous and resentful", "Indifferent", "Curious about their methods"] },
  { id: 8, text: "What do you feel when you see others living a wealthier lifestyle?", type: "multiple", options: ["Inspired to achieve more", "Envious but motivated", "Bitter or resentful", "Happy for them", "Insecure about my situation"] },
  { id: 9, text: "What's your emotional state when paying bills or making large purchases?", type: "multiple", options: ["Calm and in control", "Slightly anxious", "Very stressed", "Excited about the purchase", "Resentful"] },
  { id: 10, text: "Do you experience guilt or shame while spending on yourself?", type: "multiple", options: ["Often", "Sometimes", "Rarely", "Never", "Only for expensive items"] },
  { id: 11, text: "How do you feel about receiving money as a gift or bonus?", type: "multiple", options: ["Grateful and deserving", "Grateful but guilty", "Uncomfortable receiving", "Excited and appreciative", "Worried about obligations"] },
  { id: 12, text: "How do you feel about wealthy people in general?", type: "multiple", options: ["Admiration and respect", "Slightly envious but positive", "Neutral feelings", "Suspicious or resentful", "Strong negative feelings"] },

  // Section 2: Money Thoughts & Beliefs Frequency (14 questions)
  { id: 13, text: "Wealth is only for a few lucky or talented people", type: "likert" },
  { id: 14, text: "Money equals security and peace of mind", type: "likert" },
  { id: 15, text: "I feel conflicted about wanting to be rich", type: "multiple", options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"] },
  { id: 16, text: "There's never enough money, no matter how much I have", type: "likert" },
  { id: 17, text: "Wealth corrupts character or spirituality", type: "likert" },
  { id: 18, text: "Setting big money goals is arrogant or selfish", type: "multiple", options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"] },
  { id: 19, text: "You have to work extremely hard to be wealthy", type: "likert" },
  { id: 20, text: "I'm naturally bad with managing money", type: "multiple", options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"] },
  { id: 21, text: "I believe that rich people are generally greedy", type: "multiple", options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"] },
  { id: 22, text: "Financial freedom is attainable for someone like me", type: "likert" },
  { id: 23, text: "I believe I deserve to be wealthy", type: "likert" },
  { id: 24, text: "Money causes more problems than it solves", type: "multiple", options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"] },
  { id: 25, text: "I worry that having too much money will change me negatively", type: "multiple", options: ["Very worried", "Somewhat worried", "Neutral", "Not worried", "Excited about the change"] },
  { id: 26, text: "Only people with special connections can build real wealth", type: "likert" },

  // Section 3: Money Action Frequency (12 questions)
  { id: 27, text: "How often do you actively track your income and expenses?", type: "multiple", options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"] },
  { id: 28, text: "I am consistent with my budgeting habits", type: "likert" },
  { id: 29, text: "I procrastinate when it comes to financial tasks", type: "multiple", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
  { id: 30, text: "I avoid checking my bank account or credit score", type: "multiple", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
  { id: 31, text: "Are you currently investing or saving with a plan?", type: "multiple", options: ["Yes, with a detailed plan", "Yes, but informally", "Thinking about it", "No, but want to", "No interest"] },
  { id: 32, text: "I actively seek financial advice or mentorship", type: "multiple", options: ["Regularly", "Occasionally", "Rarely", "Never", "I prefer learning alone"] },
  { id: 33, text: "How often do you set and review financial goals?", type: "multiple", options: ["Monthly", "Quarterly", "Yearly", "Rarely", "Never"] },
  { id: 34, text: "My money decisions are driven more by:", type: "multiple", options: ["Pure emotion", "Mostly emotion", "Balanced emotion/logic", "Mostly logic", "Pure logic"] },
  { id: 35, text: "I make impulse purchases frequently", type: "multiple", options: ["Very often", "Often", "Sometimes", "Rarely", "Never"] },
  { id: 36, text: "I have taken concrete steps to increase my income recently", type: "multiple", options: ["Multiple active steps", "A few steps", "One or two steps", "Thinking about it", "No steps taken"] },
  { id: 37, text: "I consistently follow through on my money plans", type: "likert" },
  { id: 38, text: "I focus more on spending than building assets", type: "multiple", options: ["Strongly agree", "Somewhat agree", "Neutral", "Somewhat disagree", "Strongly disagree"] },

  // Section 4: Current Situation Frequency (12 questions)
  { id: 39, text: "My monthly income is at least 2x my expenses", type: "multiple", options: ["Yes, significantly more", "Yes, about 2x", "Close to 2x", "No, but close", "No, far from it"] },
  { id: 40, text: "My current debt situation:", type: "multiple", options: ["Completely debt-free", "Actively paying off debt", "Managing debt well", "Struggling with debt", "Overwhelmed by debt"] },
  { id: 41, text: "I save a consistent percentage of my income", type: "multiple", options: ["Yes, 20% or more", "Yes, 10-19%", "Yes, 5-9%", "Yes, under 5%", "No, inconsistent"] },
  { id: 42, text: "I have multiple streams of income", type: "multiple", options: ["Yes, several active streams", "Yes, 2-3 streams", "Yes, 1 additional stream", "Working on developing them", "No, single income source"] },
  { id: 43, text: "My current investing activity:", type: "multiple", options: ["Regular, diversified investing", "Occasional investing", "Just started investing", "Planning to start soon", "Not investing"] },
  { id: 44, text: "I own income-generating assets", type: "multiple", options: ["Yes, multiple assets", "Yes, one main asset", "Yes, small investments", "Planning to acquire", "No assets"] },
  { id: 45, text: "I have a written financial plan or roadmap", type: "multiple", options: ["Detailed written plan", "Basic written plan", "Mental plan only", "Rough ideas", "No plan"] },
  { id: 46, text: "I feel financially prepared for emergencies", type: "likert" },
  { id: 47, text: "I regularly provide financial support to others", type: "multiple", options: ["Yes, significant support", "Yes, moderate support", "Yes, occasional support", "Rarely", "Never"] },
  { id: 48, text: "I actively work on improving my money knowledge", type: "multiple", options: ["Constantly learning", "Regular learning", "Occasional learning", "Rarely", "Never"] },
  { id: 49, text: "I feel in complete control of my financial decisions", type: "likert" },
  { id: 50, text: "My current lifestyle aligns with my values and goals", type: "likert" }
];

const sectionTitles = [
  "Money Feeling Frequency",
  "Money Thoughts & Beliefs",
  "Money Action Frequency", 
  "Current Financial Reality"
];

const likertOptions = [
  "Strongly Disagree",
  "Disagree", 
  "Neutral",
  "Agree",
  "Strongly Agree"
];

const yesNoOptions = ["Yes", "Maybe", "No"];

function calculateScores(data: { [key: string]: string }) {
  const calculateSectionScore = (sectionStart: number, sectionEnd: number, isFeelingsSection = false) => {
    let totalScore = 0;
    let questionCount = 0;
    
    for (let i = sectionStart; i <= sectionEnd; i++) {
      const answer = data[i.toString()];
      if (answer && answer.trim() !== '') {
        let score = 3; // Default neutral
        
        // For likert scale questions (stored as "1", "2", "3", "4", "5")
        if (!isNaN(Number(answer))) {
          score = Number(answer);
        }
        // For feelings section - score based on emotional positivity
        else if (isFeelingsSection) {
          const positiveResponses = [
            'Excited and motivated', 'Confident', 'Disappointed but motivated', 
            'Neutral, it happens', 'Comfortable and open', 'Proud to share',
            'Motivated to earn more', 'Patient, I\'ll wait', 'Pure joy and gratitude',
            'Relief', 'Neutral, it\'s just practical', 'Inspired and motivated',
            'Happy for them', 'Calm and in control', 'Never', 'Rarely',
            'Grateful and deserving', 'Excited and appreciative'
          ];
          const negativeResponses = [
            'Fearful or doubtful', 'Overwhelmed', 'Extremely discouraged',
            'Ashamed or guilty', 'Very uncomfortable', 'Defensive',
            'Guilty for wanting it', 'Tempted to buy anyway', 'Suspicion or worry',
            'Anxiety about spending it right', 'Humiliated and ashamed',
            'Resistant to asking', 'Jealous and resentful', 'Bitter or resentful',
            'Insecure about my situation', 'Very stressed', 'Resentful',
            'Often', 'Uncomfortable receiving', 'Worried about obligations'
          ];
          
          if (positiveResponses.includes(answer)) score = 5;
          else if (negativeResponses.includes(answer)) score = 2;
          else score = 3;
        }
        // For other multiple choice questions
        else {
          // Map answers to scores based on financial positivity
          const scoreMap: { [key: string]: number } = {
            // High positive responses
            'Strongly disagree': 5, 'Never': 5, 'Yes, significantly more': 5,
            'Completely debt-free': 5, 'Yes, 20% or more': 5, 'Yes, several active streams': 5,
            'Regular, diversified investing': 5, 'Yes, multiple assets': 5,
            'Detailed written plan': 5, 'Multiple active steps': 5, 'Constantly learning': 5,
            'Pure logic': 5, 'Regular learning': 5,
            
            // Positive responses  
            'Somewhat disagree': 4, 'Rarely': 4, 'Yes, about 2x': 4,
            'Actively paying off debt': 4, 'Yes, 10-19%': 4, 'Yes, 2-3 streams': 4,
            'Occasional investing': 4, 'Yes, one main asset': 4,
            'Basic written plan': 4, 'A few steps': 4, 'Mostly logic': 4,
            'Daily': 4, 'Monthly': 4, 'Regularly': 4, 'Yes, significant support': 4,
            
            // Neutral responses
            'Neutral': 3, 'Sometimes': 3, 'Close to 2x': 3,
            'Managing debt well': 3, 'Yes, 5-9%': 3, 'Yes, 1 additional stream': 3,
            'Just started investing': 3, 'Yes, small investments': 3,
            'Mental plan only': 3, 'One or two steps': 3, 'Balanced emotion/logic': 3,
            'Weekly': 3, 'Quarterly': 3, 'Occasionally': 3, 'Yes, moderate support': 3,
            
            // Negative responses
            'Somewhat agree': 2, 'Often': 2, 'No, but close': 2,
            'Struggling with debt': 2, 'Yes, under 5%': 2, 'Working on developing them': 2,
            'Planning to start soon': 2, 'Planning to acquire': 2,
            'Rough ideas': 2, 'Thinking about it': 2, 'Mostly emotion': 2,
            'Yearly': 2, 'Yes, occasional support': 2,
            
            // Very negative responses
            'Strongly agree': 1, 'Always': 1, 'No, far from it': 1,
            'Overwhelmed by debt': 1, 'No, inconsistent': 1, 'No, single income source': 1,
            'Not investing': 1, 'No assets': 1, 'No plan': 1,
            'No steps taken': 1, 'Pure emotion': 1,
            'I prefer learning alone': 1
          };
          
          score = scoreMap[answer] || 3;
        }
        
        totalScore += score;
        questionCount++;
      }
    }
    
    return questionCount > 0 ? Math.round((totalScore / questionCount) * 20) : 0;
  };

  const getTier = (score: number, categories: string[]) => {
    if (score >= 80) return categories[0];
    if (score >= 60) return categories[1];
    if (score >= 40) return categories[2];
    return categories[3];
  };

  const feelingScore = calculateSectionScore(1, 12, true);
  const beliefsScore = calculateSectionScore(13, 26);
  const actionScore = calculateSectionScore(27, 38);
  const realityScore = calculateSectionScore(39, 50);

  const totalScore = Math.round((feelingScore + beliefsScore + actionScore + realityScore) / 4);

  const feelingTier = getTier(feelingScore, ['Abundance Mindset', 'Growth Mindset', 'Scarcity Mindset', 'Fear-Based Mindset']);
  const beliefsTier = getTier(beliefsScore, ['Empowering Beliefs', 'Positive Beliefs', 'Mixed Beliefs', 'Limiting Beliefs']);
  const actionTier = getTier(actionScore, ['Consistent Action', 'Regular Action', 'Inconsistent Action', 'Avoidant Action']);
  const realityTier = getTier(realityScore, ['Financial Freedom', 'Financial Stability', 'Financial Struggle', 'Financial Crisis']);

  const overallProfile = `You have a ${feelingTier.toLowerCase()} with ${beliefsTier.toLowerCase()}. Your money actions are ${actionTier.toLowerCase()}, and your current financial reality shows ${realityTier.toLowerCase()}.`;

  const wealthStage = totalScore >= 80 ? 'Wealth Builder' : 
                     totalScore >= 60 ? 'Financial Growth' : 
                     totalScore >= 40 ? 'Financial Awareness' : 'Financial Foundation';

  return {
    feelingScore: {
      score: feelingScore,
      tier: feelingTier,
      patterns: [
        'Your emotional responses to money situations',
        'How you handle financial stress and uncertainty',
        'Your relationship with money as an emotional tool'
      ],
      recommendations: [
        'Practice mindfulness around money decisions',
        'Develop positive money affirmations',
        'Work on reducing financial anxiety through education'
      ],
      affirmations: [
        'I am worthy of financial abundance',
        'Money flows to me easily and frequently',
        'I handle financial challenges with grace and wisdom'
      ]
    },
    beliefsScore: {
      score: beliefsScore,
      tier: beliefsTier,
      patterns: [
        'Your core beliefs about money and wealth',
        'How you view rich people and success',
        'Your mindset around financial opportunities'
      ],
      recommendations: [
        'Identify and challenge limiting money beliefs',
        'Surround yourself with positive financial role models',
        'Read books on money mindset and wealth psychology'
      ],
      affirmations: [
        'I believe in my ability to create wealth',
        'Rich people are generous and contribute to society',
        'Financial success is available to everyone who works for it'
      ]
    },
    actionScore: {
      score: actionScore,
      tier: actionTier,
      patterns: [
        'Your consistency with financial planning',
        'How you approach financial tasks and decisions',
        'Your level of financial education and learning'
      ],
      recommendations: [
        'Create and stick to a daily financial routine',
        'Automate your savings and investment processes',
        'Set up regular financial review sessions'
      ],
      affirmations: [
        'I take consistent action toward my financial goals',
        'I am disciplined and committed to financial success',
        'Every financial decision I make moves me closer to abundance'
      ]
    },
    realityScore: {
      score: realityScore,
      tier: realityTier,
      patterns: [
        'Your current financial situation and stability',
        'How you manage debt and savings',
        'Your income streams and asset base'
      ],
      recommendations: [
        'Create a detailed financial plan with specific goals',
        'Focus on building multiple income streams',
        'Prioritize debt reduction and emergency fund building'
      ],
      affirmations: [
        'I am building a solid financial foundation',
        'My financial situation improves every day',
        'I attract opportunities that increase my wealth'
      ]
    },
    overallProfile,
    topActionSteps: [
      'Start tracking your money emotions daily',
      'Identify and replace one limiting money belief',
      'Create a simple financial routine you can stick to',
      'Set up automatic savings from your next paycheck',
      'Learn one new financial concept this week'
    ],
    personalizedAffirmation: `I am transforming my relationship with money. I choose abundance over scarcity, action over avoidance, and growth over fear. My ${wealthStage.toLowerCase()} mindset attracts wealth and opportunities. I am worthy of financial freedom and use money as a force for good in the world.`,
    wealthStage
     };
 }

// =========================
// Main Assessment Logic
// =========================
function AssessmentQuiz({ onComplete, onBack }: { onComplete: (results: any) => void; onBack: () => void; }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [currentSection, setCurrentSection] = useState(0);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const updateCurrentSection = (questionIndex: number) => {
    if (questionIndex < 12) setCurrentSection(0);
    else if (questionIndex < 26) setCurrentSection(1);
    else if (questionIndex < 38) setCurrentSection(2);
    else setCurrentSection(3);
  };

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const nextIndex = currentQuestion + 1;
      setCurrentQuestion(nextIndex);
      updateCurrentSection(nextIndex);
    } else {
      onComplete(answers);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      const prevIndex = currentQuestion - 1;
      setCurrentQuestion(prevIndex);
      updateCurrentSection(prevIndex);
    }
  };

  const renderQuestionInput = () => {
    const currentAnswer = answers[question.id] || '';

    switch (question.type) {
      case 'likert':
        return (
          <div className="space-y-3">
            {likertOptions.map((option, index) => (
              <label key={index} className="w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer">
                <span className="font-medium text-black">{option}</span>
                <input
                  type="radio"
                  name="answer"
                  value={String(index + 1)}
                  checked={currentAnswer === String(index + 1)}
                  onChange={() => handleAnswer(String(index + 1))}
                  className="form-radio h-4 w-4 text-black border-gray-300 focus:ring-black accent-black"
                />
              </label>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer">
                <span className="font-medium text-black">{option}</span>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={currentAnswer === option}
                  onChange={() => handleAnswer(option)}
                  className="form-radio h-4 w-4 text-black border-gray-300 focus:ring-black accent-black"
                />
              </label>
            ))}
          </div>
        );

      case 'yesno':
        return (
          <div className="space-y-3">
            {yesNoOptions.map((option, index) => (
              <label key={index} className="w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer">
                <span className="font-medium text-black">{option}</span>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={currentAnswer === option}
                  onChange={() => handleAnswer(option)}
                  className="form-radio h-4 w-4 text-black border-gray-300 focus:ring-black accent-black"
                />
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} className="text-gray-500 hover:text-black hover:bg-gray-100 bg-transparent inline-flex items-center px-6 py-3">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-black" />
            <span className="text-xl font-semibold text-black">Money Relationship Assessment</span>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-black-500">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-black-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="mb-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700">
            <span className="text-sm font-medium">
              Section {currentSection + 1}: {sectionTitles[currentSection]}
            </span>
          </div>
        </div>

        <Card className="bg-white border border-gray-200 mb-8 text-black">
          <CardHeader>
            <CardTitle className="text-2xl text-black leading-relaxed">
              {question.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderQuestionInput()}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button onClick={prevQuestion} disabled={currentQuestion === 0} className="border-black text-black hover:bg-gray-100 disabled:text-gray-300 disabled:border-gray-300 bg-white inline-flex items-center px-6 py-3">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button onClick={nextQuestion} disabled={!answers[question.id]} className="bg-black hover:bg-gray-800 text-white disabled:bg-gray-300 inline-flex items-center px-6 py-3">
            {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function AssessmentResults({ results, onRetakeQuiz }: { results: any; onRetakeQuiz: () => void }) {
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
    doc.text('Money Relationship Assessment Results', pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Main Score
    const totalScore = Math.round((results.feelingScore.score + results.beliefsScore.score + results.actionScore.score + results.realityScore.score) / 4);
    doc.setFontSize(36);
    doc.text(totalScore.toString(), pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Wealth Stage
    doc.setFontSize(16);
    doc.text(results.wealthStage, pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Description
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    const descriptionLines = doc.splitTextToSize(results.personalizedAffirmation, pageWidth - (2 * margin));
    doc.text(descriptionLines, pageWidth / 2, y, { align: 'center' });
    y += 10 + (descriptionLines.length * 7);

    // Dimension Scores Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Dimension Scores', margin, y);
    y += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Money Feelings: ${results.feelingScore.score}/100`, margin, y); y += 10;
    doc.text(`Money Beliefs: ${results.beliefsScore.score}/100`, margin, y); y += 10;
    doc.text(`Money Actions: ${results.actionScore.score}/100`, margin, y); y += 10;
    doc.text(`Financial Reality: ${results.realityScore.score}/100`, margin, y); y += 20;

    // Check if we need a new page
    if (y > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage();
      y = margin;
    }

    // Action Steps
    doc.setFont('helvetica', 'bold');
    doc.text('90-Day Money Transformation Roadmap', margin, y);
    y += 15;
    doc.setFont('helvetica', 'normal');
          results.topActionSteps.forEach((step: string, index: number) => {
        doc.text(`${index + 1}. ${step}`, margin, y);
        y += 10;
      });
    y += 10;

    // Check if we need a new page
    if (y > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage();
      y = margin;
    }

    // Overall Profile
    doc.setFont('helvetica', 'bold');
    doc.text('Overall Profile', margin, y);
    y += 15;
    doc.setFont('helvetica', 'normal');
    const profileLines = doc.splitTextToSize(results.overallProfile, pageWidth - (2 * margin));
    doc.text(profileLines, margin, y);

    doc.save('money-relationship-results.pdf');
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
      doc.text('Money Relationship Assessment Results', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      const totalScore = Math.round((results.feelingScore.score + results.beliefsScore.score + results.actionScore.score + results.realityScore.score) / 4);
      doc.text(`Total Score: ${totalScore}/100`, 14, y); y += 10;
      doc.text(`Wealth Stage: ${results.wealthStage}`, 14, y); y += 10;
      doc.setFont('helvetica', 'italic');
      doc.text(`${results.personalizedAffirmation}`, 14, y, { maxWidth: 180 }); y += 10;
      doc.setFont('helvetica', 'normal');
      doc.text(`Money Feelings: ${results.feelingScore.score}/100`, 14, y); y += 10;
      doc.text(`Money Beliefs: ${results.beliefsScore.score}/100`, 14, y); y += 10;
      doc.text(`Money Actions: ${results.actionScore.score}/100`, 14, y); y += 10;
      doc.text(`Financial Reality: ${results.realityScore.score}/100`, 14, y); y += 20;

      // Add action steps
      doc.setFont('helvetica', 'bold');
      doc.text('Action Steps:', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      results.topActionSteps.forEach((step: string, i: number) => {
        doc.text(`${i + 1}. ${step}`, 18, y + i * 8);
      });
      y += results.topActionSteps.length * 8 + 10;

      // Add overall profile
      doc.setFont('helvetica', 'bold');
      doc.text('Overall Profile:', 14, y); y += 10;
      doc.setFont('helvetica', 'normal');
      doc.text(`${results.overallProfile}`, 14, y, { maxWidth: 180 });

      // Convert PDF to base64
      const pdfBase64 = doc.output('datauristring').split(',')[1];

      // Send PDF via email
      const response = await fetch('https://kk-backend-wra3.onrender.com/api/assessment/send-pdf', {
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

  const dimensionNames: { [key: string]: string } = {
    feelingScore: "Money Feelings",
    beliefsScore: "Money Beliefs", 
    actionScore: "Money Actions",
    realityScore: "Financial Reality"
  };

  const dimensionIcons = {
    feelingScore: <Heart className="h-5 w-5 text-black" />,
    beliefsScore: <Brain className="h-5 w-5 text-black" />,
    actionScore: <Target className="h-5 w-5 text-black" />,
    realityScore: <DollarSign className="h-5 w-5 text-black" />
  };

  const totalScore = Math.round((results.feelingScore.score + results.beliefsScore.score + results.actionScore.score + results.realityScore.score) / 4);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-black">Your Money Relationship Results</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {results.overallProfile}
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
            <CardTitle className="text-2xl text-black">Money Relationship Score</CardTitle>
            <Badge className="bg-black text-white text-lg px-8 py-3 rounded-md font-medium cursor-default select-none pointer-events-none">
              {results.wealthStage}
            </Badge>
            <p className="text-gray-600 mt-2">{results.personalizedAffirmation}</p>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries({
            feelingScore: results.feelingScore,
            beliefsScore: results.beliefsScore,
            actionScore: results.actionScore,
            realityScore: results.realityScore
          }).map(([dimension, scoreData]) => (
            <Card key={dimension} className="bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  {dimensionIcons[dimension as keyof typeof dimensionIcons]}
                  <CardTitle className="text-sm text-black">{dimensionNames[dimension]}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-black mb-2">{scoreData.score}/100</div>
                <Progress value={scoreData.score} />
                <p className="text-xs text-gray-500 mt-2">{scoreData.tier}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Key Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.feelingScore.patterns.slice(0, 2).map((pattern: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <span className="text-black">{pattern}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Growth Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.feelingScore.recommendations.slice(0, 2).map((rec: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span className="text-black">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-black text-xl">Your 90-Day Money Transformation Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {results.topActionSteps.map((step: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm text-black">{step}</span>
                </div>
              ))}
            </div>
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

function Introduction({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in">
        <Card className="border-none shadow-lg bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-black">Money Relationship Assessment</CardTitle>
            <CardDescription className="text-lg mt-2 text-black">Discover and transform your relationship with money across four key dimensions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-black mb-3">What is Money Relationship Assessment?</h2>
              <p className="text-black mb-4">Your money relationship encompasses your emotional responses, beliefs, actions, and current financial reality—key factors for financial success and abundance.</p>
              <p className="text-black">This assessment measures your <span className="font-medium">money mindset potential</span>, not just your current financial situation. Use it to understand your strengths and find opportunities for improvement.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Heart className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Money Feelings</h3>
                  <p className="text-sm text-gray-600">Understand your emotional responses to money situations and learn to elevate your frequency</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Brain className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Money Beliefs</h3>
                  <p className="text-sm text-gray-600">Identify limiting beliefs and reprogram your subconscious for wealth and abundance</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Target className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Money Actions</h3>
                  <p className="text-sm text-gray-600">Analyze your financial habits and get actionable steps to align your behavior with your goals</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full">
                  <DollarSign className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Financial Reality</h3>
                  <p className="text-sm text-gray-600">Assess your current financial situation and receive personalized strategies for growth</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-black mb-3">About This Assessment</h2>
              <ul className="space-y-2 text-black">
                <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Takes approximately 10-15 minutes to complete</span></li>
                <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Includes 50 questions across 4 key dimensions</span></li>
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

const MoneyFlowPage = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'assessment' | 'results'>('landing');
  const [assessmentResults, setAssessmentResults] = useState<any>(null);

  const handleAssessmentComplete = (results: any) => {
    const calculatedResults = calculateScores(results);
    setAssessmentResults(calculatedResults);
    setCurrentView('results');
  };

  if (currentView === 'assessment') {
    return <AssessmentQuiz onComplete={handleAssessmentComplete} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'results' && assessmentResults) {
    return <AssessmentResults results={assessmentResults} onRetakeQuiz={() => setCurrentView('assessment')} />;
  }

  return <Introduction onStart={() => setCurrentView('assessment')} />;
};

export default MoneyFlowPage;