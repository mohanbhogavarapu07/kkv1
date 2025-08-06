import React from 'react';
import { useNavigate } from 'react-router-dom';
import WoopIndex from "../mind/woop-your-way/pages/Index";
import AtomicIndex from "../mind/atomic-habits/pages/Index";
import MindfulIndex from "../mind/mindful/pages/Index";

const MasterYourMind = () => {
  const navigate = useNavigate();
  const [openTool, setOpenTool] = React.useState<string | null>(null);

  const handleBoxClick = (toolName: string) => {
    if (toolName === "FTBA Methodology") {
      navigate("/srcs");
    } else if (toolName === "WOOP Journey") {
      navigate("/mind/woop-your-way");
    } else if (toolName === "Atomic Habits") {
      navigate("/mind/atomic-habits");
    } else if (toolName === "CBT Thought Reframe Journey") {
      navigate("/mind/mindful");
    }
  };

  const tools = [
    { name: "FTBA Methodology", description: "A practical framework for reframing thoughts, beliefs, and actions for lasting change.", slug: "srcs" },
    { name: "WOOP Journey", description: "A science-backed mental strategy for achieving goals and overcoming obstacles.", slug: "mind/woop-your-way" },
    { name: "Atomic Habits", description: "Build better habits, break bad ones, and master the tiny behaviors that lead to remarkable results.", slug: "mind/atomic-habits" },
    { name: "CBT Thought Reframe Journey", description: "Cognitive Behavioral Therapy tools to challenge and reshape unhelpful thought patterns.", slug: "mind/mindful" }
  ];

  const handleBegin = (slug: string) => {
    navigate(`/${slug}`);
  };

  return (
    <div>
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair">Master Your Mind</h1>
            <p className="text-xl text-gray-700 mb-6">
              Practical tools and cognitive strategies designed to help you take control of your thoughts, build mental clarity, and unlock high-performance thinking.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
              <li>Recognize and reshape thought patterns that hold you back</li>
              <li>Apply proven frameworks like CBT, FTBA, and Atomic Habits</li>
              <li>Strengthen focus, emotional agility, and resilience</li>
              <li>Backed by psychology, designed for everyday breakthroughs</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section pt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="bg-white p-8 flex flex-col justify-between min-h-[240px] cursor-pointer border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-2xl hover:border-black hover:scale-[1.03]"
                onClick={() => handleBegin(tool.slug)}
              >
                <div className="flex-1">
                  <h2 className="font-playfair text-xl mb-3 text-black">{tool.name}</h2>
                  <p className="text-gray-700 text-base mb-4">{tool.description}</p>
                </div>
                <button
                  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition font-semibold text-sm tracking-wide"
                  onClick={e => {
                    e.stopPropagation();
                    handleBegin(tool.slug);
                  }}
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MasterYourMind; 