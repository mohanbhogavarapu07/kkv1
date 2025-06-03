// ===============================
// 🧾 Types & Data
// ===============================
import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, forwardRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Download, RotateCcw, Mail, ChevronLeft, ChevronRight, RefreshCcw, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';

// ===============================
// TypeScript Types & Interfaces
// ===============================

type Dimension = 'riskTolerance' | 'innovationMindset' | 'executionGrit' | 'scalabilityIQ' | 'founderVision' | 'solopreneurship';

type AssessmentQuestion = {
  id: number;
  text: string;
  type: 'multipleChoice' | 'scenario' | 'openEnded';
  dimension: Dimension;
  options?: string[];
};

type Response = {
  questionId: number;
  answer: number;
  dimension: Dimension;
};

type Results = {
  totalScore: number;
  dimensions: {
    [key in Dimension]: number;
  };
  rank: string;
  persona: string;
  strengths: string[];
  weaknesses: string[];
  roadmap: {
    thirty: string[];
    sixty: string[];
    ninety: string[];
  };
  resources: {
    books: string[];
    tools: string[];
    courses: string[];
  };
};

type AssessmentContextType = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  responses: Response[];
  addResponse: (response: Response) => void;
  calculateResults: () => void;
  results: Results | null;
  progress: number;
  assessmentComplete: boolean;
  currentModel: "startup" | "solopreneur";
  setCurrentModel: (model: "startup" | "solopreneur") => void;
  resetAssessment: () => void;
  handleSendToEmail: () => void;
};

// ===============================
// Assessment Questions Data
// ===============================

const assessmentQuestions: AssessmentQuestion[] = [
  // Risk Tolerance Questions
  {
    id: 1,
    text: "How do you react when faced with significant business uncertainty?",
    type: "multipleChoice",
    dimension: "riskTolerance",
    options: [
      "I become paralyzed and avoid making decisions",
      "I feel uncomfortable but can make some progress",
      "I'm somewhat comfortable making decisions with limited information",
      "I accept uncertainty as part of the process and adapt",
      "I thrive in uncertain environments and make quick, confident decisions"
    ]
  },
  {
    id: 2,
    text: "How would you respond to a significant business failure?",
    type: "multipleChoice",
    dimension: "riskTolerance",
    options: [
      "I would be devastated and give up",
      "I would take a long time to recover emotionally",
      "I would learn from it but be hesitant to try again soon",
      "I would analyze what went wrong and try again with adjustments",
      "I would see it as a valuable learning experience and quickly pivot"
    ]
  },
  {
    id: 3,
    text: "You have ₹20,000 and 2 months to validate a business idea. How comfortable are you with this constraint?",
    type: "multipleChoice",
    dimension: "riskTolerance",
    options: [
      "Very uncomfortable - that's too risky",
      "Somewhat uncomfortable - I prefer more resources",
      "Neutral - I could work with this",
      "Comfortable - constraints foster creativity",
      "Very comfortable - I can validate multiple ideas with those resources"
    ]
  },
  {
    id: 4,
    text: "When making important decisions with incomplete data, I typically:",
    type: "multipleChoice",
    dimension: "riskTolerance",
    options: [
      "Wait until I have all the information",
      "Delay as long as possible while gathering more data",
      "Make a cautious decision with some hesitation",
      "Make a reasoned decision based on available information",
      "Trust my instincts and make quick decisions comfortably"
    ]
  },

  // Innovation Mindset Questions
  {
    id: 5,
    text: "How comfortable are you using AI tools for business tasks?",
    type: "multipleChoice",
    dimension: "innovationMindset",
    options: [
      "Very uncomfortable - I avoid using them",
      "Somewhat uncomfortable - I use them sparingly",
      "Neutral - I use basic AI tools occasionally",
      "Comfortable - I regularly incorporate AI tools",
      "Very comfortable - I'm an early adopter and power user of AI"
    ]
  },
  {
    id: 6,
    text: "When solving business problems, I tend to:",
    type: "multipleChoice",
    dimension: "innovationMindset",
    options: [
      "Stick with proven traditional approaches",
      "Slightly modify existing solutions",
      "Balance traditional approaches with some novel ideas",
      "Often create new approaches to problems",
      "Consistently develop innovative, unconventional solutions"
    ]
  },
  {
    id: 7,
    text: "How often do you explore emerging trends and technologies in your field?",
    type: "multipleChoice",
    dimension: "innovationMindset",
    options: [
      "Rarely or never",
      "Occasionally (a few times a year)",
      "Sometimes (monthly)",
      "Often (weekly)",
      "Constantly (daily research and experimentation)"
    ]
  },
  {
    id: 8,
    text: "I see market disruptions as:",
    type: "multipleChoice",
    dimension: "innovationMindset",
    options: [
      "Threatening and destabilizing",
      "Mostly negative with some opportunities",
      "Equal parts opportunity and challenge",
      "Primarily opportunities with some challenges",
      "Exciting opportunities to create new value"
    ]
  },

  // Execution & Grit Questions
  {
    id: 9,
    text: "When starting a new project, I typically:",
    type: "multipleChoice",
    dimension: "executionGrit",
    options: [
      "Often abandon it before completion",
      "Complete it but take much longer than planned",
      "Usually complete it with some delays",
      "Complete it on time with consistent effort",
      "Complete it ahead of schedule with focused intensity"
    ]
  },
  {
    id: 10,
    text: "When faced with tedious but necessary tasks, I:",
    type: "multipleChoice",
    dimension: "executionGrit",
    options: [
      "Typically avoid them indefinitely",
      "Procrastinate significantly but eventually complete them",
      "Complete them but struggle with consistency",
      "Consistently complete them despite not enjoying them",
      "Create systems to make them easier and complete them efficiently"
    ]
  },
  {
    id: 11,
    text: "When it comes to perfection versus speed, I prioritize:",
    type: "multipleChoice",
    dimension: "executionGrit",
    options: [
      "Absolute perfection, regardless of time required",
      "High quality with less concern for timeline",
      "A balance of quality and timeliness",
      "Meeting deadlines with acceptable quality",
      "Getting to market quickly with continual improvement after launch"
    ]
  },
  {
    id: 12,
    text: "When working in chaotic or constantly changing conditions, I:",
    type: "multipleChoice",
    dimension: "executionGrit",
    options: [
      "Become overwhelmed and struggle to function",
      "Function but with significantly reduced effectiveness",
      "Adapt after an adjustment period",
      "Maintain most of my productivity despite changes",
      "Thrive and find opportunities in the chaos"
    ]
  },

  // Scalability IQ Questions
  {
    id: 13,
    text: "How important is market validation before fully developing a product?",
    type: "multipleChoice",
    dimension: "scalabilityIQ",
    options: [
      "Not important - I prefer to build based on my vision",
      "Somewhat important but not a priority",
      "Important but not critical to success",
      "Very important for product development",
      "Critical - I won't proceed without validation"
    ]
  },
  {
    id: 14,
    text: "When it comes to creating repeatable business processes, I:",
    type: "multipleChoice",
    dimension: "scalabilityIQ",
    options: [
      "Prefer to handle tasks case-by-case",
      "Create basic procedures for some tasks",
      "Create standard processes for many tasks",
      "Document and optimize most business processes",
      "Create comprehensive systems for automation and delegation"
    ]
  },
  {
    id: 15,
    text: "How do you approach leveraging resources (people, technology, capital)?",
    type: "multipleChoice",
    dimension: "scalabilityIQ",
    options: [
      "I prefer to do everything myself",
      "I occasionally delegate simple tasks",
      "I leverage resources for standard tasks",
      "I actively look for resources to multiply my impact",
      "I build systems specifically designed for maximum leverage"
    ]
  },
  {
    id: 16,
    text: "When thinking about your business idea, which timeframe do you primarily focus on?",
    type: "multipleChoice",
    dimension: "scalabilityIQ",
    options: [
      "The next few weeks",
      "The next few months",
      "The next year",
      "The next 2-5 years",
      "The next decade or longer"
    ]
  },

  // Founder Vision Clarity Questions
  {
    id: 17,
    text: "How clear are you on the specific market niche for your business?",
    type: "multipleChoice",
    dimension: "founderVision",
    options: [
      "Not clear at all - exploring many options",
      "Somewhat clear but considering several options",
      "Have a general direction but not fully defined",
      "Clear on my target niche with some specifics",
      "Very clear with a precisely defined niche"
    ]
  },
  {
    id: 18,
    text: "How aligned is your business concept with your personal values and strengths?",
    type: "multipleChoice",
    dimension: "founderVision",
    options: [
      "Not aligned - purely pursuing market opportunity",
      "Somewhat aligned in a few aspects",
      "Moderately aligned with some compromises",
      "Highly aligned with my values and strengths",
      "Perfect alignment with my values, strengths, and purpose"
    ]
  },
  {
    id: 19,
    text: "How often are you distracted by new business ideas while working on your current project?",
    type: "multipleChoice",
    dimension: "founderVision",
    options: [
      "Constantly - I jump between ideas frequently",
      "Often - new ideas regularly pull my attention",
      "Sometimes - occasionally get tempted by new ideas",
      "Rarely - stay focused with occasional exploration",
      "Almost never - maintain laser focus on current priorities"
    ]
  },
  {
    id: 20,
    text: "How would you describe your long-term vision for your business?",
    type: "multipleChoice",
    dimension: "founderVision",
    options: [
      "I don't have one yet",
      "Vague ideas but nothing concrete",
      "General direction with some milestones",
      "Clear vision with defined milestones",
      "Comprehensive, inspiring vision with detailed execution plan"
    ]
  },

  // Solopreneurship Readiness Questions
  {
    id: 21,
    text: "How comfortable are you with self-promotion and personal branding?",
    type: "multipleChoice",
    dimension: "solopreneurship",
    options: [
      "Very uncomfortable - I avoid it completely",
      "Uncomfortable - I do it reluctantly when necessary",
      "Neutral - I can do it but don't enjoy it",
      "Comfortable - I regularly engage in self-promotion",
      "Very comfortable - I excel at building my personal brand"
    ]
  },
  {
    id: 22,
    text: "How knowledgeable are you about creator economy business models?",
    type: "multipleChoice",
    dimension: "solopreneurship",
    options: [
      "Not knowledgeable at all",
      "Basic awareness but limited understanding",
      "Moderate understanding of key concepts",
      "Good understanding of various models",
      "Expert with practical experience in creator business models"
    ]
  },
  {
    id: 23,
    text: "How comfortable are you wearing multiple hats (marketing, sales, product, etc.)?",
    type: "multipleChoice",
    dimension: "solopreneurship",
    options: [
      "Very uncomfortable - I prefer specialization",
      "Somewhat uncomfortable - I can do it but not well",
      "Neutral - I can handle multiple roles adequately",
      "Comfortable - I enjoy diversity in responsibilities",
      "Very comfortable - I thrive with varied responsibilities"
    ]
  },
  {
    id: 24,
    text: "How effectively can you manage your time without external structure?",
    type: "multipleChoice",
    dimension: "solopreneurship",
    options: [
      "Very ineffectively - I need external structure",
      "Somewhat ineffectively - I struggle with self-management",
      "Moderately - I can manage some aspects well",
      "Effectively - I have good self-management systems",
      "Very effectively - I excel with self-directed work"
    ]
  },
  {
    id: 25,
    text: "How would you rate your ability to build and manage an audience?",
    type: "multipleChoice",
    dimension: "solopreneurship",
    options: [
      "Very poor - I have no experience or interest",
      "Poor - I've tried but struggled significantly",
      "Average - I can build a small audience with effort",
      "Good - I can consistently engage and grow an audience",
      "Excellent - I have demonstrated success building engaged audiences"
    ]
  }
];

// ===============================
// ⚙️ Utility Functions
// ===============================

// Simple classNames utility (no dependencies)
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

// ===============================
// 🧠 Assessment Context & Provider
// ===============================

const defaultResults: Results = {
  totalScore: 0,
  dimensions: {
    riskTolerance: 0,
    innovationMindset: 0,
    executionGrit: 0,
    scalabilityIQ: 0,
    founderVision: 0,
    solopreneurship: 0,
  },
  rank: "",
  persona: "",
  strengths: [],
  weaknesses: [],
  roadmap: {
    thirty: [],
    sixty: [],
    ninety: [],
  },
  resources: {
    books: [],
    tools: [],
    courses: [],
  },
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [results, setResults] = useState<Results | null>(null);
  const [currentModel, setCurrentModel] = useState<"startup" | "solopreneur">("startup");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const addResponse = (response: Response) => {
    // Replace if the question has already been answered
    const existingIndex = responses.findIndex(r => r.questionId === response.questionId);
    if (existingIndex !== -1) {
      setResponses(prev => {
        const updated = [...prev];
        updated[existingIndex] = response;
        return updated;
      });
    } else {
      setResponses(prev => [...prev, response]);
    }
  };

  // Calculate progress (0-100%)
  const progress = Math.min(100, Math.round((responses.length / 25) * 100));
  const assessmentComplete = progress === 100;

  const resetAssessment = () => {
    setResponses([]);
    setResults(null);
    setCurrentPage(0);
  };

  const calculateResults = () => {
    // Group responses by dimension
    const dimensionScores: { [key in Dimension]: number[] } = {
      riskTolerance: [],
      innovationMindset: [],
      executionGrit: [],
      scalabilityIQ: [],
      founderVision: [],
      solopreneurship: [],
    };
    responses.forEach(response => {
      dimensionScores[response.dimension].push(response.answer);
    });
    // Calculate average for each dimension (0-20 scale)
    const calculatedDimensions = Object.entries(dimensionScores).reduce((acc, [dimension, scores]) => {
      if (scores.length === 0) return { ...acc, [dimension]: 0 };
      // Average score (1-5) * 4 to get 0-20 scale
      const avgScore = (scores.reduce((sum, score) => sum + score, 0) / scores.length) * 4;
      return { ...acc, [dimension]: Math.round(avgScore) };
    }, {} as { [key in Dimension]: number });
    // Apply weighting based on user model
    const weightedDimensions = { ...calculatedDimensions };
    if (currentModel === "startup") {
      weightedDimensions.scalabilityIQ = Math.round(weightedDimensions.scalabilityIQ * 1.2);
      weightedDimensions.solopreneurship = Math.round(weightedDimensions.solopreneurship * 0.8);
    } else {
      weightedDimensions.solopreneurship = Math.round(weightedDimensions.solopreneurship * 1.2);
      weightedDimensions.scalabilityIQ = Math.round(weightedDimensions.scalabilityIQ * 0.8);
    }
    // Calculate total score (cap each dimension at 20)
    const cappedDimensions = Object.entries(weightedDimensions).reduce((acc, [dimension, score]) => {
      return { ...acc, [dimension]: Math.min(20, score) };
    }, {} as { [key in Dimension]: number });
    const totalScore = Object.values(cappedDimensions).reduce((sum, score) => sum + score, 0);
    // Determine rank
    let rank;
    if (totalScore <= 40) rank = "Early Explorer";
    else if (totalScore <= 60) rank = "Lean Hustler";
    else if (totalScore <= 80) rank = "Growth-Oriented Founder";
    else rank = "Scalable Visionary";
    // Determine persona
    const personaMapping = [
      { name: "The Nimble Navigator", threshold: { riskTolerance: 15, executionGrit: 15 } },
      { name: "The Tech Visionary", threshold: { innovationMindset: 15, founderVision: 15 } },
      { name: "The Resilient Builder", threshold: { executionGrit: 15, solopreneurship: 15 } },
      { name: "The Scale Architect", threshold: { scalabilityIQ: 15, innovationMindset: 12 } },
      { name: "The Independent Creator", threshold: { solopreneurship: 16, founderVision: 14 } },
      { name: "The Pragmatic Innovator", threshold: { executionGrit: 14, innovationMindset: 14 } },
      { name: "The Growth Hacker", threshold: { scalabilityIQ: 15, riskTolerance: 15 } }
    ];
    const persona = personaMapping.find(p => {
      const dimensionKeys = Object.keys(p.threshold) as Dimension[];
      return dimensionKeys.every(key => cappedDimensions[key] >= p.threshold[key]);
    })?.name || "The Balanced Entrepreneur";
    // Determine strengths (top 2 dimensions)
    const sortedDimensions = Object.entries(cappedDimensions)
      .sort(([, a], [, b]) => b - a);
    const strengths = sortedDimensions.slice(0, 2).map(([dimension]) => {
      const readableDimension = {
        riskTolerance: "Navigating Uncertainty",
        innovationMindset: "Creative Problem-Solving",
        executionGrit: "Consistent Follow-Through",
        scalabilityIQ: "Building Scalable Systems",
        founderVision: "Strategic Vision",
        solopreneurship: "Self-Directed Achievement"
      }[dimension as Dimension];
      return readableDimension;
    });
    // Determine weaknesses (bottom 2 dimensions)
    const weaknesses = sortedDimensions.slice(-2).map(([dimension]) => {
      const readableDimension = {
        riskTolerance: "Risk Management",
        innovationMindset: "Innovation Thinking",
        executionGrit: "Execution Consistency",
        scalabilityIQ: "Scalable System Design",
        founderVision: "Long-term Vision",
        solopreneurship: "Independent Operation"
      }[dimension as Dimension];
      return readableDimension;
    });
    // Generate roadmap based on persona and model
    const roadmap = {
      thirty: [
        "Validate your business idea with 10 potential customers",
        "Create a simple landing page to test your value proposition",
        "Join 2 entrepreneurship communities related to your industry",
        "Set up basic productivity systems (task management, note-taking)",
        "Identify your unique differentiator in the market"
      ],
      sixty: [
        "Develop a minimum viable product or service offering",
        "Establish a basic marketing presence (LinkedIn, Twitter, or niche platform)",
        "Set up basic financial tracking and projections",
        "Reach out to 3 potential mentors in your field",
        "Create systems to measure your key performance indicators"
      ],
      ninety: [
        "Acquire your first 3 paying customers",
        "Document all processes to enable future delegation",
        "Develop a 6-month growth strategy based on initial data",
        "Begin automating repetitive tasks in your workflow",
        "Evaluate results and prepare to pivot or scale"
      ]
    };
    // Generate resource recommendations based on weaknesses
    const resources = {
      books: [
        "Zero to One by Peter Thiel",
        "The Lean Startup by Eric Ries",
        "Atomic Habits by James Clear",
        "Building a StoryBrand by Donald Miller",
        "Hooked by Nir Eyal"
      ],
      tools: [
        "Notion (project management and documentation)",
        "ChatGPT (content creation and problem-solving)",
        "Midjourney (visual asset generation)",
        "Zapier (automation workflows)",
        "Webflow (no-code website building)"
      ],
      courses: [
        "Y Combinator's Startup School (free)",
        "AI for Business Growth on Coursera",
        "Digital Marketing Fundamentals on Skillshare",
        "No-Code MVP Workshop",
        "Financial Foundations for Entrepreneurs"
      ]
    };
    setResults({
      totalScore,
      dimensions: cappedDimensions,
      rank,
      persona,
      strengths,
      weaknesses,
      roadmap,
      resources
    });
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
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let y = margin;

      // Header
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('Entrepreneurial Potential Results', pageWidth / 2, y, { align: 'center' });
      y += 20;

      // Main Score
      doc.setFontSize(36);
      doc.text(results.totalScore.toString(), pageWidth / 2, y, { align: 'center' });
      y += 20;

      // Profile
      doc.setFontSize(16);
      doc.text(results.persona, pageWidth / 2, y, { align: 'center' });
      y += 15;

      // Description
      doc.setFontSize(12);
      doc.setFont('helvetica', 'italic');
      const descriptionLines = doc.splitTextToSize(results.rank, pageWidth - (2 * margin));
      doc.text(descriptionLines, pageWidth / 2, y, { align: 'center' });
      y += 10 + (descriptionLines.length * 7);

      // Category Scores
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Category Scores', margin, y);
      y += 15;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      Object.entries(results.dimensions).forEach(([dimension, score]) => {
        doc.text(`${dimension}: ${score}/20`, margin, y);
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

      // Development Areas
      doc.setFont('helvetica', 'bold');
      doc.text('Growth Opportunities', margin, y);
      y += 15;
      doc.setFont('helvetica', 'normal');
      results.weaknesses.forEach((weakness: string) => {
        const weaknessLines = doc.splitTextToSize(`• ${weakness}`, pageWidth - (2 * margin));
        doc.text(weaknessLines, margin, y);
        y += 10 * weaknessLines.length;
      });

      doc.save('entrepreneurial-potential-results.pdf');
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailError('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AssessmentContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        responses,
        addResponse,
        calculateResults,
        results,
        progress,
        assessmentComplete,
        currentModel,
        setCurrentModel,
        resetAssessment,
        handleSendToEmail,
      }}
    >
      {children}
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
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

// ===============================
// 🧩 Button Component (Founder Spark AI Coach Style)
// ===============================

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  rounded?: 'md' | 'full';
};

const buttonVariants: Record<ButtonVariant, string> = {
  default: 'bg-black text-white hover:bg-gray-800',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  ghost: 'hover:bg-gray-100 text-gray-900',
  link: 'text-blue-600 underline-offset-4 hover:underline',
};

const buttonSizes: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, rounded = 'md', ...props }, ref) => {
    const Comp: any = asChild ? 'span' : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          rounded === 'full' ? 'rounded-full' : 'rounded-md',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// ===============================
// 🧩 Card Component
// ===============================

type CardProps = React.HTMLAttributes<HTMLDivElement>;
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
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

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// ===============================
// 🧩 Progress Component
// ===============================

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-black transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  )
);
Progress.displayName = "Progress";

// ===============================
// 🧩 RadioGroup Component
// ===============================
const RadioGroupContext = React.createContext<{ value?: string; onValueChange?: (value: string) => void } | undefined>(undefined);

type RadioGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ value, onValueChange, children, ...props }) => (
  <RadioGroupContext.Provider value={{ value, onValueChange }}>
    <div {...props}>{children}</div>
  </RadioGroupContext.Provider>
);

type RadioGroupItemProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
};

const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(({ value, ...props }, ref) => {
  const context = useContext(RadioGroupContext);
  return (
    <input
      ref={ref}
      type="radio"
      value={value}
      checked={context?.value === value}
      onChange={() => context?.onValueChange && context.onValueChange(value as string)}
      {...props}
    />
  );
});

// ===============================
// 🧩 Tabs Component (Robust Version)
// ===============================
type TabsContextType = {
  value: string;
  setValue: (val: string) => void;
};
const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

type TabsProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
};

const Tabs: React.FC<TabsProps> = ({ value, defaultValue, onValueChange, className, children }) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value! : internalValue;
  const setValue = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onValueChange && onValueChange(val);
  };
  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

type TabsListProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};
const TabsList: React.FC<TabsListProps> = ({ className, children, ...props }) => (
  <div className={cn('inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-700', className)} {...props}>
    {children}
  </div>
);

type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  children: React.ReactNode;
};
const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, ...props }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');
  const isActive = context.value === value;
  return (
    <button
      type="button"
      aria-selected={isActive}
      onClick={() => context.setValue(value)}
      data-state={isActive ? 'active' : undefined}
      className={cn(
        'transition-colors px-4 py-2 rounded-md font-medium',
        isActive
          ? 'bg-black text-white shadow-sm'
          : 'bg-white text-black',
        props.className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  children: React.ReactNode;
};
const TabsContent: React.FC<TabsContentProps> = ({ value, children, ...props }) => {
  const context = useContext(TabsContext);
  if (!context || context.value !== value) return null;
  return <div {...props}>{children}</div>;
};
TabsContent.displayName = "TabsContent";

// ===============================
// 🧩 Label Component
// ===============================

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
));
Label.displayName = "Label";

// ===============================
// 🧩 Icon Components
// ===============================

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path fillRule="evenodd" d="M16.704 6.29a1 1 0 00-1.408-1.418l-6.3 6.25-2.3-2.25a1 1 0 10-1.392 1.436l3 2.938a1 1 0 001.392 0l7-6.956z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l5-5-5-5" />
  </svg>
);

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17l-5-5 5-5" />
  </svg>
);

const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 13l3 3 3-3m0-6v6m-9 4h14" />
  </svg>
);
DownloadIcon.displayName = "DownloadIcon";

// ===============================
// 🏠 Index (Landing) Page
// ===============================
const IndexPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in">
        <Card className="border-none shadow-lg bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-black">Entrepreneurial Potential Assessment</CardTitle>
            <CardDescription className="text-lg mt-2 text-black">Discover your founder strengths, risk profile, and innovation mindset</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-black mb-3">What is Entrepreneurial Potential?</h2>
              <p className="text-black mb-4">Entrepreneurial potential is your ability to navigate uncertainty, innovate, and execute ideas—key for success in any venture.</p>
              <p className="text-black">This assessment measures your <span className="font-medium">founder growth potential</span>, not just your current skills. Use it to understand your strengths and find opportunities for improvement.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Check className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Self-Discovery</h3>
                  <p className="text-sm text-gray-600">Gain insights into your entrepreneurial strengths and adaptability</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-start space-x-3 border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full">
                  <ArrowRight className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Growth Focus</h3>
                  <p className="text-sm text-gray-600">Identify ways to enhance your founder performance</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-black mb-3">About This Assessment</h2>
              <ul className="space-y-2 text-black">
                <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Takes approximately 7-10 minutes to complete</span></li>
                <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Includes 25 questions across 6 key dimensions</span></li>
                <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Provides detailed feedback and personalized recommendations</span></li>
                <li className="flex items-center"><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span><span>Your responses are completely private and confidential</span></li>
              </ul>
            </div>
          </CardContent>
          <div className="flex justify-center pb-8">
            <Button onClick={onStart} rounded="full" className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-8 shadow-md transition-all hover:scale-105" style={{ fontSize: '1.125rem' }}>Begin Assessment</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ===============================
// 📝 Assessment Page
// ===============================

const AssessmentPage: React.FC<{ onComplete: () => void; onBack: () => void }> = ({ onComplete, onBack }) => {
  const {
    addResponse,
    progress,
    responses,
    currentPage,
    setCurrentPage,
    calculateResults,
    currentModel,
    setCurrentModel
  } = useAssessment();
  const [showIntro, setShowIntro] = React.useState(true);
  const QUESTIONS_PER_PAGE = 5;
  const startIdx = currentPage * QUESTIONS_PER_PAGE;
  const currentQuestions = assessmentQuestions.slice(startIdx, startIdx + QUESTIONS_PER_PAGE);
  const isLastPage = startIdx + QUESTIONS_PER_PAGE >= assessmentQuestions.length;

  const handleResponseChange = (questionId: number, value: number, dimension: string) => {
    addResponse({ questionId, answer: value, dimension: dimension as any });
  };
  const getCurrentAnswer = (questionId: number) => {
    const response = responses.find(r => r.questionId === questionId);
    return response ? response.answer : undefined;
  };
  const handleNextPage = () => {
    if (currentQuestions.every(q => getCurrentAnswer(q.id) !== undefined)) {
      if (isLastPage) {
        calculateResults();
        onComplete();
      } else {
        setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0);
      }
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    } else {
      onBack();
    }
  };

  // Intro screen component
  const IntroScreen = () => (
    <Card className="border-none shadow-lg bg-white">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl sm:text-4xl font-bold text-black">Entrepreneurial Potential Assessment</CardTitle>
        <CardDescription className="text-lg mt-2 text-black">Before We Begin</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg text-center text-black">
          This assessment will evaluate your entrepreneurial potential across 6 key dimensions.
        </p>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-lg text-black mb-2">Choose your entrepreneurial path:</h3>
          <Tabs
            defaultValue="startup"
            value={currentModel}
            onValueChange={val => setCurrentModel(val as 'startup' | 'solopreneur')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 border border-gray-200">
              <TabsTrigger value="startup">Startup Founder</TabsTrigger>
              <TabsTrigger value="solopreneur">Solopreneur</TabsTrigger>
            </TabsList>
            <TabsContent value="startup" className="mt-4 p-4 bg-white rounded-md">
              <h4 className="font-medium text-black mb-2">Startup Path</h4>
              <p className="text-gray-600">For those looking to build scalable businesses, potentially with a team and external funding. Focus on growth and market disruption.</p>
            </TabsContent>
            <TabsContent value="solopreneur" className="mt-4 p-4 bg-white rounded-md">
              <h4 className="font-medium text-black mb-2">Solopreneur Path</h4>
              <p className="text-gray-600">For independent creators and consultants building profitable businesses they can operate themselves. Focus on freedom and sustainability.</p>
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-black">Tips for an accurate assessment:</h3>
          <ul className="list-disc pl-5 space-y-2 text-black">
            <li>Answer honestly - this is for your benefit</li>
            <li>Consider your typical behavior, not ideal behavior</li>
            <li>Don't overthink - your initial response is often most accurate</li>
            <li>This assessment takes approximately 10 minutes to complete</li>
          </ul>
        </div>
      </CardContent>
      <div className="flex justify-center pb-8">
        <Button
          onClick={() => setShowIntro(false)}
          rounded="full"
          className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-8 shadow-md transition-all hover:scale-105"
          style={{ fontSize: '1.125rem' }}
        >
          Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );

  if (showIntro) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in">
          <IntroScreen />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-grey">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Back to Home Button */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="inline-flex items-center px-6 py-3 rounded border-none bg-gray-200 text-black hover:bg-gray-300"
            style={{ transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#e5e7eb'}
            onMouseOut={e => e.currentTarget.style.background = '#f3f4f6'}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-black">Entrepreneurial Potential Assessment</span>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-black">Your Progress</h2>
            <span className="text-sm font-medium text-black">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-sm text-gray-500 mt-1">
            Page {currentPage + 1} of {Math.ceil(assessmentQuestions.length / QUESTIONS_PER_PAGE)}
          </div>
        </div>
        <div className="space-y-8">
          {currentQuestions.map((question) => (
            <Card key={question.id} className="bg-white border border-gray-200 mb-8 text-black">
              <CardHeader>
                <CardTitle className="text-2xl text-black leading-relaxed">{question.text}</CardTitle>
              </CardHeader>
              <CardContent>
                {question.type === 'multipleChoice' && (
                  <RadioGroup
                    value={getCurrentAnswer(question.id)?.toString()}
                    onValueChange={value => handleResponseChange(
                      question.id,
                      parseInt(value),
                      question.dimension
                    )}
                    className="space-y-3"
                  >
                    {question.options?.map((option, index) => (
                      <label key={index} className="w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer">
                        <span className="font-medium text-black">{option}</span>
                        <RadioGroupItem
                          value={(index + 1).toString()}
                          id={`q${question.id}-${index}`}
                          className="form-radio h-4 w-4 text-black border-gray-300 focus:ring-black"
                        />
                      </label>
                    ))}
                  </RadioGroup>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-between mt-8">
          <Button
            onClick={() => {
              if (currentPage === 0) {
                onBack();
              } else {
                setCurrentPage(currentPage - 1);
                window.scrollTo(0, 0);
              }
            }}
            variant="outline"
            className="inline-flex items-center px-6 py-3 rounded"
            style={{ transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#d3d3d3'}
            onMouseOut={e => e.currentTarget.style.background = 'white'}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNextPage} disabled={currentQuestions.some(q => getCurrentAnswer(q.id) === undefined)} className="bg-black hover:bg-gray-800 text-white disabled:bg-gray-300 inline-flex items-center px-6 py-3">
            {isLastPage ? 'Complete Assessment' : 'Next '}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// ===============================
// 🏆 Results Page
// ===============================

const ResultsPage: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  const { results, handleSendToEmail } = useAssessment();
  if (!results) return null;
  const dimensionNames: { [key: string]: string } = {
    riskTolerance: "Risk Tolerance",
    innovationMindset: "Innovation Mindset",
    executionGrit: "Execution & Grit",
    scalabilityIQ: "Scalability IQ",
    founderVision: "Founder Vision",
    solopreneurship: "Solopreneur Readiness"
  };
  const getScoreColor = () => "text-black";
  const getDimensionWidth = (score: number): string => `${(score / 20) * 100}%`;
  const getDimensionColorClass = () => "bg-gray-700";

  const handleDownloadResults = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = margin;

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Entrepreneurial Potential Results', pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Main Score
    doc.setFontSize(36);
    doc.text(results.totalScore.toString(), pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Profile
    doc.setFontSize(16);
    doc.text(results.persona, pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Description
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    const descriptionLines = doc.splitTextToSize(results.rank, pageWidth - (2 * margin));
    doc.text(descriptionLines, pageWidth / 2, y, { align: 'center' });
    y += 10 + (descriptionLines.length * 7);

    // Category Scores
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Category Scores', margin, y);
    y += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    Object.entries(results.dimensions).forEach(([dimension, score]) => {
      doc.text(`${dimension}: ${score}/20`, margin, y);
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

    // Development Areas
    doc.setFont('helvetica', 'bold');
    doc.text('Growth Opportunities', margin, y);
    y += 15;
    doc.setFont('helvetica', 'normal');
    results.weaknesses.forEach((weakness: string) => {
      const weaknessLines = doc.splitTextToSize(`• ${weakness}`, pageWidth - (2 * margin));
      doc.text(weaknessLines, margin, y);
      y += 10 * weaknessLines.length;
    });

    doc.save('entrepreneurial-potential-results.pdf');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center border border-gray-200">
                <span className="text-4xl font-bold text-black">{results.totalScore}</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-black">Your Entrepreneurial Potential Results</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Based on your responses, here's your comprehensive founder profile and personalized optimization recommendations.
          </p>
        </div>
        <Card className="bg-white border border-gray-200 mb-8">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center border border-gray-200">
                  <span className="text-4xl font-bold text-black">{results.totalScore}</span>
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl text-black">Entrepreneurial Potential Score</CardTitle>
            <span className="bg-black text-white text-lg px-8 py-3 rounded-md font-medium cursor-default select-none pointer-events-none inline-block mt-2">
              {results.rank}
            </span>
            <p className="text-gray-600 mt-2">{results.persona}</p>
          </CardHeader>
        </Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(results.dimensions).map(([dimension, score]) => (
            <Card key={dimension} className="bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-black">{dimensionNames[dimension]}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-black mb-2">{score}/20</div>
                <Progress value={score} />
                <p className="text-xs text-gray-500 mt-2">{dimensionNames[dimension]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Check className="w-5 h-5" />
                Strengths
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
                <ArrowRight className="w-5 h-5" />
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
            <CardTitle className="text-black text-xl">Your 90-Day Entrepreneurial Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="roadmap" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 border border-gray-200">
                <TabsTrigger value="roadmap">90-Day Roadmap</TabsTrigger>
                <TabsTrigger value="resources">Recommended Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="roadmap" className="mt-6 bg-gray-50 rounded-md p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg text-black mb-2">First 30 Days</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {results.roadmap.thirty.map((item, index) => (
                        <li key={index} className="text-black">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-black mb-2">Days 31-60</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {results.roadmap.sixty.map((item, index) => (
                        <li key={index} className="text-black">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-black mb-2">Days 61-90</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {results.roadmap.ninety.map((item, index) => (
                        <li key={index} className="text-black">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="resources" className="mt-6 bg-gray-50 rounded-md p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg text-black mb-2">Recommended Books</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {results.resources.books.map((item, index) => (
                        <li key={index} className="text-black">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-black mb-2">Recommended Tools</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {results.resources.tools.map((item, index) => (
                        <li key={index} className="text-black">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-black mb-2">Recommended Courses</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {results.resources.courses.map((item, index) => (
                        <li key={index} className="text-black">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRestart}
            variant="outline"
            className="px-4 py-2 text-base min-w-[120px] inline-flex items-center rounded"
            style={{ transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#d3d3d3'}
            onMouseOut={e => e.currentTarget.style.background = 'white'}
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Retake Assessment
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 text-base min-w-[120px] inline-flex items-center rounded"
            style={{ transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#d3d3d3'}
            onMouseOut={e => e.currentTarget.style.background = 'white'}
            onClick={handleDownloadResults}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Results
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 text-base min-w-[120px] inline-flex items-center rounded"
            style={{ transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#d3d3d3'}
            onMouseOut={e => e.currentTarget.style.background = 'white'}
            onClick={handleSendToEmail}
          >
            <Mail className="w-5 h-5 mr-2" />
            Send to Email
          </Button>
        </div>
      </div>
    </div>
  );
};

// ===============================
// 🚫 NotFound Page
// ===============================

const NotFoundPage: React.FC<{ onHome: () => void }> = ({ onHome }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
      <button onClick={onHome} className="text-blue-500 hover:text-blue-700 underline">
        Return to Home
      </button>
    </div>
  </div>
);

// ===============================
// 🚀 Main App Wrapper
// ===============================

type Page = 'index' | 'assessment' | 'results' | 'notfound';

const EntrepreneurialPotential: React.FC = () => {
  const [page, setPage] = React.useState<Page>('index');
  const [key, setKey] = React.useState(0); // for resetting context

  // Reset context when starting over
  const handleRestart = () => {
    setKey(prev => prev + 1);
    setPage('index');
  };

  return (
    <AssessmentProvider key={key}>
      {page === 'index' && <IndexPage onStart={() => setPage('assessment')} />}
      {page === 'assessment' && (
        <AssessmentPage
          onComplete={() => setPage('results')}
          onBack={() => setPage('index')}
        />
      )}
      {page === 'results' && <ResultsPage onRestart={handleRestart} />}
      {page === 'notfound' && <NotFoundPage onHome={() => setPage('index')} />}
    </AssessmentProvider>
  );
};

export default EntrepreneurialPotential;