import React from "react";
import { useNavigate } from "react-router-dom";

const assessments = [
  {
    name: "Entrepreneurial Potential Assessment",
    description: "Evaluate your entrepreneurial mindset, risk tolerance, and innovation capacity to identify your startup strengths.",
    slug: "entrepreneurial-potential"
  },
  {
    name: "Productivity Style Quiz",
    description: "Discover your unique productivity archetype and learn how to optimize your workflow for maximum output.",
    slug: "productivity-style"
  },
  {
    name: "Emotional Intelligence (EQ) Evaluator",
    description: "Assess your self-awareness, empathy, and emotional regulation skills for better leadership and collaboration.",
    slug: "emotional-intelligence"
  },
  {
    name: "Resilience Score Analyzer",
    description: "Measure your ability to adapt, recover, and thrive under pressure in demanding environments.",
    slug: "resilience-score"
  },
  {
    name: "Leadership Archetype Assessment",
    description: "Uncover your core leadership style and learn how to leverage your strengths to inspire and guide others.",
    slug: "leadership-archetype"
  },
  {
    name: "Burnout Risk Assessment",
    description: "Identify early warning signs of burnout and receive personalized strategies for sustainable high performance.",
    slug: "burnout-risk"
  },
  {
    name: "Mental Fitness Index",
    description: "Gauge your cognitive stamina, focus endurance, and mental agility to unlock your peak performance.",
    slug: "mental-fitness-index"
  }
];

const Assessments = () => {
  const navigate = useNavigate();
  const handleBegin = (assessmentName: string) => {
    if (assessmentName === "Mental Fitness Index") navigate("/assessment/mental-fitness-index");
    else if (assessmentName === "Entrepreneurial Potential Assessment") navigate("/assessment/entrepreneurial-potential");
    else if (assessmentName === "Emotional Intelligence (EQ) Evaluator") navigate("/assessment/emotionalintelligenceevaluator");
    // Add more navigation logic for other assessments as needed
  };
  return (
    <div>
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair">Assessments</h1>
            <p className="text-xl text-gray-700 mb-6">
              Actionable self-assessments designed to help you understand your strengths, identify growth opportunities, and accelerate your journey to high performance.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
              <li>Gain clarity on your unique performance drivers and blind spots</li>
              <li>Receive tailored recommendations for personal and professional growth</li>
              <li>Track your progress and measure improvement over time</li>
              <li>Confidential, research-backed, and instantly actionable</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section pt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assessment) => (
              <div
                key={assessment.slug}
                className="bg-white p-8 flex flex-col justify-between min-h-[240px] cursor-pointer border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-2xl hover:border-black hover:scale-[1.03]"
                onClick={() => handleBegin(assessment.name)}
              >
                <div className="flex-1">
                  <h2 className="font-playfair text-xl mb-3 text-black">{assessment.name}</h2>
                  <p className="text-gray-700 text-base mb-4">{assessment.description}</p>
                </div>
                <button
                  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition font-semibold text-sm tracking-wide"
                  onClick={e => {
                    e.stopPropagation();
                    handleBegin(assessment.name);
                  }}
                >
                  Begin Assessment
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assessments; 